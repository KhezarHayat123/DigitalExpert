"use client";

import { useState } from "react";
import { Testimonial } from "@/lib/types";
import { Plus, Edit2, Trash2, X, Star } from "lucide-react";

export default function TestimonialsManagerClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

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
      if (!res.ok) throw new Error("Failed to save testimonial");

      if (isNew) setTestimonials([...testimonials, editingItem]);
      else setTestimonials(testimonials.map((t) => (t.id === editingItem.id ? editingItem : t)));
      setEditingItem(null);
      setIsNew(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: "testimonials", id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Client Reviews & Testimonials</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Manage international client testimonials displayed on the homepage.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem({
              id: `test-${Date.now()}`,
              name: "Client Name",
              role: "CEO, Company",
              country: "Dubai, UAE",
              text: "DigitalExpert delivered outstanding growth...",
              rating: 5,
              isSample: false,
            });
            setIsNew(true);
          }}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-de-amber">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-de-amber" />
                ))}
              </div>
              <p className="text-xs text-de-body font-semibold italic">&ldquo;{t.text}&rdquo;</p>
            </div>

            <div className="pt-3 border-t border-de-border flex items-center justify-between">
              <div>
                <p className="font-heading font-extrabold text-sm text-de-black">{t.name}</p>
                <p className="text-[11px] text-de-muted">{t.role}</p>
                <p className="text-[10px] text-de-green font-bold">{t.country}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingItem(t);
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded hover:bg-de-warm"
                >
                  <Edit2 className="w-3.5 h-3.5 text-de-muted" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 rounded hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">Edit Testimonial</h3>
              <button onClick={() => setEditingItem(null)} className="p-1 rounded hover:bg-de-warm">
                <X className="w-5 h-5 text-de-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
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
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Review Text</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.text}
                  onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
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
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green"
                >
                  {saving ? "Saving..." : "Save Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
