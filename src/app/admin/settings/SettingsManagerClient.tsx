"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteSettings } from "@/lib/types";
import { Settings, Save, Check, CreditCard, MapPin, Share2, Bell, Shield, ImageIcon } from "lucide-react";

export default function SettingsManagerClient({ initialSettings }: { initialSettings: SiteSettings }) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          collection: "settings",
          item: settings,
        }),
      });

      if (!res.ok) throw new Error("Failed to update settings");

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Global Website & Payment Settings</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Configure contact details, live Google Map coordinates, official deposit accounts, and announcement bar.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
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
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      {/* 1. General Brand & Contact Settings */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
        <h3 className="font-heading font-extrabold text-base text-de-black border-b border-de-border pb-3 flex items-center gap-2">
          <Settings className="w-4 h-4 text-de-green" />
          General Contact Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">Phone / WhatsApp</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value, whatsapp: e.target.value })}
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">Physical Address</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">Domain</label>
            <input
              type="text"
              value={settings.website}
              onChange={(e) => setSettings({ ...settings, website: e.target.value })}
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
        </div>
      </div>

      {/* 2. Google Map URLs */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
        <h3 className="font-heading font-extrabold text-base text-de-black border-b border-de-border pb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-de-amber" />
          Google Map Embed & Pin Links
        </h3>

        <div>
          <label className="block text-xs font-bold uppercase text-de-muted mb-1">Map Embed URL (iframe src)</label>
          <input
            type="text"
            value={settings.mapEmbedUrl}
            onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
            className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-de-muted mb-1">Google Maps Direct Link</label>
          <input
            type="text"
            value={settings.mapLink}
            onChange={(e) => setSettings({ ...settings, mapLink: e.target.value })}
            className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
          />
        </div>
      </div>

      {/* 3. Official Payment Accounts */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-5">
        <h3 className="font-heading font-extrabold text-base text-de-black border-b border-de-border pb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-de-green" />
          Official Payment Accounts (Enrollment Page)
        </h3>

        {/* JazzCash */}
        <div className="p-4 bg-de-warm rounded-xl border border-de-border space-y-3">
          <p className="font-heading font-extrabold text-xs uppercase text-de-black">JazzCash Account</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">Mobile Account Number</label>
              <input
                type="text"
                value={settings.paymentAccounts.jazzcash.number}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      jazzcash: { ...settings.paymentAccounts.jazzcash, number: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">Account Title</label>
              <input
                type="text"
                value={settings.paymentAccounts.jazzcash.accountTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      jazzcash: { ...settings.paymentAccounts.jazzcash, accountTitle: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
          </div>
        </div>

        {/* EasyPaisa */}
        <div className="p-4 bg-de-warm rounded-xl border border-de-border space-y-3">
          <p className="font-heading font-extrabold text-xs uppercase text-de-black">EasyPaisa Account</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">Mobile Account Number</label>
              <input
                type="text"
                value={settings.paymentAccounts.easypaisa.number}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      easypaisa: { ...settings.paymentAccounts.easypaisa, number: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">Account Title</label>
              <input
                type="text"
                value={settings.paymentAccounts.easypaisa.accountTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      easypaisa: { ...settings.paymentAccounts.easypaisa, accountTitle: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
          </div>
        </div>

        {/* Bank */}
        <div className="p-4 bg-de-warm rounded-xl border border-de-border space-y-3">
          <p className="font-heading font-extrabold text-xs uppercase text-de-black">Bank Transfer Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">Bank Name</label>
              <input
                type="text"
                value={settings.paymentAccounts.bank.bankName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      bank: { ...settings.paymentAccounts.bank, bankName: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">Account Title</label>
              <input
                type="text"
                value={settings.paymentAccounts.bank.accountTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      bank: { ...settings.paymentAccounts.bank, accountTitle: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">Account Number</label>
              <input
                type="text"
                value={settings.paymentAccounts.bank.accountNumber}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      bank: { ...settings.paymentAccounts.bank, accountNumber: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-de-muted mb-1">IBAN Number</label>
              <input
                type="text"
                value={settings.paymentAccounts.bank.iban}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentAccounts: {
                      ...settings.paymentAccounts,
                      bank: { ...settings.paymentAccounts.bank, iban: e.target.value },
                    },
                  })
                }
                className="w-full p-2 rounded-btn border border-de-border text-xs font-bold bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Social Links */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
        <h3 className="font-heading font-extrabold text-base text-de-black border-b border-de-border pb-3 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-de-black" />
          Social Media Links
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">Facebook</label>
            <input
              type="text"
              value={settings.socialLinks.facebook}
              onChange={(e) =>
                setSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: e.target.value } })
              }
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">Instagram</label>
            <input
              type="text"
              value={settings.socialLinks.instagram}
              onChange={(e) =>
                setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: e.target.value } })
              }
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">LinkedIn</label>
            <input
              type="text"
              value={settings.socialLinks.linkedin}
              onChange={(e) =>
                setSettings({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: e.target.value } })
              }
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-de-muted mb-1">YouTube</label>
            <input
              type="text"
              value={settings.socialLinks.youtube}
              onChange={(e) =>
                setSettings({ ...settings, socialLinks: { ...settings.socialLinks, youtube: e.target.value } })
              }
              className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
            />
          </div>
        </div>
      </div>

      {/* 5. Official Brand & Hero Imagery */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
        <h3 className="font-heading font-extrabold text-base text-de-black border-b border-de-border pb-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-de-green" />
          Official Brand & Hero Imagery Presets
        </h3>
        <p className="text-xs text-de-muted font-semibold">
          Click any preset below to copy its path or quickly apply it to projects, courses, or services:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {[
            {
              title: "Agency Workspace & Ops",
              url: "/brand/digital-marketing-workspace.png",
              desc: "High-res marketing agency multi-monitor setup",
            },
            {
              title: "Digital Ads & SEO Flow",
              url: "/brand/digital-ads-seo.jpg",
              desc: "Paid media graphs & Google ranking dashboard",
            },
            {
              title: "Social Media Growth",
              url: "/brand/digital-social-media.jpg",
              desc: "Multi-platform engagement & viral analytics",
            },
            {
              title: "WordPress Web Showcase",
              url: "/brand/digital-website.jpg",
              desc: "Modern responsive web development project",
            },
            {
              title: "Practical Skills Academy",
              url: "/brand/digital-academy.jpg",
              desc: "Hands-on workstation lab & student training",
            },
          ].map((item) => (
            <div
              key={item.url}
              className="p-3 rounded-xl border border-de-border bg-de-warm/50 flex flex-col justify-between space-y-2 hover:border-de-black transition-colors"
            >
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-de-black/20 bg-white">
                <Image src={item.url} alt={item.title} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-heading font-extrabold text-de-black">{item.title}</p>
                <p className="text-[10px] text-de-muted font-semibold mt-0.5">{item.desc}</p>
                <code className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-de-border text-de-black block mt-1.5 select-all font-mono truncate">
                  {item.url}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 rounded-btn bg-de-black text-white hover:bg-de-green text-sm font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm"
        >
          {saving ? "Saving All Settings..." : "Save Global Settings"}
        </button>
      </div>
    </form>
  );
}
