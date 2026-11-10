import { getTestimonials } from "@/lib/db";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import FeedbackClientList from "./FeedbackClientList";
import { MessageCircle, Star, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Client Reviews & Student Feedback | DigitalExpert",
  description: "Read genuine feedback and reviews from our global business clients across UAE, UK, and Saudi Arabia, as well as students from our physical campus in Bahawalpur.",
};

export default function FeedbackPage() {
  const testimonials = getTestimonials();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#FFAA1D]/15 via-[#FFAA1D]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#FFAA1D_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-de-amber/20 border border-de-amber text-de-black text-xs font-heading font-extrabold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-de-amber animate-pulse" />
            Verified Client & Student Reviews
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-de-black tracking-tight leading-[1.15] max-w-4xl mx-auto">
            What Our <span className="text-de-green">Clients & Students</span> Say About DigitalExpert
          </h1>

          <p className="mt-5 text-base sm:text-lg text-de-muted max-w-2xl mx-auto leading-relaxed font-semibold">
            Honest feedback from high-growth businesses in Dubai, UAE, UK & Pakistan, and graduated students who transformed their careers at our University Chowk, Bahawalpur campus.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href="https://wa.me/923124051296?text=Hi%20DigitalExpert,%20I%20would%20like%20to%20share%20my%20feedback."
              variant="whatsapp"
              target="_blank"
            >
              <MessageCircle className="w-5 h-5 mr-1" />
              Submit Feedback on WhatsApp
            </MagneticButton>
            <MagneticButton href="/contact" variant="black">
              Start Your Project
            </MagneticButton>
          </div>

          {/* Quick Rating Summary Pill */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex text-de-amber">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-de-amber" />
                ))}
              </div>
              <span className="font-heading font-extrabold text-sm text-de-black">4.9 / 5.0</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-de-border" />
            <div className="flex items-center gap-2 text-xs font-bold text-de-muted">
              <CheckCircle2 className="w-4 h-4 text-de-green" />
              <span>300+ Projects Delivered Across UAE, KSA & Pakistan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. FEEDBACK GRID SECTION */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Real Testimonials"
            title="Authentic Stories from"
            highlight="Businesses & Learners"
            description="Explore verified testimonials from commercial agency clients and students trained in high-demand digital skills."
          />

          <FeedbackClientList initialTestimonials={testimonials} />
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="py-20 bg-de-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Ready to Become Our Next <span className="text-de-amber">Success Story</span>?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Whether you want a high-converting website built for your UAE brand or want to master AI development skills, we are ready to assist.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <MagneticButton href="/contact" variant="amber">
              Consult on Project
            </MagneticButton>
            <MagneticButton href="/courses" variant="black">
              Explore Courses
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
