import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getEnrollments, getCourses } from "@/lib/db";
import EnrollmentsManagerClient from "./EnrollmentsManagerClient";

export const metadata = {
  title: "Enrollments Manager | DigitalExpert Admin",
};

export default async function AdminEnrollmentsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const enrollments = getEnrollments();
  const courses = getCourses();

  return <EnrollmentsManagerClient initialEnrollments={enrollments} courses={courses} />;
}
