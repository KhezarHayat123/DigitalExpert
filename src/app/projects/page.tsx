import { getProjects } from "@/lib/db";
import ProjectsHeroVisual from "@/components/heroes/ProjectsHeroVisual";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import ProjectsFilterClient from "./ProjectsFilterClient";

export const metadata = {
  title: "Completed Projects & Portfolio | DigitalExpert",
  description: "Explore our completed client projects across WordPress web engineering, Google Page 1 SEO, paid ads scaling, and commercial video creation.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#6A9A00]/15 via-[#6A9A00]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-de-green/10 border border-de-green text-de-green text-xs font-heading font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-de-green animate-pulse" />
                Proven Track Record & Case Studies
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-de-black tracking-tight leading-[1.15]">
                Our Completed Client <span className="text-de-amber">Projects & Case Studies</span>
              </h1>

              <p className="text-base sm:text-lg text-de-muted max-w-xl leading-relaxed font-semibold">
                Browse our recent work across WordPress websites, SEO search ranking triumphs, high-ROI paid media campaigns, and commercial video productions for international brands.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton href="#portfolio" variant="black">
                  Filter by Category
                </MagneticButton>
                <MagneticButton href="/contact" variant="amber">
                  Start Your Project
                </MagneticButton>
              </div>
            </div>

            {/* Right: Floating Windows Visual */}
            <div className="lg:col-span-5">
              <ProjectsHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. PORTFOLIO GRID & CATEGORY FILTER */}
      <section id="portfolio" className="py-20 lg:py-28 bg-de-warm border-b border-de-border scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Case Studies"
            title="Real Implementations &"
            highlight="Measurable Impact"
            description="Hover over any card to reveal key performance metrics delivered for our clients."
          />

          <ProjectsFilterClient initialProjects={projects} />
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-de-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Want Similar Results for <span className="text-de-amber">Your Brand</span>?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Share your goals with us. We will provide a customized strategy and project timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <MagneticButton href="/contact" variant="amber">
              Request Free Consultation
            </MagneticButton>
            <MagneticButton href="https://wa.me/923124051296" variant="whatsapp" target="_blank">
              WhatsApp: 03124051296
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
