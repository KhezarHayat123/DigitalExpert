"use client";

import { useState } from "react";
import Image from "next/image";
import { Service, ServicePackage } from "@/lib/types";
import { compressImage } from "@/lib/imageCompression";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { Edit2, ExternalLink, CheckCircle2, Upload, Image as ImageIcon } from "lucide-react";

export default function ServicesManagerClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const saveUploadToMediaLibrary = (url: string, fileName: string) => {
    fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "save",
        collection: "media",
        item: {
          id: `med-${Date.now()}`,
          name: fileName,
          url,
          size: Math.round((url.length * 3) / 4),
          mimeType: "image/jpeg",
          altText: fileName,
          uploadedAt: new Date().toISOString(),
        },
      }),
    }).catch(() => {});
  };

  const handlePackagePriceChange = (pkgId: string, newPrice: number) => {
    if (!selectedService) return;
    const updatedPackages = selectedService.packages.map((p) =>
      p.id === pkgId ? { ...p, price: newPrice } : p
    );
    setSelectedService({ ...selectedService, packages: updatedPackages });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          collection: "services",
          item: selectedService,
        }),
      });

      if (!res.ok) throw new Error("Failed to save service");
      setServices(services.map((s) => (s.id === selectedService.id ? selectedService : s)));
      alert("Service & package prices saved successfully!");
      setSelectedService(null);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Services & Pricing Manager</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Manage agency services, deliverables, and exact client package rates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border-2 border-de-black shadow-hard overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full bg-de-warm border-b border-de-border">
                <Image src={s.image} alt={s.name} fill className="object-cover" />
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading font-extrabold text-lg text-de-black">{s.name}</h3>
                <p className="text-xs text-de-muted line-clamp-2">{s.shortDescription}</p>

                {/* Packages list preview */}
                <div className="pt-2 border-t border-de-border space-y-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-de-muted">
                    Configured Packages:
                  </p>
                  {s.packages.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-xs font-bold">
                      <span className="text-de-body">{p.name}:</span>
                      <span className="text-de-green font-extrabold">
                        {p.isCustomQuote || p.price === null ? "Custom Quote" : `${p.price.toLocaleString()} PKR`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-de-warm border-t border-de-border flex items-center justify-between">
              <a
                href={`/services/${s.slug}`}
                target="_blank"
                className="text-xs font-bold text-de-muted hover:text-de-black flex items-center gap-1"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setSelectedService(s)}
                className="px-3 py-1.5 rounded-btn bg-white hover:bg-de-black hover:text-white border border-de-black text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Packages</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service & Package Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">
                Edit {selectedService.name} & Pricing
              </h3>
              <button onClick={() => setSelectedService(null)} className="p-1 rounded hover:bg-de-warm">
                Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Service Overview</label>
                <textarea
                  rows={3}
                  value={selectedService.overview}
                  onChange={(e) => setSelectedService({ ...selectedService, overview: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Service Card Image (Upload or Select)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={selectedService.image || ""}
                    onChange={(e) => setSelectedService({ ...selectedService, image: e.target.value })}
                    placeholder="/brand/digital-ads-seo.jpg or choose from PC below"
                    className="flex-1 p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                  />
                  {selectedService.image && (
                    <div className="relative w-14 h-11 rounded border-2 border-de-black overflow-hidden shrink-0 shadow-sm">
                      <Image
                        src={selectedService.image}
                        alt="Preview"
                        fill
                        unoptimized={selectedService.image.startsWith("data:")}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Direct PC Image Upload + Media Library Picker */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    id="admin-service-file-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const optimizedUrl = await compressImage(file, 1200, 0.82);
                        setSelectedService((prev) => (prev ? { ...prev, image: optimizedUrl } : null));
                        saveUploadToMediaLibrary(optimizedUrl, file.name);
                      } catch (err: any) {
                        alert("Image processing error: " + err.message);
                      }
                    }}
                  />
                  <label
                    htmlFor="admin-service-file-upload"
                    className="px-3 py-1.5 rounded-btn bg-de-black text-white hover:bg-de-green text-[11px] font-bold cursor-pointer inline-flex items-center gap-1.5 transition-colors border border-de-black"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image from Computer</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(true)}
                    className="px-3 py-1.5 rounded-btn bg-de-amber text-de-black hover:bg-amber-400 text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors border border-de-black"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Pick from Media Library</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-de-muted font-bold self-center">Presets:</span>
                  {[
                    { label: "Business Website", url: "/brand/digital-website.jpg" },
                    { label: "E-Commerce", url: "/brand/digital-marketing-workspace.png" },
                    { label: "Web App Dev", url: "/brand/digital-ads-seo.jpg" },
                    { label: "Mobile Apps", url: "/brand/digital-academy.jpg" },
                    { label: "Custom Software", url: "/brand/digital-website.jpg" },
                    { label: "Play Store Publishing", url: "/brand/digital-marketing-workspace.png" },
                    { label: "WordPress Dev", url: "/images/services/wordpress.jpg" },
                    { label: "Social Media", url: "/images/services/social-media.jpg" },
                    { label: "Google & TikTok Ads", url: "/images/services/google-tiktok-ads.jpg" },
                    { label: "Commercial Video", url: "/images/services/video-ads.jpg" },
                    { label: "SEO & Traffic", url: "/images/services/seo.jpg" },
                    { label: "YouTube Automation", url: "/images/services/youtube-automation.jpg" },
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.url}
                      onClick={() => setSelectedService({ ...selectedService, image: p.url })}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-de-warm border border-de-border hover:bg-de-black hover:text-white transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-sm text-de-black mb-3">Package Pricing (PKR)</h4>
                <div className="space-y-3">
                  {selectedService.packages.map((pkg) => (
                    <div key={pkg.id} className="p-3 bg-de-warm rounded-xl border border-de-border flex items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-xs text-de-black">{pkg.name}</p>
                        <p className="text-[10px] text-de-muted">{pkg.description}</p>
                      </div>
                      {!pkg.isCustomQuote && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={pkg.price || 0}
                            onChange={(e) => handlePackagePriceChange(pkg.id, parseInt(e.target.value, 10) || 0)}
                            className="w-28 p-2 rounded-btn border border-de-border bg-white text-xs font-bold text-right"
                          />
                          <span className="text-xs font-bold text-de-green">PKR</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-de-border">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 rounded-btn bg-de-warm border border-de-border text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green transition-colors"
                >
                  {saving ? "Saving..." : "Save Service & Rates"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        title="Select Service Card Image"
        onSelect={(url) => setSelectedService((prev) => (prev ? { ...prev, image: url } : null))}
      />
    </div>
  );
}
