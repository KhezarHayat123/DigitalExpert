import Image from "next/image";
import { getServices } from "@/lib/db";
import ServicesHeroVisual from "@/components/heroes/ServicesHeroVisual";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import Card3DTilt from "@/components/Card3DTilt";
import { Laptop, Search, Share2, Target, Video, Youtube, CheckCircle2, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Digital Marketing Services in Bahawalpur | DigitalExpert",
  description: "Explore our professional services: WordPress development, SEO, social media marketing, Google & TikTok ads, video ads creation, and YouTube automation.",
};

const SERVICE_ICONS: Record<string, any> = {
  wordpress: Laptop,
  seo: Search,
  "social-media": Share2,
  "google-tiktok-ads": Target,
  "video-ads": Video,
  "youtube-automation": Youtube,
};

export default function ServicesPage() {
  const services = getServices(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#FFAA1D]/15 via-[#FFAA1D]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#FFAA1D_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-de-amber/20 border border-de-amber text-de-black text-xs font-heading font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-de-amber animate-pulse" />
                Performance-Driven Agency
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-de-black tracking-tight leading-[1.15]">
                Digital Marketing Services That Drive <span className="text-de-green">Measurable Revenue.</span>
              </h1>

              <p className="text-base sm:text-lg text-de-muted max-w-xl leading-relaxed font-semibold">
                We engineer full-funnel digital marketing solutions for high-growth brands. From custom WordPress websites and Google Page 1 SEO to hyper-targeted paid media and commercial video ads.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton href="#services-grid" variant="black">
                  View All Services
                </MagneticButton>
                <MagneticButton
                  href="https://wa.me/923124051296"
                  variant="whatsapp"
                  target="_blank"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat on WhatsApp
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: Orbiting Icons Visual */}
            <div className="lg:col-span-5">
              <ServicesHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. SERVICES GRID (Cards do NOT show prices) */}
      <section id="services-grid" className="py-20 lg:py-28 bg-white border-b border-de-border scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Core Expertise"
            title="Six Specialized Services Built for"
            highlight="High Conversion"
            description="Explore our specialized digital capabilities. Select any service to view transparent packages, deliverable scopes, and process timelines."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComp = SERVICE_ICONS[service.slug] || Laptop;
              return (
                <Card3DTilt key={service.id} className="flex flex-col h-full bg-white">
                  {/* Generated 16:10 illustration */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-de-warm border-b-2 border-de-black">
                    <Image
                      src={service.image}
                      alt={`${service.name} illustration`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Floating Round Icon Badge */}
                    <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-white border-2 border-de-black shadow-hard-sm flex items-center justify-center text-de-green group-hover:rotate-12 transition-transform duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Content (NO PRICES SHOWN ON CARD) */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-de-black group-hover:text-de-green transition-colors">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-de-muted leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-de-border">
                      <MagneticButton
                        href={`/services/${service.slug}`}
                        variant="black"
                        className="w-full text-center"
                      >
                        View Details
                      </MagneticButton>
                    </div>
                  </div>
                </Card3DTilt>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK FOR CLIENTS */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Agency Blueprint"
            title="Our 4-Phase Delivery"
            highlight="Process"
            description="How we ensure zero miscommunication, rapid deployment, and consistent weekly ROI updates."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Strategy & Audit",
                desc: "We perform comprehensive competitor and website audits to pinpoint exact conversion bottlenecks.",
              },
              {
                step: "02",
                title: "Campaign Blueprint",
                desc: "We formulate visual moodboards, persuasive copywriting, keyword clusters, and ad set structures.",
              },
              {
                step: "03",
                title: "Build & Execution",
                desc: "Our specialists execute the code, configure tracking pixels, launch ad sets, and initiate outreach.",
              },
              {
                step: "04",
                title: "Optimization & Scale",
                desc: "Continuous A/B split testing, conversion rate optimization, and transparent monthly performance reporting.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading font-extrabold text-3xl text-de-amber">{p.step}</span>
                  <h3 className="font-heading font-extrabold text-lg text-de-black mt-3">{p.title}</h3>
                  <p className="mt-2 text-sm text-de-muted leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-de-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Have a Project in Mind? <span className="text-de-amber">Let&apos;s Build It Right.</span>
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Discuss your website or marketing requirements directly with founder Khezar Hayat.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <MagneticButton href="/contact" variant="amber">
              Request Free Proposal
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
