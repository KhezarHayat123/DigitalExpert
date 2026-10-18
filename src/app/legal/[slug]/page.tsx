import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageBySlug, getPages } from "@/lib/db";
import { Shield, Clock, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const pages = getPages();
  return pages.map((p) => ({ slug: p.slug }));
}

const LEGAL_PAGES = [
  { name: "Privacy Policy", slug: "privacy" },
  { name: "Terms of Service", slug: "terms" },
  { name: "Refund Policy", slug: "refund" },
  { name: "Payment Policy", slug: "payment" },
  { name: "Cookie Policy", slug: "cookies" },
];

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-de-warm">
      {/* Top Banner */}
      <section className="pt-16 pb-12 bg-white border-b border-de-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-de-muted hover:text-de-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-de-black">
              {page.title}
            </h1>
            <div className="flex items-center gap-1.5 text-xs font-bold text-de-muted bg-de-warm px-3 py-1.5 rounded-md border border-de-border">
              <Clock className="w-3.5 h-3.5 text-de-green" />
              <span>Last updated: {page.lastUpdated}</span>
            </div>
          </div>

          {/* Tab Navigation between legal documents */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-de-border">
            {LEGAL_PAGES.map((item) => {
              const isCurrent = item.slug === params.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/legal/${item.slug}`}
                  className={`px-3.5 py-1.5 rounded-btn text-xs font-heading font-extrabold whitespace-nowrap transition-colors border-2 ${
                    isCurrent
                      ? "bg-de-black text-white border-de-black shadow-hard-sm"
                      : "bg-white text-de-body border-de-border hover:border-de-black"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Document Body */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border-2 border-de-black shadow-hard">
          <article
            className="prose prose-stone max-w-none prose-headings:font-heading prose-headings:font-extrabold prose-h2:text-2xl prose-h3:text-xl prose-p:text-de-body prose-p:leading-relaxed prose-li:font-medium prose-strong:text-de-black"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          <div className="mt-12 pt-6 border-t border-de-border flex items-center justify-between text-xs font-bold text-de-muted">
            <span>Official Policy of DigitalExpert &bull; digitalexpert.pk</span>
            <span>University Chowk, Bahawalpur</span>
          </div>
        </div>
      </section>
    </div>
  );
}
