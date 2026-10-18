import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getProjects } from "@/lib/db";
import ProjectsManagerClient from "./ProjectsManagerClient";

export const metadata = {
  title: "Projects Manager | DigitalExpert Admin",
};

export default async function AdminProjectsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const projects = getProjects();
  return <ProjectsManagerClient initialProjects={projects} />;
}
