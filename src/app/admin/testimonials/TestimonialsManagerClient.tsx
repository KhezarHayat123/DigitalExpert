"use client";

import { useState } from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/types";
import { compressImage } from "@/lib/imageCompression";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Star,
  Copy,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export default function TestimonialsManagerClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"screenshot" | "photo" | null>(null);

  const saveUploadToMediaLibrary = (url: string, fileName: string) => {
    fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "save",
        collection: "media",
        item: {
          id: `med-${Date.now()}`,
          name: fileName,
          url,
          size: Math.round((url.length * 3) / 4),
          mimeType: "image/jpeg",
          altText: fileName,
          uploadedAt: new Date().toISOString(),
        },
      }),
    }).catch(() => {});
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", collection: "testimonials", item: editingItem }),
      });
      if (!res.ok) throw new Error("Failed to save review");

      if (isNew) setTestimonials([editingItem, ...testimonials]);
      else setTestimonials(testimonials.map((t) => (t.id === editingItem.id ? editingItem : t)));
      setEditingItem(null);
      setIsNew(false);
    } catch (e: any) {
      alert("Save error: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // 1-Click Duplicate / Clone Function
  const handleDuplicate = async (item: Testimonial) => {
    const duplicated: Testimonial = {
      ...item,
      id: `test-${Date.now()}`,
      name: `${item.name} (Copy)`,
      isSample: false,
    };

    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", collection: "testimonials", item: duplicated }),
      });
      if (!res.ok) throw new Error("Failed to duplicate feedback card");

      setTestimonials([duplicated, ...testimonials]);
      // Open editor directly for the duplicated card so user can quickly tweak details
      setEditingItem(duplicated);
      setIsNew(false);
    } catch (e: any) {
      alert("Duplicate error: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback item?")) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: "testimonials", id }),
      });
      if (!res.ok) throw new Error("Failed to delete review");
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (e: any) {
      alert("Delete error: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Client & Student Feedback Manager</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Add, duplicate, and manage daily client reviews (UAE / Global) and student feedback displayed on the website.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem({
              id: `test-${Date.now()}`,
              name: "Client or Student Name",
              role: "CEO, Dubai Trading Co.",
              country: "Dubai, UAE",
              text: "",
              rating: 5,
              type: "client",
              isSample: false,
              photo: "",
              screenshot: "/brand/feedback-whatsapp-client.jpg",
            });
            setIsNew(true);
          }}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Feedback</span>
        </button>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => {
          const isStudent =
            t.type === "student" ||
            (t.role && (t.role.toLowerCase().includes("student") || t.role.toLowerCase().includes("batch") || t.role.toLowerCase().includes("graduate")));

          return (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold border uppercase tracking-wider ${
                      isStudent
                        ? "bg-de-green/15 text-de-green border-de-green"
                        : "bg-de-amber/25 text-de-black border-de-amber"
                    }`}
                  >
                    {isStudent ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                    <span>{isStudent ? "Student Feedback" : "Client Review"}</span>
                  </span>

                  <div className="flex items-center gap-1 text-de-amber">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-de-amber text-de-amber" />
                    ))}
                  </div>
                </div>

                {t.screenshot ? (
                  <div className="relative h-36 w-full rounded-xl border-2 border-de-border overflow-hidden bg-de-warm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.screenshot}
                      alt={`${t.name} screenshot`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                {t.text && (
                  <p className="text-xs text-de-body font-semibold italic line-clamp-2">
                    &ldquo;{t.text}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-de-border flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-9 h-9 rounded-full border border-de-black overflow-hidden bg-de-warm shrink-0 flex items-center justify-center text-xs font-bold">
                    {t.photo ? (
                      <Image
                        src={t.photo}
                        alt={t.name}
                        fill
                        unoptimized={t.photo.startsWith("data:")}
                        className="object-cover"
                      />
                    ) : (
                      <span>{t.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-extrabold text-xs text-de-black truncate">{t.name}</p>
                    <p className="text-[10px] text-de-muted truncate">{t.role}</p>
                    <p className="text-[10px] text-de-green font-bold truncate">{t.country}</p>
                  </div>
                </div>

                {/* Actions: Duplicate, Edit, Delete */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleDuplicate(t)}
                    title="Duplicate / Copy this card"
                    className="p-1.5 rounded hover:bg-de-warm text-de-muted hover:text-de-black transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingItem(t);
                      setIsNew(false);
                    }}
                    title="Edit review"
                    className="p-1.5 rounded hover:bg-de-warm text-de-muted hover:text-de-black transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    title="Delete review"
                    className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">
                {isNew ? "Add New Feedback" : "Edit Feedback Card"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded hover:bg-de-warm"
              >
                <X className="w-5 h-5 text-de-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1.5">Feedback Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, type: "client" })}
                    className={`py-2 px-3 rounded-btn border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      editingItem.type !== "student"
                        ? "bg-de-amber text-de-black border-de-black shadow-hard-sm"
                        : "bg-de-warm text-de-muted border-de-border"
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Client Review (UAE/Global)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, type: "student" })}
                    className={`py-2 px-3 rounded-btn border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      editingItem.type === "student"
                        ? "bg-de-green text-white border-de-black shadow-hard-sm"
                        : "bg-de-warm text-de-muted border-de-border"
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student Feedback</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">
                  {editingItem.type === "student" ? "Student Name" : "Client / Business Name"}
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Tariq Mansoor or Muhammad Ali"
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">
                    {editingItem.type === "student" ? "Course Enrolled" : "Role / Company"}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder={editingItem.type === "student" ? "AI Web & App Dev Student" : "CEO, Real Estate Dubai"}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Country / City</label>
                  <input
                    type="text"
                    required
                    value={editingItem.country}
                    onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })}
                    placeholder="Dubai, UAE or Bahawalpur, PK"
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                </div>
              </div>

              {/* Feedback Message Screenshot (Primary Showcase on /feedback) */}
              <div className="p-3.5 rounded-xl bg-de-warm border-2 border-de-black space-y-2.5">
                <label className="block text-xs font-extrabold uppercase text-de-black">
                  Feedback Message Screenshot (WhatsApp / Chat Picture)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingItem.screenshot || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, screenshot: e.target.value })}
                    placeholder="/brand/feedback-whatsapp-client.jpg or upload / pick from library"
                    className="flex-1 p-2.5 rounded-btn bg-white border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                  {editingItem.screenshot && (
                    <div className="relative w-16 h-12 rounded-lg border-2 border-de-black overflow-hidden shrink-0 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingItem.screenshot}
                        alt="Screenshot preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    id="admin-review-screenshot-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const optimizedUrl = await compressImage(file, 1200, 0.85);
                        setEditingItem((prev) => (prev ? { ...prev, screenshot: optimizedUrl } : null));
                        saveUploadToMediaLibrary(optimizedUrl, file.name);
                      } catch (err: any) {
                        alert("Screenshot compression error: " + err.message);
                      }
                    }}
                  />
                  <label
                    htmlFor="admin-review-screenshot-upload"
                    className="px-3 py-1.5 rounded-btn bg-de-black text-white hover:bg-de-green text-[11px] font-bold cursor-pointer inline-flex items-center gap-1.5 transition-colors border border-de-black"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Screenshot (PC / Mobile)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("screenshot")}
                    className="px-3 py-1.5 rounded-btn bg-de-amber text-de-black hover:bg-amber-400 text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors border border-de-black"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Pick from Media Library</span>
                  </button>
                </div>
              </div>

              {/* Photo Input with Computer Upload (Compressed) */}
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">
                  Avatar Picture (Upload from PC or enter URL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingItem.photo || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, photo: e.target.value })}
                    placeholder="/brand/khezar-hayat.png or upload below"
                    className="flex-1 p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                  {editingItem.photo && (
                    <div className="relative w-10 h-10 rounded-full border-2 border-de-black overflow-hidden shrink-0">
                      <Image
                        src={editingItem.photo}
                        alt="Preview"
                        fill
                        unoptimized={editingItem.photo.startsWith("data:")}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    id="admin-review-file-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const optimizedUrl = await compressImage(file, 400, 0.85);
                        setEditingItem((prev) => (prev ? { ...prev, photo: optimizedUrl } : null));
                        saveUploadToMediaLibrary(optimizedUrl, file.name);
                      } catch (err: any) {
                        alert("Image compression error: " + err.message);
                      }
                    }}
                  />
                  <label
                    htmlFor="admin-review-file-upload"
                    className="px-3 py-1.5 rounded-btn bg-de-black text-white hover:bg-de-green text-[11px] font-bold cursor-pointer inline-flex items-center gap-1.5 transition-colors border border-de-black"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Picture from Device</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("photo")}
                    className="px-3 py-1.5 rounded-btn bg-de-warm text-de-black hover:bg-white text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors border border-de-black"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Pick from Media Library</span>
                  </button>
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setEditingItem({ ...editingItem, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (editingItem.rating || 5)
                            ? "fill-de-amber text-de-amber"
                            : "text-de-border"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-extrabold text-de-black ml-2">
                    {editingItem.rating || 5} Stars
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">
                  Short Caption / Message Note (Optional if screenshot uploaded)
                </label>
                <textarea
                  rows={3}
                  required={!editingItem.screenshot}
                  value={editingItem.text}
                  onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                  placeholder="Share details of their feedback or success results..."
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-de-border">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-btn bg-de-warm border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green transition-colors"
                >
                  {saving ? "Saving..." : "Save Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={mediaPickerTarget !== null}
        onClose={() => setMediaPickerTarget(null)}
        title={
          mediaPickerTarget === "screenshot"
            ? "Select Feedback Message Screenshot"
            : "Select Client / Student Avatar"
        }
        onSelect={(url) => {
          setEditingItem((prev) => {
            if (!prev) return null;
            if (mediaPickerTarget === "screenshot") return { ...prev, screenshot: url };
            return { ...prev, photo: url };
          });
        }}
      />
    </div>
  );
}
