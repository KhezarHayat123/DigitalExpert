"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaFile } from "@/lib/types";
import { Upload, Copy, Check, Trash2, ExternalLink } from "lucide-react";

export default function MediaManagerClient({ initialMedia }: { initialMedia: MediaFile[] }) {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUrl = (id: string, url: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Media Library</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Public brand assets, logos, and illustrations. (Payment screenshots are stored securely in private storage).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((file) => (
          <div key={file.id} className="bg-white rounded-xl border-2 border-de-black shadow-hard-sm overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-de-warm border-b border-de-border">
              <Image src={file.url} alt={file.altText || file.name} fill className="object-contain p-2" />
            </div>

            <div className="p-3 space-y-1">
              <p className="font-bold text-xs text-de-black truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-[10px] text-de-muted">
                {(file.size / 1024).toFixed(1)} KB &bull; {file.mimeType}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => copyUrl(file.id, file.url)}
                  className="px-2.5 py-1 rounded bg-de-warm hover:bg-white text-[11px] font-bold border border-de-border flex items-center gap-1 transition-colors"
                >
                  {copiedId === file.id ? <Check className="w-3 h-3 text-de-green" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === file.id ? "Copied" : "Copy URL"}</span>
                </button>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-de-muted hover:text-de-black"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
