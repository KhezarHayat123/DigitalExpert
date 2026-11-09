"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MediaFile } from "@/lib/types";
import { Upload, Copy, Check, Trash2, ExternalLink, Plus } from "lucide-react";

export default function MediaManagerClient({ initialMedia }: { initialMedia: MediaFile[] }) {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyUrl = (id: string, url: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Url = reader.result as string;
        const newFile: MediaFile = {
          id: `media-${Date.now()}`,
          name: file.name,
          url: base64Url,
          size: file.size,
          mimeType: file.type || "image/jpeg",
          altText: file.name,
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

        if (!res.ok) throw new Error("Failed to save image to media library");
        setMedia([newFile, ...media]);
        alert("Image uploaded successfully! You can now copy its URL and use it on any course or service.");
      } catch (err: any) {
        alert("Upload error: " + err.message);
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
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
            Upload custom pictures from your computer/mobile for courses, services, and website banners.
          </p>
        </div>

        <div>
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
            <span>{uploading ? "Uploading..." : "Upload Image from PC"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((file) => (
          <div key={file.id} className="bg-white rounded-xl border-2 border-de-black shadow-hard-sm overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-de-warm border-b border-de-border">
              <Image
                src={file.url}
                alt={file.altText || file.name}
                fill
                unoptimized={file.url.startsWith("data:")}
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
                  <span>{copiedId === file.id ? "Copied" : "Copy URL"}</span>
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
