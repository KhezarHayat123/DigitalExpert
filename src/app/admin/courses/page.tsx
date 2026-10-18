import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getCourses } from "@/lib/db";
import CoursesManagerClient from "./CoursesManagerClient";

export const metadata = {
  title: "Courses Manager | DigitalExpert Admin",
};

export default async function AdminCoursesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const courses = getCourses();
  return <CoursesManagerClient initialCourses={courses} />;
}
