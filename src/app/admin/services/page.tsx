import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getServices } from "@/lib/db";
import ServicesManagerClient from "./ServicesManagerClient";

export const metadata = {
  title: "Services & Pricing | DigitalExpert Admin",
};

export default async function AdminServicesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const services = getServices();
  return <ServicesManagerClient initialServices={services} />;
}
