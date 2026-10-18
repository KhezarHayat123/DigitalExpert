import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, getServices } from "@/lib/db";
import DetailHeroVisual from "@/components/heroes/DetailHeroVisual";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import {
  Laptop,
  Search,
  Share2,
  Target,
  Video,
  Youtube,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  const services = getServices(true);
  return services.map((s) => ({ slug: s.slug }));
}

const SERVICE_ICONS: Record<string, any> = {
  wordpress: Laptop,
  seo: Search,
  "social-media": Share2,
  "google-tiktok-ads": Target,
  "video-ads": Video,
  "youtube-automation": Youtube,
};

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const IconComp = SERVICE_ICONS[service.slug] || Laptop;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FFAA1D]/15 via-[#FFAA1D]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#FFAA1D_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-bold text-de-muted mb-6">
            <Link href="/" className="hover:text-de-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-de-black transition-colors">Services</Link>
            <span>/</span>
            <span className="text-de-green">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-de-amber/20 border border-de-amber text-de-black text-xs font-heading font-extrabold uppercase tracking-wider">
                <IconComp className="w-4 h-4 text-de-black" />
                Agency Service
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-de-black tracking-tight leading-[1.15]">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-de-muted leading-relaxed font-semibold">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton
                  href={`https://wa.me/923124051296?text=${encodeURIComponent(`Hi DigitalExpert, I would like to inquire about your ${service.name} service.`)}`}
                  variant="whatsapp"
                  target="_blank"
                >
                  <MessageCircle className="w-5 h-5 mr-1" />
                  Contact on WhatsApp
                </MagneticButton>
                <MagneticButton href="#pricing-packages" variant="black">
                  See Packages & Pricing
                </MagneticButton>
              </div>
            </div>

            {/* Right: Orbiting Tools Visual */}
            <div className="lg:col-span-5">
              <DetailHeroVisual iconType={service.slug} tools={service.tools} themeColor="amber" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT + STICKY SIDEBAR */}
      <section className="py-16 lg:py-24 bg-white border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column (8 cols): Overview, Deliverables, Process Steps, FAQs */}
            <div className="lg:col-span-8 space-y-16">
              {/* Overview */}
              <div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mb-4">
                  Service Overview
                </h2>
                <p className="text-base sm:text-lg text-de-muted leading-relaxed whitespace-pre-line font-medium">
                  {service.overview}
                </p>
              </div>

              {/* What We Deliver */}
              <div className="bg-de-warm p-8 rounded-2xl border-2 border-de-black shadow-hard-sm">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-de-black mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-de-green" />
                  What We Deliver
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-de-green shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-bold text-de-body">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated Process Steps */}
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-de-black mb-6">
                  Our Step-by-Step Delivery Process
                </h3>
                <div className="space-y-4">
                  {service.processSteps.map((s) => (
                    <div
                      key={s.step}
                      className="p-5 rounded-xl border-2 border-de-black bg-white shadow-hard-sm flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-de-black text-white font-heading font-extrabold flex items-center justify-center shrink-0">
                        0{s.step}
                      </div>
                      <div>
                        <h4 className="font-heading font-extrabold text-base text-de-black">{s.title}</h4>
                        <p className="mt-1 text-sm text-de-muted leading-relaxed font-semibold">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools We Use */}
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-de-black mb-4">
                  Industry Tools We Work With
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {service.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-de-warm rounded-lg border-2 border-de-black font-heading font-extrabold text-sm text-de-black shadow-hard-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing Packages Section */}
              <div id="pricing-packages" className="scroll-mt-12 pt-6">
                <div className="mb-8">
                  <span className="font-heading font-extrabold text-xs uppercase tracking-widest text-de-green">
                    Transparent Pricing
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-1">
                    Available Packages & Rates
                  </h3>
                  <p className="text-sm text-de-muted mt-2">
                    Exact prices in Pakistani Rupees (PKR). No hidden fees or surprise charges.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative rounded-2xl p-6 border-2 flex flex-col justify-between transition-all ${
                        pkg.isPopular
                          ? "bg-de-warm border-de-black shadow-hard scale-[1.02] ring-2 ring-de-green"
                          : "bg-white border-de-black shadow-hard-sm hover:shadow-hard"
                      }`}
                    >
                      {pkg.isPopular && (
                        <span className="absolute -top-3 right-4 bg-de-green text-white font-heading font-extrabold text-[10px] uppercase px-3 py-0.5 rounded-full border border-de-black">
                          Most Chosen
                        </span>
                      )}

                      <div>
                        <h4 className="font-heading font-extrabold text-lg text-de-black">{pkg.name}</h4>
                        <p className="text-xs text-de-muted mt-1 leading-relaxed font-semibold">{pkg.description}</p>

                        <div className="my-5 pb-4 border-b border-de-border">
                          {pkg.isCustomQuote || pkg.price === null ? (
                            <div>
                              <span className="font-heading font-extrabold text-2xl text-de-black">Custom Quote</span>
                              <p className="text-xs text-de-muted mt-1">Based on publishing frequency</p>
                            </div>
                          ) : (
                            <div>
                              <span className="font-heading font-extrabold text-3xl text-de-black">
                                {pkg.price.toLocaleString()}
                              </span>
                              <span className="text-xs font-extrabold text-de-green ml-1">PKR</span>
                              {pkg.priceSuffix && (
                                <p className="text-xs font-bold text-de-muted mt-0.5 capitalize">{pkg.priceSuffix}</p>
                              )}
                            </div>
                          )}
                        </div>

                        <ul className="space-y-2.5 mb-6 text-xs sm:text-sm font-semibold text-de-body">
                          {pkg.features.map((feat, fi) => (
                            <li key={fi} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-de-green shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={`https://wa.me/923124051296?text=${encodeURIComponent(`Hi DigitalExpert, I want to order the "${pkg.name}" for ${service.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3 px-4 rounded-btn font-heading font-extrabold text-xs text-center border-2 border-de-black flex items-center justify-center gap-1.5 transition-all duration-200 ${
                          pkg.isPopular
                            ? "bg-de-green text-white hover:bg-de-black shadow-hard-sm hover:shadow-hard"
                            : "bg-de-black text-white hover:bg-de-green shadow-hard-sm hover:shadow-hard"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Book via WhatsApp</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-de-black mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {service.faqs.map((faq, i) => (
                      <div key={i} className="bg-de-warm p-5 rounded-xl border-2 border-de-black shadow-hard-sm">
                        <h4 className="font-heading font-extrabold text-base text-de-black flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-de-amber shrink-0" />
                          {faq.question}
                        </h4>
                        <p className="mt-2 text-sm text-de-muted font-semibold leading-relaxed pl-7">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (4 cols): STICKY SIDEBAR */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-2xl border-2 border-de-black p-6 shadow-hard space-y-6">
                {/* Service Image Preview */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border-2 border-de-black">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* PRIMARY WHATSAPP CONSULTATION BUTTON */}
                <div className="space-y-3 pt-2">
                  <a
                    href={`https://wa.me/923124051296?text=${encodeURIComponent(`Hi DigitalExpert, I need consultation for ${service.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-btn font-heading font-extrabold text-base bg-[#25D366] text-white hover:bg-de-black hover:text-[#25D366] transition-all duration-200 border-2 border-de-black shadow-hard hover:shadow-hard-lg flex items-center justify-center gap-3 text-center"
                  >
                    <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>

                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="w-full py-3 px-4 rounded-btn font-heading font-extrabold text-xs bg-de-warm text-de-body hover:bg-white hover:text-de-black transition-all border border-de-border flex items-center justify-center gap-2"
                  >
                    <span>Or Submit Web Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Service Details Card */}
                <div className="pt-4 border-t border-de-border space-y-3 text-xs font-bold text-de-muted">
                  <div className="flex items-center justify-between">
                    <span>Turnaround Time:</span>
                    <span className="text-de-black font-extrabold">Fast Execution</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Revisions:</span>
                    <span className="text-de-black font-extrabold">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Support:</span>
                    <span className="text-de-green font-extrabold">Direct on WhatsApp</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span className="text-de-black font-extrabold">University Chowk, Bahawalpur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FINAL CTA */}
      <section className="py-20 bg-de-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Ready to Scale Your Brand with <span className="text-de-amber">{service.name}</span>?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Book your free project discovery consultation with our senior strategy team today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <MagneticButton href={`/contact?service=${service.slug}`} variant="amber">
              Request Free Quote
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
