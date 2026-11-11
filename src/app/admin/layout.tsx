import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getEnrollments, getMessages, getStudents, getStorageMode, syncDatabaseFromCloud } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Dashboard | DigitalExpert",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return <>{children}</>;
  }

  await syncDatabaseFromCloud();
  const storageMode = getStorageMode();

  const enrollments = getEnrollments();
  const messages = getMessages();
  const students = getStudents();

  const newEnrollmentsCount = enrollments.filter((e) => e.status === "New").length;
  const unreadMessagesCount = messages.filter((m) => !m.read).length;
  const pendingStudentsCount = students.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#F0F0F1] flex flex-col md:flex-row">
      {/* WordPress-style Dark Sidebar */}
      <AdminSidebar
        newEnrollmentsCount={newEnrollmentsCount}
        unreadMessagesCount={unreadMessagesCount}
        pendingStudentsCount={pendingStudentsCount}
        userRole={admin.role}
      />

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={admin} storageMode={storageMode} />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {storageMode === "temporary" && (
            <div className="bg-amber-50 border-2 border-amber-500 rounded-xl p-4 text-xs text-amber-950 font-semibold shadow-sm">
              <p className="font-heading font-extrabold text-sm text-amber-900">
                Live Hosting Storage Notice (Important!):
              </p>
              <p className="mt-1 leading-relaxed">
                Your live website runs on Vercel read-only hosting without a cloud database connected yet. Changes saved here stay temporary and do <strong>not</strong> update public pages (<code>/services</code>, <code>/courses</code>, <code>/feedback</code>) permanently. To make live Admin edits show immediately on your website, connect free <strong>Upstash Redis</strong> in Vercel Dashboard (Storage &rarr; Create Database &rarr; Upstash Redis) OR add <code>GITHUB_TOKEN</code> in Vercel Settings &rarr; Environment Variables (or edit locally on PC &amp; Push via GitHub Desktop).
              </p>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
