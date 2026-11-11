"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MediaFile } from "@/lib/types";
import { uploadImageAndGetMediaUrl } from "@/lib/imageCompression";
import { Upload, Copy, Check, Trash2, Link as LinkIcon, Plus } from "lucide-react";

export default function MediaManagerClient({ initialMedia }: { initialMedia: MediaFile[] }) {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyUrl = (id: string, url: string) => {
    const shareableUrl = url.startsWith("data:") ? `/api/media/${id}` : url;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { mediaItem, persisted } = await uploadImageAndGetMediaUrl(file, 1000, 0.78);
      setMedia([mediaItem, ...media]);
      if (persisted === "temporary") {
        alert(
          "Picture uploaded to active temporary session only! Connect free Upstash Redis in Vercel Storage or GITHUB_TOKEN so uploaded images stay saved on the live website."
        );
      } else {
        alert("Picture uploaded successfully! Click 'Pick from Media Library' inside any Course, Service, or Feedback card, or click 'Copy URL'.");
      }
    } catch (err: any) {
      alert("Upload error: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddByUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    try {
      const newFile: MediaFile = {
        id: `media-${Date.now()}`,
        name: customName.trim() || "Web Image",
        url: customUrl.trim(),
        size: 1024,
        mimeType: "image/jpeg",
        altText: customName.trim() || "Web Image",
        uploadedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          collection: "media",
          item: newFile,
        }),
      });

      if (!res.ok) throw new Error("Failed to save URL image");
      setMedia([newFile, ...media]);
      setCustomUrl("");
      setCustomName("");
      setShowUrlDialog(false);
      alert("Image URL saved to library!");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this media item?")) return;
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: "media", id }),
      });
      if (!res.ok) throw new Error("Failed to delete media item");
      setMedia(media.filter((m) => m.id !== id));
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Media Library</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Upload custom pictures directly from your PC/Mobile or save image links for courses and services.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Compressing & Saving..." : "Upload from Device"}</span>
          </button>

          <button
            onClick={() => setShowUrlDialog(true)}
            className="px-3.5 py-2.5 rounded-btn bg-de-warm text-de-black hover:bg-white text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-1.5"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Add URL</span>
          </button>
        </div>
      </div>

      {showUrlDialog && (
        <div className="p-4 bg-de-warm rounded-2xl border-2 border-de-black shadow-hard-sm">
          <form onSubmit={handleAddByUrl} className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold uppercase text-de-muted mb-1">Image Name / Label</label>
              <input
                type="text"
                placeholder="e.g. Dubai Client Meeting or Course Banner"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full p-2.5 rounded-btn border border-de-border bg-white text-xs font-semibold focus:border-de-black"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold uppercase text-de-muted mb-1">Image URL (https://... or /brand/...)</label>
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/... or any online image"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full p-2.5 rounded-btn border border-de-border bg-white text-xs font-semibold focus:border-de-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2.5 rounded-btn bg-de-green text-white font-bold text-xs border border-de-black"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowUrlDialog(false)}
                className="px-3 py-2.5 rounded-btn bg-white border border-de-border font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((file) => (
          <div key={file.id} className="bg-white rounded-xl border-2 border-de-black shadow-hard-sm overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-de-warm border-b border-de-border">
              <Image
                src={file.url}
                alt={file.altText || file.name}
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>

            <div className="p-3 space-y-1">
              <p className="font-bold text-xs text-de-black truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-[10px] text-de-muted">
                {(file.size / 1024).toFixed(1)} KB &bull; {file.mimeType}
              </p>

              <div className="pt-2 flex items-center justify-between gap-1">
                <button
                  onClick={() => copyUrl(file.id, file.url)}
                  className="px-2.5 py-1 rounded bg-de-warm hover:bg-white text-[11px] font-bold border border-de-border flex items-center gap-1 transition-colors flex-1 justify-center"
                >
                  {copiedId === file.id ? <Check className="w-3 h-3 text-de-green" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === file.id ? "Copied!" : "Copy URL"}</span>
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-1 rounded text-de-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
