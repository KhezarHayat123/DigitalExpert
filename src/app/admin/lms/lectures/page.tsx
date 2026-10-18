import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getLectures, getCourses } from "@/lib/db";
import LecturesManagerClient from "./LecturesManagerClient";

export const metadata = {
  title: "LMS Lecture Recordings | Admin Dashboard",
};

export default async function AdminLMSLecturesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const lectures = getLectures();
  const courses = getCourses(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCDCDE]">
        <div>
          <h1 className="text-2xl font-bold text-[#1D2327]">Course Lecture Recordings & Videos</h1>
          <p className="text-xs text-[#646970] mt-1">
            Upload class video recordings, set module titles, and write practical student assignments.
          </p>
        </div>
      </div>

      <LecturesManagerClient initialLectures={lectures} courses={courses} />
    </div>
  );
}
