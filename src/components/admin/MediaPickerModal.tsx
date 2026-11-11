"use client";

import { useEffect, useState } from "react";
import { MediaFile } from "@/lib/types";
import { compressImage } from "@/lib/imageCompression";
import { X, Upload, Search, Check, ImageIcon, RefreshCw } from "lucide-react";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = "Select Image from Media Library",
}: MediaPickerModalProps) {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchMedia = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load Media Library");
      const json = await res.json();
      setMedia(json?.data?.media || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch media");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUploadNew = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const optimizedUrl = await compressImage(file, 1200, 0.82);
      const newMedia: MediaFile = {
        id: `med-${Date.now()}`,
        name: file.name,
        url: optimizedUrl,
        size: Math.round((optimizedUrl.length * 3) / 4),
        mimeType: "image/jpeg",
        altText: file.name.replace(/\.[^.]+$/, ""),
        uploadedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", collection: "media", item: newMedia }),
      });

      if (!res.ok) throw new Error("Failed to save uploaded image");
      setMedia((prev) => [newMedia, ...prev]);
      onSelect(optimizedUrl);
      onClose();
    } catch (err: any) {
      setError("Upload failed: " + (err.message || "Unknown error"));
    }
    setUploading(false);
    e.target.value = "";
  };

  const filtered = media.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      (m.altText || "").toLowerCase().includes(q) ||
      m.url.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border-3 border-de-black shadow-hard-lg overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-de-warm border-b-2 border-de-black flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-de-black flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-de-green" />
              <span>{title}</span>
            </h3>
            <p className="text-xs text-de-muted font-medium">
              Click any picture to select it, or upload a new image from your computer/mobile.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="modal-media-upload"
              accept="image/*"
              onChange={handleUploadNew}
              className="hidden"
              disabled={uploading}
            />
            <label
              htmlFor="modal-media-upload"
              className={`px-3.5 py-2 bg-de-amber text-de-black font-bold text-xs rounded-xl border-2 border-de-black cursor-pointer hover:bg-amber-400 transition-colors flex items-center gap-1.5 ${
                uploading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? "Uploading..." : "Upload New Picture"}</span>
            </label>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white text-de-muted hover:text-de-black transition-colors border border-transparent hover:border-de-black"
              aria-label="Close Media Picker"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="p-3 sm:px-5 bg-white border-b border-de-border flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-de-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search uploaded images by name..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border-2 border-de-border focus:border-de-black outline-none"
            />
          </div>
          <button
            type="button"
            onClick={fetchMedia}
            disabled={loading}
            className="px-3 py-2 rounded-xl border-2 border-de-border hover:border-de-black text-xs font-bold text-de-black flex items-center gap-1"
            title="Refresh media list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-[#F9F9F6]">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center text-sm font-bold text-de-muted">
              Loading Media Library images...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm font-bold text-de-muted">
              No matching images found. Click &ldquo;Upload New Picture&rdquo; above to add one!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect(item.url);
                    onClose();
                  }}
                  className="group bg-white rounded-xl border-2 border-de-border hover:border-de-black overflow-hidden text-left flex flex-col transition-all hover:shadow-md focus:outline-none"
                >
                  <div className="relative h-28 w-full bg-de-warm overflow-hidden border-b border-de-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.altText || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/45 flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-full bg-de-amber text-de-black font-bold text-[11px] flex items-center gap-1 border border-de-black">
                        <Check className="w-3 h-3" /> Select
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-bold text-de-black truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-de-muted truncate">
                      {item.mimeType}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
