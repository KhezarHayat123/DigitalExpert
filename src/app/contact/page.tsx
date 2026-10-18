import { Suspense } from "react";
import { getSettings } from "@/lib/db";
import ContactHeroVisual from "@/components/heroes/ContactHeroVisual";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import ContactFormClient from "./ContactFormClient";
import CopyChannelButton from "@/components/CopyChannelButton";
import { MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Contact DigitalExpert | University Chowk, Bahawalpur & WhatsApp Support",
  description: "Get in touch with DigitalExpert at University Chowk, Bahawalpur. Call or WhatsApp 03124051296, email info@digitalexpert.pk, or submit our online contact form.",
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#25D366]/15 via-[#25D366]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366] text-de-black text-xs font-heading font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Fast 24/7 WhatsApp Response
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-de-black tracking-tight leading-[1.15]">
                Let&apos;s Discuss Your Project or <span className="text-de-amber">Course Batch</span>
              </h1>

              <p className="text-base sm:text-lg text-de-muted max-w-xl leading-relaxed font-semibold">
                Have a question about our services or upcoming practical training admissions? Reach out directly via WhatsApp, email, or stop by our physical campus at University Chowk, Bahawalpur.
              </p>

              {/* Direct Quick Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-btn font-heading font-extrabold text-sm bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm hover:shadow-hard inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>WhatsApp: {settings.phone}</span>
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="px-6 py-3.5 rounded-btn font-heading font-extrabold text-sm bg-white text-de-black hover:bg-de-warm transition-all border-2 border-de-black shadow-hard-sm hover:shadow-hard inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-de-green" />
                  <span>{settings.email}</span>
                </a>
              </div>
            </div>

            {/* Right: Looping Animated WhatsApp Chat */}
            <div className="lg:col-span-5">
              <ContactHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. DIRECT CHANNELS & CONTACT FORM */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Direct Inquiries"
            title="Get in Touch with Our"
            highlight="Senior Team"
            description="Choose your preferred channel below or send an inquiry directly into our admin dashboard."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (5 cols): Direct Channel Cards with Copy Buttons */}
            <div className="lg:col-span-5 space-y-4">
              {/* WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm flex items-center justify-between hover:shadow-hard transition-shadow">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center border-2 border-de-black shrink-0">
                    <Phone className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-de-muted">WhatsApp / Phone</p>
                    <p className="font-heading font-extrabold text-base text-de-black">{settings.phone}</p>
                  </div>
                </div>
                <CopyChannelButton text={settings.phone} label="Phone" />
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm flex items-center justify-between hover:shadow-hard transition-shadow">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-de-green text-white flex items-center justify-center border-2 border-de-black shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-de-muted">Email Desk</p>
                    <p className="font-heading font-extrabold text-base text-de-black">{settings.email}</p>
                  </div>
                </div>
                <CopyChannelButton text={settings.email} label="Email" />
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm flex items-center justify-between hover:shadow-hard transition-shadow">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-de-amber text-de-black flex items-center justify-center border-2 border-de-black shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-de-muted">Campus & Head Office</p>
                    <p className="font-heading font-extrabold text-sm text-de-black">{settings.location}</p>
                  </div>
                </div>
                <CopyChannelButton text={settings.location} label="Location" />
              </div>

              {/* Website Card */}
              <div className="p-5 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm flex items-center justify-between hover:shadow-hard transition-shadow">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-de-black text-white flex items-center justify-center border-2 border-de-black shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-de-muted">Official Website</p>
                    <p className="font-heading font-extrabold text-base text-de-black">{settings.website}</p>
                  </div>
                </div>
                <CopyChannelButton text={`https://${settings.website}`} label="Website" />
              </div>

              {/* Note about Response Time */}
              <div className="p-4 rounded-xl bg-de-black text-white text-xs font-semibold space-y-1">
                <p className="font-bold text-de-amber uppercase">⚡ Rapid Response Guarantee</p>
                <p className="text-white/80">
                  WhatsApp queries are answered in minutes during business hours (9:00 AM – 9:00 PM PKT).
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): Contact Form */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="p-8 rounded-2xl bg-white border-2 border-de-black shadow-hard animate-pulse text-center">
                    <p className="font-heading font-bold text-de-muted">Loading inquiry form...</p>
                  </div>
                }
              >
                <ContactFormClient />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL GOOGLE MAP EMBED (University Chowk, Bahawalpur) */}
      <section className="py-20 bg-white border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-heading font-extrabold text-xs uppercase tracking-widest text-de-green">
                Campus Location
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-1">
                Visit Us at <span className="text-de-green">University Chowk, Bahawalpur</span>
              </h2>
              <p className="text-sm text-de-muted mt-1">
                Conveniently situated in the educational hub of Bahawalpur with physical lab facilities.
              </p>
            </div>

            <a
              href={settings.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-btn font-heading font-extrabold text-xs bg-de-black text-white hover:bg-de-green transition-all border-2 border-de-black shadow-hard-sm hover:shadow-hard inline-flex items-center gap-2 self-start"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Iframe Frame */}
          <div className="w-full h-[420px] rounded-2xl border-3 border-de-black overflow-hidden shadow-hard bg-de-warm">
            <iframe
              src={settings.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DigitalExpert Campus Location at University Chowk, Bahawalpur"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
