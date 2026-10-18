import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  FileCheck2,
  MessageSquare,
  GraduationCap,
  Briefcase,
  FolderGit2,
  AlertCircle,
  Plus,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Video,
  FileText,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const db = getDatabase();

  const newEnrollments = db.enrollments.filter((e) => e.status === "New");
  const unreadMessages = db.messages.filter((m) => !m.read);
  const recentEnrollments = db.enrollments.slice(0, 5);
  const recentMessages = db.messages.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-heading font-extrabold text-de-green uppercase tracking-wider">
            Overview Dashboard
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-0.5">
            Welcome back, {admin.name}
          </h1>
          <p className="text-xs sm:text-sm text-de-muted font-semibold mt-1">
            DigitalExpert Admin &bull; Role: <strong className="uppercase text-de-black">{admin.role}</strong> &bull; University Chowk, Bahawalpur
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/enrollments"
            className="px-4 py-2.5 rounded-btn font-heading font-extrabold text-xs bg-de-black text-white hover:bg-de-green transition-all border-2 border-de-black shadow-hard-sm inline-flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>View Enrollments</span>
          </Link>
          {admin.role !== "manager" && (
            <>
              <Link
                href="/admin/courses"
                className="px-4 py-2.5 rounded-btn font-heading font-extrabold text-xs bg-de-warm text-de-black hover:bg-white transition-all border-2 border-de-black inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-de-green" />
                <span>Add Course</span>
              </Link>
              <Link
                href="/admin/projects"
                className="px-4 py-2.5 rounded-btn font-heading font-extrabold text-xs bg-de-warm text-de-black hover:bg-white transition-all border-2 border-de-black inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-de-amber" />
                <span>Add Project</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Stat Counters Grid (6 cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. New Enrollments */}
        <Link
          href="/admin/enrollments?status=New"
          className="bg-white p-4 rounded-xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-de-muted">
            <span>New Enrolls</span>
            <span className="w-2 h-2 rounded-full bg-de-green animate-pulse" />
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-2 group-hover:text-de-green transition-colors">
            {newEnrollments.length}
          </p>
          <p className="text-[10px] font-bold text-de-muted mt-1">Pending verification</p>
        </Link>

        {/* 2. Total Enrollments */}
        <Link
          href="/admin/enrollments"
          className="bg-white p-4 rounded-xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-de-muted">
            <span>Total Enrolls</span>
            <FileCheck2 className="w-4 h-4 text-de-green" />
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-2">
            {db.enrollments.length}
          </p>
          <p className="text-[10px] font-bold text-de-muted mt-1">All time applications</p>
        </Link>

        {/* 3. Unread Messages */}
        <Link
          href="/admin/messages"
          className="bg-white p-4 rounded-xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-de-muted">
            <span>Messages</span>
            <MessageSquare className="w-4 h-4 text-de-amber" />
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-2 group-hover:text-de-amber transition-colors">
            {unreadMessages.length}
          </p>
          <p className="text-[10px] font-bold text-de-muted mt-1">{unreadMessages.length} unread enquiries</p>
        </Link>

        {/* 4. Active Courses */}
        <Link
          href="/admin/courses"
          className="bg-white p-4 rounded-xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-de-muted">
            <span>Courses</span>
            <GraduationCap className="w-4 h-4 text-de-green" />
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-2">
            {db.courses.length}
          </p>
          <p className="text-[10px] font-bold text-de-muted mt-1">Active in institute</p>
        </Link>

        {/* 5. Services */}
        <Link
          href="/admin/services"
          className="bg-white p-4 rounded-xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-de-muted">
            <span>Services</span>
            <Briefcase className="w-4 h-4 text-de-black" />
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-2">
            {db.services.length}
          </p>
          <p className="text-[10px] font-bold text-de-muted mt-1">Agency offerings</p>
        </Link>

        {/* 6. Projects */}
        <Link
          href="/admin/projects"
          className="bg-white p-4 rounded-xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-de-muted">
            <span>Projects</span>
            <FolderGit2 className="w-4 h-4 text-de-amber" />
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-2">
            {db.projects.length}
          </p>
          <p className="text-[10px] font-bold text-de-muted mt-1">Portfolio items</p>
        </Link>
      </div>

      {/* LMS Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/lms/students?status=pending"
          className="bg-amber-50 p-4 rounded-xl border-2 border-amber-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase text-amber-900 tracking-wider">LMS Approvals</span>
            <p className="font-heading font-extrabold text-2xl text-amber-950 mt-1">
              {(db.students || []).filter((s) => s.status === "pending").length} Pending
            </p>
            <p className="text-[11px] text-amber-800 font-semibold mt-0.5">
              {(db.students || []).filter((s) => s.status === "approved").length} Approved Students
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
        </Link>

        <Link
          href="/admin/lms/lectures"
          className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-900 tracking-wider">Class Recordings</span>
            <p className="font-heading font-extrabold text-2xl text-emerald-950 mt-1">
              {(db.lectures || []).length} Video Lectures
            </p>
            <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">Across all 6 course batches</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
            <Video className="w-5 h-5" />
          </div>
        </Link>

        <Link
          href="/admin/lms/assignments"
          className="bg-blue-50 p-4 rounded-xl border-2 border-blue-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase text-blue-900 tracking-wider">Student Projects</span>
            <p className="font-heading font-extrabold text-2xl text-blue-950 mt-1">
              {(db.studentAssignments || []).length} Submissions
            </p>
            <p className="text-[11px] text-blue-800 font-semibold mt-0.5">Practical homework & tasks</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
            <FileText className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Main Two-Column Split: Latest Enrollments & Latest Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Latest 5 Enrollments */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-de-border">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-de-green" />
              <h3 className="font-heading font-extrabold text-lg text-de-black">Latest 5 Enrollments</h3>
            </div>
            <Link
              href="/admin/enrollments"
              className="text-xs font-bold text-de-green hover:underline flex items-center gap-1"
            >
              <span>View All ({db.enrollments.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnrollments.length === 0 ? (
            <div className="text-center py-10 bg-de-warm rounded-xl border border-dashed border-de-border">
              <p className="text-xs font-bold text-de-muted">No student enrollments submitted yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-de-border">
              {recentEnrollments.map((enr) => (
                <div key={enr.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-heading font-extrabold text-sm text-de-black">{enr.studentName}</p>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          enr.status === "New"
                            ? "bg-de-amber/30 text-de-black border border-de-black/20"
                            : enr.status === "Admission confirmed"
                            ? "bg-de-green text-white"
                            : enr.status === "Payment verified"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {enr.status}
                      </span>
                    </div>
                    <p className="text-xs text-de-muted mt-0.5 font-bold">
                      {enr.courseTitle} &bull; {enr.feeAtTime.toLocaleString()} PKR ({enr.paymentMethod})
                    </p>
                    <p className="text-[10px] text-de-muted font-semibold mt-0.5">
                      WhatsApp: {enr.whatsapp} &bull; {new Date(enr.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Link
                    href={`/admin/enrollments?id=${enr.id}`}
                    className="px-3 py-1.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-bold transition-colors shrink-0"
                  >
                    Verify &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Latest 5 Messages */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-de-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-de-amber" />
              <h3 className="font-heading font-extrabold text-lg text-de-black">Latest Enquiries</h3>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-bold text-de-amber hover:underline flex items-center gap-1"
            >
              <span>View All ({db.messages.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="text-center py-10 bg-de-warm rounded-xl border border-dashed border-de-border">
              <p className="text-xs font-bold text-de-muted">No website enquiries received yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-de-border">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="py-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-heading font-extrabold text-sm text-de-black flex items-center gap-1.5">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-de-amber" />}
                      {msg.name}
                    </p>
                    <span className="text-[10px] font-bold text-de-muted">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-de-green">{msg.interestedIn}</p>
                  <p className="text-xs text-de-muted line-clamp-2 font-medium">{msg.message}</p>

                  {/* Quick Action Buttons */}
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${msg.name}, thank you for contacting DigitalExpert regarding ${msg.interestedIn}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[#25D366] text-white text-[11px] font-bold hover:bg-black transition-colors inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                    {msg.email && (
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Enquiry about ${msg.interestedIn} - DigitalExpert`)}`}
                        className="px-2.5 py-1 rounded bg-de-warm border border-de-border text-de-black text-[11px] font-bold hover:bg-white transition-colors inline-flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3 text-de-green" />
                        <span>Email</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
