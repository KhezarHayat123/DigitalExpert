import { redirect } from "next/navigation";
import { getCurrentStudent } from "@/lib/studentAuth";
import { getCourses, getLectures } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export default async function StudentDashboardPage() {
  const student = await getCurrentStudent();

  if (!student) {
    redirect("/lms/login");
  }

  const allCourses = getCourses(true);
  const allLectures = getLectures();

  // Find courses student is approved for
  const enrolledCourses = allCourses.filter((c) => student.enrolledCourses.includes(c.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <DashboardClient
        student={student}
        allCourses={allCourses}
        enrolledCourses={enrolledCourses}
        allLectures={allLectures}
      />
    </div>
  );
}
