import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getCourses, syncDatabaseFromCloud } from "@/lib/db";
import CoursesManagerClient from "./CoursesManagerClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Courses Manager | DigitalExpert Admin",
};

export default async function AdminCoursesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  await syncDatabaseFromCloud();
  const courses = getCourses();
  return <CoursesManagerClient initialCourses={courses} />;
}
