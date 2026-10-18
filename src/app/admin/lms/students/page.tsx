import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getStudents, getCourses } from "@/lib/db";
import StudentsManagerClient from "./StudentsManagerClient";

export const metadata = {
  title: "LMS Students & Approvals | Admin Dashboard",
};

export default async function AdminLMSStudentsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const students = getStudents();
  const courses = getCourses(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCDCDE]">
        <div>
          <h1 className="text-2xl font-bold text-[#1D2327]">LMS Students & Admission Approvals</h1>
          <p className="text-xs text-[#646970] mt-1">
            Review student registrations, approve access to specific course batches, and manage enrollments.
          </p>
        </div>
      </div>

      <StudentsManagerClient initialStudents={students} courses={courses} />
    </div>
  );
}
