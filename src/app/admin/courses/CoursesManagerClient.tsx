"use client";

import { useState } from "react";
import Image from "next/image";
import { Course } from "@/lib/types";
import { Plus, Edit2, Trash2, Check, X, Clock, ExternalLink } from "lucide-react";

export default function CoursesManagerClient({ initialCourses }: { initialCourses: Course[] }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          collection: "courses",
          item: editingCourse,
        }),
      });

      if (!res.ok) throw new Error("Failed to save course");

      if (isNew) {
        setCourses([...courses, editingCourse]);
      } else {
        setCourses(courses.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
      }
      setEditingCourse(null);
      setIsNew(false);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          collection: "courses",
          id,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setCourses(courses.filter((c) => c.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Course Catalog Manager</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Update fees, course syllabi, lecture durations, and instructors. Public website updates immediately.
          </p>
        </div>

        <button
          onClick={() => {
            const newId = `course-${Date.now()}`;
            setEditingCourse({
              id: newId,
              slug: `new-course-${Date.now().toString().slice(-4)}`,
              title: "New Practical Masterclass",
              shortDescription: "Course short description...",
              description: "Full in-depth description...",
              level: "Beginner",
              duration: "2 Months (24 Lectures)",
              scheduleText: "3 Days a Week - 6:00 PM to 8:00 PM PKT",
              fee: 15000,
              image: "/images/courses/wordpress.webp",
              instructor: "Khezar Hayat",
              tools: ["WordPress", "SEO", "Elementor"],
              whatYouWillLearn: ["Key skill 1", "Key skill 2", "Key skill 3"],
              modules: [
                {
                  id: "m1",
                  title: "Module 1: Foundations",
                  duration: "2 Weeks",
                  lectures: [{ title: "Introduction & Setup", duration: "2 hrs" }],
                },
              ],
              published: true,
              order: courses.length + 1,
            });
            setIsNew(true);
          }}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border-2 border-de-black shadow-hard overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full bg-de-warm border-b border-de-border">
                <Image src={c.image} alt={c.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-de-black text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {c.level}
                </span>
                <span className="absolute top-3 right-3 bg-de-amber text-de-black font-extrabold text-xs px-2.5 py-0.5 rounded-full border border-de-black">
                  {c.fee.toLocaleString()} PKR
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-heading font-extrabold text-lg text-de-black leading-tight">{c.title}</h3>
                <p className="text-xs text-de-muted font-medium line-clamp-2">{c.shortDescription}</p>
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-de-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-de-green" /> {c.duration}
                  </span>
                  <span>{c.instructor}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-de-warm border-t border-de-border flex items-center justify-between">
              <a
                href={`/courses/${c.slug}`}
                target="_blank"
                className="text-xs font-bold text-de-muted hover:text-de-black flex items-center gap-1"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCourse(c);
                    setIsNew(false);
                  }}
                  className="px-3 py-1.5 rounded-btn bg-white hover:bg-de-black hover:text-white border border-de-black text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 rounded-btn hover:bg-red-50 text-de-muted hover:text-red-600 transition-colors"
                  title="Delete course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">
                {isNew ? "Create New Course" : `Edit: ${editingCourse.title}`}
              </h3>
              <button onClick={() => setEditingCourse(null)} className="p-1 rounded hover:bg-de-warm">
                <X className="w-5 h-5 text-de-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.slug}
                    onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Fee (PKR)</label>
                  <input
                    type="number"
                    required
                    value={editingCourse.fee}
                    onChange={(e) => setEditingCourse({ ...editingCourse, fee: parseInt(e.target.value, 10) || 0 })}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Level</label>
                  <select
                    value={editingCourse.level}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as any })}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingCourse.shortDescription}
                  onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Instructor</label>
                <input
                  type="text"
                  value={editingCourse.instructor}
                  onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Schedule Details</label>
                <input
                  type="text"
                  value={editingCourse.scheduleText}
                  onChange={(e) => setEditingCourse({ ...editingCourse, scheduleText: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Course Card Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingCourse.image || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                    placeholder="/brand/digital-website.jpg"
                    className="flex-1 p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                  {editingCourse.image && (
                    <div className="relative w-12 h-10 rounded border border-de-black overflow-hidden shrink-0">
                      <Image src={editingCourse.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-de-muted font-bold self-center">Presets:</span>
                  {[
                    { label: "Website", url: "/brand/digital-website.jpg" },
                    { label: "Ads & SEO", url: "/brand/digital-ads-seo.jpg" },
                    { label: "Social Media", url: "/brand/digital-social-media.jpg" },
                    { label: "Workspace", url: "/brand/digital-marketing-workspace.png" },
                    { label: "Academy", url: "/brand/digital-academy.jpg" },
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.url}
                      onClick={() => setEditingCourse({ ...editingCourse, image: p.url })}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-de-warm border border-de-border hover:bg-white"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Tools (comma-separated)</label>
                <input
                  type="text"
                  value={editingCourse.tools.join(", ")}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      tools: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-de-border">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 rounded-btn bg-de-warm border border-de-border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green transition-colors"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
