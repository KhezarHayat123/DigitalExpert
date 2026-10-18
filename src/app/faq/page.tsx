import { getFaqs } from "@/lib/db";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import { HelpCircle, ChevronRight, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions (FAQs) | DigitalExpert",
  description: "Find answers to common questions about DigitalExpert courses, fees, admissions, agency services, and payment methods.",
};

export default function FaqPage() {
  const faqs = getFaqs();
  const groups = ["All", "General", "Courses", "Services", "Payment", "Admission"];

  return (
    <div className="flex flex-col min-h-screen bg-de-warm">
      {/* Hero Header */}
      <section className="pt-16 pb-16 bg-white border-b border-de-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-de-green/10 text-de-green font-heading font-extrabold text-xs uppercase tracking-wider">
            Help Center
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-de-black tracking-tight">
            Frequently Asked <span className="text-de-amber">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-de-muted max-w-xl mx-auto font-medium">
            Everything you need to know about our courses, certifications, services, and admissions.
          </p>
        </div>
      </section>

      {/* Accordions */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group bg-white rounded-2xl border-2 border-de-black p-6 shadow-hard-sm open:shadow-hard transition-all cursor-pointer"
          >
            <summary className="flex items-center justify-between font-heading font-extrabold text-base sm:text-lg text-de-black list-none">
              <span className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-de-green shrink-0" />
                <span>{faq.question}</span>
              </span>
              <ChevronRight className="w-5 h-5 transition-transform duration-200 group-open:rotate-90 text-de-muted shrink-0 ml-2" />
            </summary>
            <div className="mt-4 pt-4 border-t border-de-border text-sm sm:text-base text-de-muted font-medium leading-relaxed pl-8">
              {faq.answer}
            </div>
          </details>
        ))}

        {/* WhatsApp Assistance Card */}
        <div className="mt-12 p-8 bg-white rounded-2xl border-2 border-de-black shadow-hard text-center space-y-4">
          <h3 className="font-heading font-extrabold text-xl text-de-black">Have a Question Not Listed Here?</h3>
          <p className="text-sm text-de-muted max-w-md mx-auto">
            Our team is available on WhatsApp to answer any specific questions regarding batches or custom client proposals.
          </p>
          <div className="pt-2">
            <MagneticButton href="https://wa.me/923124051296" variant="whatsapp" target="_blank">
              <MessageCircle className="w-4 h-4 mr-1" />
              Ask on WhatsApp: 03124051296
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
