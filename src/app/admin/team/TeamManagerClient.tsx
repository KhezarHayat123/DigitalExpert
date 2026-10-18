"use client";

import { useState } from "react";
import Image from "next/image";
import { TeamMember } from "@/lib/types";
import { Edit2, Plus, Trash2, X } from "lucide-react";

export default function TeamManagerClient({ initialTeam }: { initialTeam: TeamMember[] }) {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", collection: "team", item: editingMember }),
      });
      if (!res.ok) throw new Error("Failed to save team member");

      if (isNew) setTeam([...team, editingMember]);
      else setTeam(team.map((m) => (m.id === editingMember.id ? editingMember : m)));
      setEditingMember(null);
      setIsNew(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: "team", id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setTeam(team.filter((m) => m.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Team Members & Leadership</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Manage agency founders and instructors displayed on the About Us page.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingMember({
              id: `team-${Date.now()}`,
              name: "New Member",
              role: "Marketing Specialist",
              photo: "/brand/khezar-hayat.png",
              description: "Bio and role details...",
              socialLinks: {},
              order: team.length + 1,
            });
            setIsNew(true);
          }}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {team.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border-2 border-de-black shadow-hard overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] w-full bg-[#0B1528] border-b border-de-border">
                <Image src={m.photo} alt={m.name} fill className="object-cover object-top" />
                {m.experienceBadge && (
                  <span className="absolute top-3 left-3 bg-de-amber text-de-black font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-de-black">
                    {m.experienceBadge}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-heading font-extrabold text-lg text-de-black">{m.name}</h3>
                <p className="text-xs font-extrabold text-de-green uppercase">{m.role}</p>
                <p className="text-xs text-de-muted font-medium line-clamp-3">{m.description}</p>
              </div>
            </div>

            <div className="p-4 bg-de-warm border-t border-de-border flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setEditingMember(m);
                  setIsNew(false);
                }}
                className="px-3 py-1.5 rounded-btn bg-white hover:bg-de-black hover:text-white border border-de-black text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="p-1.5 rounded-btn hover:bg-red-50 text-de-muted hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingMember && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">Edit Team Member</h3>
              <button onClick={() => setEditingMember(null)} className="p-1 rounded hover:bg-de-warm">
                <X className="w-5 h-5 text-de-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Role</label>
                <input
                  type="text"
                  required
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Description / Bio</label>
                <textarea
                  rows={3}
                  value={editingMember.description}
                  onChange={(e) => setEditingMember({ ...editingMember, description: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Photo URL</label>
                <input
                  type="text"
                  value={editingMember.photo}
                  onChange={(e) => setEditingMember({ ...editingMember, photo: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-de-border">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-btn bg-de-warm border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green"
                >
                  {saving ? "Saving..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
