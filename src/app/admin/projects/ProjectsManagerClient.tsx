"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/types";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function ProjectsManagerClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          collection: "projects",
          item: editingProject,
        }),
      });

      if (!res.ok) throw new Error("Failed to save project");

      if (isNew) {
        setProjects([...projects, editingProject]);
      } else {
        setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
      }
      setEditingProject(null);
      setIsNew(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: "projects", id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setProjects(projects.filter((p) => p.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Projects & Portfolio</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Manage completed client projects, deliverables, and case study metrics.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProject({
              id: `proj-${Date.now()}`,
              title: "New Client Project",
              category: "WordPress",
              clientType: "Corporate Client",
              image: "/brand/digital-website.jpg",
              resultText: "Key result delivered for client...",
              featured: false,
              isSample: false,
              order: projects.length + 1,
            });
            setIsNew(true);
          }}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border-2 border-de-black shadow-hard overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full bg-de-warm border-b border-de-border">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-de-black text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {p.category}
                </span>
                {p.isSample && (
                  <span className="absolute top-3 right-3 bg-de-amber text-de-black text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-de-black">
                    Sample
                  </span>
                )}
              </div>

              <div className="p-5 space-y-2">
                <p className="text-xs font-bold text-de-green uppercase">{p.clientType}</p>
                <h3 className="font-heading font-extrabold text-base text-de-black">{p.title}</h3>
                <p className="text-xs text-de-muted line-clamp-3 font-medium">{p.resultText}</p>
              </div>
            </div>

            <div className="p-4 bg-de-warm border-t border-de-border flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setEditingProject(p);
                  setIsNew(false);
                }}
                className="px-3 py-1.5 rounded-btn bg-white hover:bg-de-black hover:text-white border border-de-black text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-1.5 rounded-btn hover:bg-red-50 text-de-muted hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">Edit Project</h3>
              <button onClick={() => setEditingProject(null)} className="p-1 rounded hover:bg-de-warm">
                <X className="w-5 h-5 text-de-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold bg-white"
                  >
                    {["WordPress", "SEO", "Social Media", "Ads", "Video", "YouTube"].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-de-muted mb-1">Client Type / Region</label>
                  <input
                    type="text"
                    value={editingProject.clientType}
                    onChange={(e) => setEditingProject({ ...editingProject, clientType: e.target.value })}
                    className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Results Delivered Text</label>
                <textarea
                  rows={3}
                  value={editingProject.resultText}
                  onChange={(e) => setEditingProject({ ...editingProject, resultText: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Image URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="flex-1 p-2.5 rounded-btn border border-de-border text-xs font-semibold"
                  />
                  {editingProject.image && (
                    <div className="relative w-12 h-10 rounded border border-de-black overflow-hidden shrink-0">
                      <Image src={editingProject.image} alt="Preview" fill className="object-cover" />
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
                      onClick={() => setEditingProject({ ...editingProject, image: p.url })}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-de-warm border border-de-border hover:bg-white"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-de-border">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-btn bg-de-warm border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
