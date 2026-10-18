import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getPages } from "@/lib/db";
import PagesManagerClient from "./PagesManagerClient";

export const metadata = {
  title: "Pages CMS | DigitalExpert Admin",
};

export default async function AdminPagesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const pages = getPages();
  return <PagesManagerClient initialPages={pages} />;
}
