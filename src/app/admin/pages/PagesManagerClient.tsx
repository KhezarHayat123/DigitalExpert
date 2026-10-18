"use client";

import { useState } from "react";
import { CMSPage } from "@/lib/types";
import { Edit3, Check, ExternalLink, Save } from "lucide-react";

export default function PagesManagerClient({ initialPages }: { initialPages: CMSPage[] }) {
  const [pages, setPages] = useState<CMSPage[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<CMSPage>(initialPages[0]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          collection: "pages",
          item: {
            ...selectedPage,
            lastUpdated: new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to save page");

      setPages(pages.map((p) => (p.id === selectedPage.id ? selectedPage : p)));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Pages & Legal Content (WYSIWYG CMS)</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Edit text content for Privacy Policy, Terms, Refund, Payment, Cookie policies, and website documents.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
        >
          {saving ? (
            <span>Saving...</span>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-de-amber" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document Selector (4 cols) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-2xl border-2 border-de-black shadow-hard space-y-2">
          <p className="text-xs font-heading font-extrabold uppercase text-de-muted px-2 pb-2 border-b border-de-border">
            Editable Documents
          </p>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPage(p)}
              className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-bold flex items-center justify-between ${
                selectedPage.id === p.id
                  ? "bg-de-warm border-de-black shadow-sm text-de-black"
                  : "bg-white border-transparent text-de-muted hover:bg-de-warm/50"
              }`}
            >
              <div>
                <p className="font-extrabold text-de-black">{p.title}</p>
                <p className="text-[10px] text-de-muted mt-0.5">/legal/{p.slug}</p>
              </div>
              <Edit3 className="w-4 h-4 text-de-green" />
            </button>
          ))}
        </div>

        {/* Editor Area (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-de-border">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-de-black">{selectedPage.title}</h3>
              <p className="text-xs text-de-muted">Last updated: {selectedPage.lastUpdated}</p>
            </div>
            <a
              href={`/legal/${selectedPage.slug}`}
              target="_blank"
              className="text-xs font-bold text-de-green hover:underline flex items-center gap-1"
            >
              <span>View Live Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1.5">SEO Title</label>
            <input
              type="text"
              value={selectedPage.seoTitle || ""}
              onChange={(e) => setSelectedPage({ ...selectedPage, seoTitle: e.target.value })}
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1.5">SEO Meta Description</label>
            <input
              type="text"
              value={selectedPage.seoDescription || ""}
              onChange={(e) => setSelectedPage({ ...selectedPage, seoDescription: e.target.value })}
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1.5">
              Document HTML / Markdown Content
            </label>
            <textarea
              rows={16}
              value={selectedPage.content}
              onChange={(e) => setSelectedPage({ ...selectedPage, content: e.target.value })}
              className="w-full p-4 rounded-xl border-2 border-de-border bg-de-warm/30 font-mono text-xs leading-relaxed text-de-body focus:border-de-black focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm"
            >
              {saving ? "Saving Document..." : "Save Page Content"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
