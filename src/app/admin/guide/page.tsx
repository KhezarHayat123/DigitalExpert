import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { BookOpen, CheckCircle2, FileCheck2, GraduationCap, Settings, ShieldAlert, Smartphone } from "lucide-react";

export const metadata = {
  title: "Admin Guide & Documentation | DigitalExpert Admin",
};

export default async function AdminGuidePage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Admin Operations Manual</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Quick reference guide for daily agency workflows, payment verification, and course management.
          </p>
        </div>
        <BookOpen className="w-8 h-8 text-de-green shrink-0" />
      </div>

      {/* Guide Cards */}
      <div className="space-y-6">
        {/* Guide 1: How to Confirm an Admission */}
        <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-de-border">
            <div className="w-9 h-9 rounded-xl bg-de-green text-white flex items-center justify-center font-bold">
              01
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-de-black">
                How to Verify a Payment & Confirm Admission
              </h3>
              <p className="text-xs text-de-muted font-semibold">Student enrollment workflow</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-de-body font-medium leading-relaxed">
            <p>
              When a student submits the online admission form at <code>/enroll</code>, their status is set to <strong>New</strong> (pending).
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                Navigate to <strong>Enrollments</strong> in the left sidebar.
              </li>
              <li>
                Click the <strong>View Receipt</strong> button on the student row to open their uploaded payment screenshot in the secure admin viewer modal.
              </li>
              <li>
                Check that the fee amount matches the course fee (e.g., 20,000 PKR for WordPress, 10,000 PKR for SMM) and matches the JazzCash, EasyPaisa, or Bank statement.
              </li>
              <li>
                Click <strong>Confirm</strong>. This automatically updates their status to <strong>Admission confirmed</strong> and dispatches an official welcome email to the student with batch details!
              </li>
              <li>
                Click the green <strong>WhatsApp</strong> button on their row to send them a pre-filled admission confirmation greeting directly on WhatsApp.
              </li>
            </ol>
          </div>
        </div>

        {/* Guide 2: How to Add or Modify a Course */}
        <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-de-border">
            <div className="w-9 h-9 rounded-xl bg-de-amber text-de-black flex items-center justify-center font-bold">
              02
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-de-black">
                How to Add a Course or Update Fees
              </h3>
              <p className="text-xs text-de-muted font-semibold">Course catalog management</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-de-body font-medium leading-relaxed">
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>Open <strong>Courses</strong> in the sidebar.</li>
              <li>Click <strong>Edit</strong> on any course card (e.g. WordPress or SEO).</li>
              <li>Update the fee (in PKR), course duration, schedule timing, or tools list.</li>
              <li>Click <strong>Save Changes</strong>. The public website updates instantly without needing a rebuild or deployment!</li>
            </ol>
          </div>
        </div>

        {/* Guide 3: Private Storage Security Note */}
        <div className="bg-de-warm p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-3">
          <div className="flex items-center gap-2 text-de-black font-heading font-extrabold text-base">
            <ShieldAlert className="w-5 h-5 text-de-amber shrink-0" />
            <span>Private Storage & Student Privacy Guarantee</span>
          </div>
          <p className="text-xs sm:text-sm text-de-muted leading-relaxed font-semibold">
            All student payment receipts uploaded during enrollment are stored in a dedicated private directory (<code>/data/private-uploads/</code>). They are NOT publicly accessible on the web and can only be viewed by an authenticated administrator or manager logged into this panel.
          </p>
        </div>
      </div>
    </div>
  );
}
