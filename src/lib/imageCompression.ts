/**
 * Client-side image compression using HTML5 Canvas.
 * Resizes large device/camera photos to a fast, web-optimized JPEG data URL (~50-120KB)
 * so they upload instantly without payload size errors.
 */
export function compressImage(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
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

      // If already a tiny SVG or small image under 60KB, return as-is
      if (file.type === "image/svg+xml" || file.size < 60 * 1024) {
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
