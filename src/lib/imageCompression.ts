/**
 * Client-side image compression using HTML5 Canvas.
 * Resizes large device/camera photos to a fast, web-optimized JPEG data URL (~35-75KB)
 * so they upload instantly and render fast across mobile and desktop connections.
 */
export function compressImage(
  file: File,
  maxWidth = 1000,
  quality = 0.78,
  maxHeight = 1400
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("compressImage can only be called in the browser"));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        reject(new Error("Empty image data"));
        return;
      }

      // If already a tiny SVG or small image under 50KB, return as-is
      if (file.type === "image/svg+xml" || file.size < 50 * 1024) {
        resolve(dataUrl);
        return;
      }

      const img = new window.Image();
      img.onerror = () => reject(new Error("Failed to parse image for compression"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export interface UploadedMediaResult {
  id: string;
  url: string;
  mediaItem: {
    id: string;
    name: string;
    url: string;
    size: number;
    mimeType: string;
    altText: string;
    uploadedAt: string;
    createdAt: string;
  };
  persisted: "disk" | "cloud" | "temporary";
}

/**
 * Compress an image file in the browser, store it in the Admin Media Library,
 * and return a fast cacheable `/api/media/<id>` URL when persistent storage is active.
 */
export async function uploadImageAndGetMediaUrl(
  file: File,
  maxWidth = 1000,
  quality = 0.78
): Promise<UploadedMediaResult> {
  const optimizedDataUrl = await compressImage(file, maxWidth, quality);
  const id = `med-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();

  const mediaItem = {
    id,
    name: file.name,
    url: optimizedDataUrl,
    size: Math.round((optimizedDataUrl.length * 3) / 4),
    mimeType: "image/jpeg",
    altText: file.name.replace(/\.[^.]+$/, ""),
    uploadedAt: now,
    createdAt: now,
  };

  const res = await fetch("/api/admin/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "save",
      collection: "media",
      item: mediaItem,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error || "Failed to save uploaded image");
  }

  const resJson = await res.json().catch(() => ({}));
  const persisted = (resJson?.persisted || "temporary") as "disk" | "cloud" | "temporary";

  // When persisted to local disk or cloud DB, serve via fast cached binary endpoint instead of huge inline base64 HTML
  const effectiveUrl = persisted === "temporary" ? optimizedDataUrl : `/api/media/${id}`;

  return {
    id,
    url: effectiveUrl,
    mediaItem: { ...mediaItem, url: effectiveUrl },
    persisted,
  };
}
