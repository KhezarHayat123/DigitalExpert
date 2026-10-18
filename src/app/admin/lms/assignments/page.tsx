import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getStudentAssignments } from "@/lib/db";
import AssignmentsManagerClient from "./AssignmentsManagerClient";

export const metadata = {
  title: "Student Assignments | Admin Dashboard",
};

export default async function AdminLMSAssignmentsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const assignments = getStudentAssignments();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCDCDE]">
        <div>
          <h1 className="text-2xl font-bold text-[#1D2327]">Student Homework & Project Submissions</h1>
          <p className="text-xs text-[#646970] mt-1">
            Review student practical project submissions, grade assignments, and provide instructor feedback.
          </p>
        </div>
      </div>

      <AssignmentsManagerClient initialAssignments={assignments} />
    </div>
  );
}
