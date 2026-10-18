"use client";

import { useState } from "react";
import { Enrollment, Course } from "@/lib/types";
import ScreenshotModal from "@/components/admin/ScreenshotModal";
import {
  FileCheck2,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface EnrollmentsManagerClientProps {
  initialEnrollments: Enrollment[];
  courses: Course[];
}

export default function EnrollmentsManagerClient({
  initialEnrollments,
  courses,
}: EnrollmentsManagerClientProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");

  // Screenshot Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<{
    path: string;
    studentName: string;
    courseTitle: string;
  } | null>(null);

  // Reject Modal State
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("Payment screenshot could not be verified.");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Filter logic
  const filtered = enrollments.filter((e) => {
    const matchesSearch =
      e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.whatsapp.includes(searchTerm) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.transactionId && e.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    const matchesCourse = courseFilter === "All" || e.courseSlug === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleUpdateStatus = async (
    id: string,
    status: Enrollment["status"],
    reason?: string
  ) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/enrollments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, rejectReason: reason }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEnrollments((prev) =>
        prev.map((item) => (item.id === id ? data.enrollment : item))
      );
      setRejectingId(null);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const exportToCSV = () => {
    if (filtered.length === 0) {
      alert("No enrollments to export.");
      return;
    }

    const headers = [
      "ID",
      "Date",
      "Student Name",
      "WhatsApp",
      "Email",
      "City",
      "Course",
      "Fee (PKR)",
      "Payment Method",
      "Transaction ID",
      "Status",
      "Notes",
    ];

    const rows = filtered.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleDateString(),
      `"${e.studentName.replace(/"/g, '""')}"`,
      `"${e.whatsapp}"`,
      `"${e.email}"`,
      `"${e.city}"`,
      `"${e.courseTitle.replace(/"/g, '""')}"`,
      e.feeAtTime,
      `"${e.paymentMethod}"`,
      `"${e.transactionId || ""}"`,
      e.status,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DigitalExpert_Enrollments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search, Filter & CSV Export */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Student Enrollments</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Verify payment receipts, confirm admission seats, or export records to CSV.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-xl border-2 border-de-black shadow-hard-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by student, phone, or TID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-9 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black focus:outline-none bg-de-warm/40"
          />
          <Search className="w-4 h-4 text-de-muted absolute left-3 top-2.5" />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-btn border border-de-border text-xs font-bold bg-white focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New (Pending)</option>
            <option value="Payment verified">Payment verified</option>
            <option value="Admission confirmed">Admission confirmed</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Course Filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 rounded-btn border border-de-border text-xs font-bold bg-white focus:outline-none max-w-[200px] truncate"
          >
            <option value="All">All Courses</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table of Enrollments */}
      <div className="bg-white rounded-2xl border-2 border-de-black shadow-hard overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-de-warm border-b-2 border-de-black text-[11px] font-heading font-extrabold uppercase tracking-wider text-de-black">
                <th className="p-4">Student</th>
                <th className="p-4">Course & Fee</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Receipt</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-de-border text-xs font-semibold text-de-body">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-de-muted">
                    No enrollments match your current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((enr) => (
                  <tr key={enr.id} className="hover:bg-de-warm/50 transition-colors">
                    {/* Student Info */}
                    <td className="p-4">
                      <p className="font-heading font-extrabold text-sm text-de-black">{enr.studentName}</p>
                      <p className="text-[11px] text-de-muted font-bold mt-0.5">{enr.city}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`https://wa.me/${enr.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${enr.studentName}, regarding your admission for ${enr.courseTitle} at DigitalExpert...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:underline flex items-center gap-1 font-bold"
                        >
                          <Phone className="w-3 h-3 fill-current" />
                          <span>{enr.whatsapp}</span>
                        </a>
                      </div>
                    </td>

                    {/* Course & Fee */}
                    <td className="p-4">
                      <p className="font-bold text-de-black">{enr.courseTitle}</p>
                      <p className="font-heading font-extrabold text-xs text-de-green mt-0.5">
                        {enr.feeAtTime.toLocaleString()} PKR
                      </p>
                      <span className="text-[10px] text-de-muted">
                        Applied: {new Date(enr.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    {/* Payment Info */}
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-de-warm border border-de-border font-bold text-de-black">
                        {enr.paymentMethod}
                      </span>
                      {enr.transactionId && (
                        <p className="text-[10px] text-de-muted font-mono mt-1">
                          TID: {enr.transactionId}
                        </p>
                      )}
                    </td>

                    {/* Screenshot Viewer Trigger */}
                    <td className="p-4">
                      {enr.screenshotPath ? (
                        <button
                          onClick={() => {
                            setSelectedScreenshot({
                              path: enr.screenshotPath,
                              studentName: enr.studentName,
                              courseTitle: enr.courseTitle,
                            });
                            setModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-btn bg-de-warm border-2 border-de-black text-de-black hover:bg-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5 text-de-green" />
                          <span>View Receipt</span>
                        </button>
                      ) : (
                        <span className="text-red-500 text-[11px] font-bold">No file</span>
                      )}
                    </td>

                    {/* Status Pill */}
                    <td className="p-4">
                      <span
                        className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          enr.status === "New"
                            ? "bg-de-amber/30 text-de-black border border-de-black/20"
                            : enr.status === "Admission confirmed"
                            ? "bg-de-green text-white"
                            : enr.status === "Payment verified"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {enr.status}
                      </span>
                      {enr.rejectReason && (
                        <p className="text-[10px] text-red-600 mt-1 max-w-[140px] truncate" title={enr.rejectReason}>
                          Reason: {enr.rejectReason}
                        </p>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-4 text-right space-x-1.5">
                      {enr.status !== "Admission confirmed" && (
                        <button
                          onClick={() => handleUpdateStatus(enr.id, "Admission confirmed")}
                          disabled={loadingId === enr.id}
                          className="px-3 py-1.5 rounded-btn bg-de-green text-white hover:bg-de-black text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1 disabled:opacity-50"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Confirm</span>
                        </button>
                      )}

                      {enr.status !== "Rejected" && (
                        <button
                          onClick={() => setRejectingId(enr.id)}
                          disabled={loadingId === enr.id}
                          className="px-3 py-1.5 rounded-btn bg-de-warm border border-de-border text-red-600 hover:bg-red-50 text-xs font-bold transition-colors inline-flex items-center gap-1 disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      {/* WhatsApp Contact */}
                      <a
                        href={`https://wa.me/${enr.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          enr.status === "Admission confirmed"
                            ? `Hi ${enr.studentName}, your admission in ${enr.courseTitle} at DigitalExpert is officially confirmed! Welcome to the batch.`
                            : `Hi ${enr.studentName}, we are reviewing your enrollment receipt for ${enr.courseTitle}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-btn bg-[#25D366] text-white hover:bg-black text-xs font-bold transition-colors inline-flex items-center"
                        title="Chat with Student on WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl border-3 border-de-black shadow-hard-lg space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-de-black">Reject Enrollment Application</h3>
            <p className="text-xs text-de-muted font-semibold">
              Please enter the reason for rejecting this application. This message will be sent to the student.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 rounded-btn border-2 border-de-border bg-de-warm text-xs font-semibold focus:border-de-black focus:outline-none resize-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingId(null)}
                className="px-4 py-2 rounded-btn bg-de-warm border border-de-border text-xs font-bold hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(rejectingId, "Rejected", rejectReason)}
                disabled={loadingId === rejectingId}
                className="px-4 py-2 rounded-btn bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Confirm Rejection & Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Private Screenshot Viewer Modal */}
      {selectedScreenshot && (
        <ScreenshotModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          screenshotPath={selectedScreenshot.path}
          studentName={selectedScreenshot.studentName}
          courseTitle={selectedScreenshot.courseTitle}
        />
      )}
    </div>
  );
}
