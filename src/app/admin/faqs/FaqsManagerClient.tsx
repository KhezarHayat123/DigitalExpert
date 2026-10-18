"use client";

import { useState } from "react";
import { FAQ } from "@/lib/types";
import { Plus, Edit2, Trash2, X, HelpCircle } from "lucide-react";

export default function FaqsManagerClient({ initialFaqs }: { initialFaqs: FAQ[] }) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", collection: "faqs", item: editingFaq }),
      });
      if (!res.ok) throw new Error("Failed to save FAQ");

      if (isNew) setFaqs([...faqs, editingFaq]);
      else setFaqs(faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f)));
      setEditingFaq(null);
      setIsNew(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: "faqs", id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setFaqs(faqs.filter((f) => f.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Frequently Asked Questions</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Add or edit questions displayed in the FAQ accordion on the Home and FAQ pages.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingFaq({
              id: `faq-${Date.now()}`,
              question: "New Question?",
              answer: "Detailed answer...",
              group: "General",
              order: faqs.length + 1,
            });
            setIsNew(true);
          }}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="p-5 bg-white rounded-xl border-2 border-de-black shadow-hard-sm flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold bg-de-warm border border-de-border px-2 py-0.5 rounded text-de-green">
                {f.group}
              </span>
              <h3 className="font-heading font-extrabold text-base text-de-black">{f.question}</h3>
              <p className="text-xs text-de-muted font-medium leading-relaxed">{f.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditingFaq(f);
                  setIsNew(false);
                }}
                className="p-1.5 rounded-btn hover:bg-de-warm text-de-muted hover:text-de-black transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(f.id)}
                className="p-1.5 rounded-btn hover:bg-red-50 text-de-muted hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingFaq && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">Edit FAQ</h3>
              <button onClick={() => setEditingFaq(null)} className="p-1 rounded hover:bg-de-warm">
                <X className="w-5 h-5 text-de-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Category Group</label>
                <select
                  value={editingFaq.group}
                  onChange={(e) => setEditingFaq({ ...editingFaq, group: e.target.value as any })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold bg-white"
                >
                  {["General", "Courses", "Services", "Payment", "Admission"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-de-border">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-btn bg-de-warm border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green"
                >
                  {saving ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
