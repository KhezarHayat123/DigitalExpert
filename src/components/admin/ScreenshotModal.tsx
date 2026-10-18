"use client";

import { X, ExternalLink, Download } from "lucide-react";

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenshotPath: string;
  studentName: string;
  courseTitle: string;
}

export default function ScreenshotModal({
  isOpen,
  onClose,
  screenshotPath,
  studentName,
  courseTitle,
}: ScreenshotModalProps) {
  if (!isOpen) return null;

  const isPdf = screenshotPath.toLowerCase().endsWith(".pdf");
  const imageUrl = `/api/admin/private-image?file=${encodeURIComponent(screenshotPath)}`;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl border-3 border-de-black shadow-hard-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-de-warm border-b-2 border-de-black flex items-center justify-between">
          <div>
            <h3 className="font-heading font-extrabold text-base text-de-black">
              Payment Receipt &bull; {studentName}
            </h3>
            <p className="text-xs font-bold text-de-green">{courseTitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-white text-de-muted hover:text-de-black transition-colors"
              title="Open full size in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white text-de-muted hover:text-de-black transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer */}
        <div className="p-4 overflow-y-auto flex-1 flex items-center justify-center bg-[#F2F0E8]">
          {isPdf ? (
            <iframe
              src={imageUrl}
              className="w-full h-[550px] border border-de-border rounded-xl"
              title="Payment Receipt PDF"
            />
          ) : (
            <div className="relative max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={`Receipt for ${studentName}`}
                className="max-h-[65vh] w-auto object-contain rounded-xl border-2 border-de-black shadow-md mx-auto"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-de-border text-center text-xs font-bold text-de-muted">
          Private Payment Store &bull; Authorized Admin Access Only
        </div>
      </div>
    </div>
  );
}
