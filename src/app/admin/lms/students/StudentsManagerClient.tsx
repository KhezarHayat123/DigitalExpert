"use client";

import { useState } from "react";
import { Student, Course } from "@/lib/types";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  MessageCircle,
  Trash2,
  Edit,
  GraduationCap,
  X,
  AlertCircle,
} from "lucide-react";

interface StudentsManagerClientProps {
  initialStudents: Student[];
  courses: Course[];
}

export default function StudentsManagerClient({
  initialStudents,
  courses,
}: StudentsManagerClientProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved">("all");

  // Edit courses modal
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const pendingCount = students.filter((s) => s.status === "pending").length;
  const approvedCount = students.filter((s) => s.status === "approved").length;

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm);

    if (statusFilter === "pending") return matchesSearch && s.status === "pending";
    if (statusFilter === "approved") return matchesSearch && s.status === "approved";
    return matchesSearch;
  });

  // Approve student with one click
  const handleApprove = async (student: Student) => {
    setLoadingId(student.id);
    try {
      const res = await fetch(`/api/admin/lms/students/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", courseSlug: student.requestedCourse }),
      });

      const data = await res.json();
      if (res.ok) {
        setStudents(students.map((s) => (s.id === student.id ? data.student : s)));
      } else {
        alert(data.error || "Failed to approve student.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setLoadingId(null);
    }
  };

  // Open modal to assign/edit courses
  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setSelectedCourses([...student.enrolledCourses]);
  };

  const handleSaveCourses = async () => {
    if (!editingStudent) return;
    setLoadingId(editingStudent.id);
    try {
      const res = await fetch(`/api/admin/lms/students/${editingStudent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateCourses", enrolledCourses: selectedCourses }),
      });

      const data = await res.json();
      if (res.ok) {
        setStudents(students.map((s) => (s.id === editingStudent.id ? data.student : s)));
        setEditingStudent(null);
      } else {
        alert(data.error || "Failed to update courses.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student account?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/lms/students/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStudents(students.filter((s) => s.id !== id));
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#DCDCDE] shadow-sm">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              statusFilter === "all"
                ? "bg-[#2271B1] text-white"
                : "bg-[#F0F0F1] text-[#2C3338] hover:bg-[#E0E0E0]"
            }`}
          >
            All Students ({students.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              statusFilter === "pending"
                ? "bg-amber-500 text-black font-extrabold"
                : "bg-amber-100 text-amber-900 hover:bg-amber-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Approvals ({pendingCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              statusFilter === "approved"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            Approved ({approvedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C8F94] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F6F7F7] border border-[#8C8F94] rounded-lg text-xs font-medium text-[#2C3338] focus:bg-white focus:border-[#2271B1] focus:outline-none"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-[#DCDCDE] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F6F7F7] border-b border-[#DCDCDE] text-[#2C3338] font-bold">
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Email / Gmail</th>
                <th className="p-3.5">WhatsApp</th>
                <th className="p-3.5">Requested Course</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Enrolled Classrooms</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F1]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#646970] font-medium">
                    No student registrations found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isLoading = loadingId === student.id;

                  return (
                    <tr key={student.id} className="hover:bg-[#F9F9F9] transition-colors">
                      <td className="p-3.5 font-bold text-[#1D2327]">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#1D2327] text-white flex items-center justify-center font-bold text-[11px]">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>

                      <td className="p-3.5 text-[#2C3338] font-semibold">{student.email}</td>

                      <td className="p-3.5">
                        <a
                          href={`https://wa.me/${student.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#2271B1] hover:underline font-bold"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                          <span>{student.phone}</span>
                        </a>
                      </td>

                      <td className="p-3.5 font-semibold text-[#1D2327]">
                        <span className="capitalize">{student.requestedCourse || "WordPress"}</span>
                      </td>

                      <td className="p-3.5">
                        {student.status === "pending" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </span>
                        ) : student.status === "approved" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approved</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 border border-red-300">
                            <XCircle className="w-3 h-3" />
                            <span>Suspended</span>
                          </span>
                        )}
                      </td>

                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {student.enrolledCourses.length > 0 ? (
                            student.enrolledCourses.map((slug) => (
                              <span
                                key={slug}
                                className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase"
                              >
                                {slug}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] text-[#8C8F94] italic">None</span>
                          )}
                        </div>
                      </td>

                      <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                        {student.status === "pending" && (
                          <button
                            onClick={() => handleApprove(student)}
                            disabled={isLoading}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] inline-flex items-center gap-1 shadow-sm transition-all"
                            title="Approve student and grant course access"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Approve Admission</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="px-2.5 py-1 bg-[#F0F0F1] hover:bg-[#2271B1] hover:text-white text-[#2C3338] rounded font-semibold text-[11px] inline-flex items-center gap-1 transition-all"
                          title="Assign or modify accessible courses"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Courses</span>
                        </button>

                        <button
                          onClick={() => handleDelete(student.id)}
                          className="p-1 hover:bg-red-50 text-[#8C8F94] hover:text-red-600 rounded transition-colors"
                          title="Delete account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / ASSIGN COURSES MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-[#2C3338] shadow-lg max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCDCDE]">
              <div>
                <h3 className="text-base font-bold text-[#1D2327]">
                  Assign Course Classrooms
                </h3>
                <p className="text-xs text-[#646970]">
                  For: <strong>{editingStudent.name}</strong> ({editingStudent.email})
                </p>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-1 text-[#8C8F94] hover:text-[#1D2327]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#50575E]">
              Select which classes this student is permitted to view. Students CANNOT view classes that are unchecked.
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {courses.map((course) => {
                const checked = selectedCourses.includes(course.slug);
                return (
                  <label
                    key={course.slug}
                    className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F6F7F7] cursor-pointer text-xs font-semibold text-[#1D2327]"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCourses([...selectedCourses, course.slug]);
                        } else {
                          setSelectedCourses(selectedCourses.filter((s) => s !== course.slug));
                        }
                      }}
                      className="w-4 h-4 text-[#2271B1] rounded"
                    />
                    <span>{course.title}</span>
                  </label>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#DCDCDE] flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingStudent(null)}
                className="px-4 py-1.5 text-xs font-semibold text-[#50575E] hover:bg-[#F0F0F1] rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCourses}
                disabled={loadingId === editingStudent.id}
                className="px-4 py-1.5 text-xs font-bold bg-[#2271B1] hover:bg-[#135E96] text-white rounded shadow-sm"
              >
                Save Course Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
