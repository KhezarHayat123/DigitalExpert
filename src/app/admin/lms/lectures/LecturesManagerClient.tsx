"use client";

import { useState } from "react";
import { Lecture, Course } from "@/lib/types";
import {
  Plus,
  Play,
  Edit,
  Trash2,
  X,
  ExternalLink,
  BookOpen,
  Clock,
  FileText,
  Video,
} from "lucide-react";

interface LecturesManagerClientProps {
  initialLectures: Lecture[];
  courses: Course[];
}

export default function LecturesManagerClient({
  initialLectures,
  courses,
}: LecturesManagerClientProps) {
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures);
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.slug || "wordpress");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);

  const [form, setForm] = useState<Partial<Lecture>>({
    title: "",
    courseSlug: selectedCourse,
    moduleTitle: "Module 1: Core Fundamentals",
    duration: "1 hr 15 mins",
    videoUrl: "",
    description: "",
    assignmentPrompt: "",
  });

  const courseLectures = lectures.filter((l) => l.courseSlug === selectedCourse);

  const openAddModal = () => {
    setEditingLecture(null);
    setForm({
      title: "",
      courseSlug: selectedCourse,
      moduleTitle: "Module 1: Core Fundamentals",
      duration: "1 hr",
      videoUrl: "",
      description: "",
      assignmentPrompt: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (lec: Lecture) => {
    setEditingLecture(lec);
    setForm({ ...lec });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/lms/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id: editingLecture?.id,
          courseSlug: form.courseSlug || selectedCourse,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        if (editingLecture) {
          setLectures(lectures.map((l) => (l.id === editingLecture.id ? data.lecture : l)));
        } else {
          setLectures([...lectures, data.lecture]);
        }
        setIsModalOpen(false);
      } else {
        alert(data.error || "Failed to save lecture.");
      }
    } catch {
      alert("Network error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;
    try {
      const res = await fetch(`/api/admin/lms/lectures/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLectures(lectures.filter((l) => l.id !== id));
      }
    } catch {
      alert("Network error.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Course Selector & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#DCDCDE] shadow-sm">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-[#1D2327] whitespace-nowrap">
            Select Course:
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 bg-[#F6F7F7] border border-[#8C8F94] rounded text-xs font-bold text-[#2C3338] focus:bg-white focus:outline-none cursor-pointer"
          >
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
          <span className="text-xs text-[#646970] font-semibold">
            ({courseLectures.length} Lectures)
          </span>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[#2271B1] hover:bg-[#135E96] text-white rounded font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video Lecture</span>
        </button>
      </div>

      {/* Lectures List */}
      <div className="bg-white rounded-xl border border-[#DCDCDE] shadow-sm overflow-hidden">
        {courseLectures.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Video className="w-12 h-12 text-[#8C8F94] mx-auto" />
            <h3 className="text-base font-bold text-[#1D2327]">No Lectures Uploaded Yet</h3>
            <p className="text-xs text-[#646970] max-w-sm mx-auto font-medium">
              Click &quot;Add New Video Lecture&quot; above to add YouTube unlisted or Vimeo video recordings for this course.
            </p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-[#2271B1] text-white rounded font-bold text-xs inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Lecture</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#F0F0F1]">
            {courseLectures.map((lec, idx) => (
              <div
                key={lec.id}
                className="p-4 hover:bg-[#F9F9F9] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1D2327] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#F0F0F1] rounded text-[10px] font-bold text-[#50575E]">
                        {lec.moduleTitle}
                      </span>
                      <span className="text-[11px] text-[#646970] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{lec.duration}</span>
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1D2327]">{lec.title}</h4>
                    {lec.videoUrl && (
                      <p className="text-xs text-[#2271B1] truncate max-w-md font-mono">
                        {lec.videoUrl}
                      </p>
                    )}
                    {lec.assignmentPrompt && (
                      <p className="text-xs text-[#646970] line-clamp-1 italic">
                        Assignment: {lec.assignmentPrompt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {lec.videoUrl && (
                    <a
                      href={lec.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#50575E] hover:text-[#2271B1] hover:bg-[#F0F0F1] rounded transition-colors"
                      title="Open Video URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => openEditModal(lec)}
                    className="p-1.5 text-[#50575E] hover:text-[#2271B1] hover:bg-[#F0F0F1] rounded transition-colors"
                    title="Edit lecture"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(lec.id)}
                    className="p-1.5 text-[#8C8F94] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete lecture"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT LECTURE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-[#2C3338] shadow-lg max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCDCDE]">
              <h3 className="text-base font-bold text-[#1D2327]">
                {editingLecture ? "Edit Lecture" : "Add New Class Lecture"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8C8F94] hover:text-[#1D2327]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#1D2327] mb-1">
                  Target Course
                </label>
                <select
                  value={form.courseSlug}
                  onChange={(e) => setForm({ ...form, courseSlug: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F7F7] border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                >
                  {courses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2327] mb-1">
                  Module Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Module 1: WordPress Foundations"
                  value={form.moduleTitle}
                  onChange={(e) => setForm({ ...form, moduleTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2327] mb-1">
                  Lecture Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Setting Up Localhost with LocalWP & cPanel"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1D2327] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 hr 20 mins"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1D2327] mb-1">
                    Video URL (YouTube/Vimeo)
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2327] mb-1">
                  Lecture Notes & Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of concepts covered in this video..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2327] mb-1">
                  Student Assignment Prompt (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Build a header and footer in Elementor and submit your live link..."
                  value={form.assignmentPrompt}
                  onChange={(e) => setForm({ ...form, assignmentPrompt: e.target.value })}
                  className="w-full px-3 py-2 border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                />
              </div>

              <div className="pt-3 border-t border-[#DCDCDE] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 text-xs font-semibold text-[#50575E] hover:bg-[#F0F0F1] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-[#2271B1] hover:bg-[#135E96] text-white rounded shadow-sm"
                >
                  Save Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
