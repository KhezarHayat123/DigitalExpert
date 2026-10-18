import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getEnrollments, getMessages, getStudents } from "@/lib/db";
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

  // If not authenticated, we let the page handle redirect or pass through to login page
  // The login page itself checks if already logged in and redirects to /admin.
  const enrollments = getEnrollments();
  const messages = getMessages();
  const students = getStudents();

  const newEnrollmentsCount = enrollments.filter((e) => e.status === "New").length;
  const unreadMessagesCount = messages.filter((m) => !m.read).length;
  const pendingStudentsCount = students.filter((s) => s.status === "pending").length;

  if (!admin) {
    return <>{children}</>;
  }

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
        <AdminHeader user={admin} />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
