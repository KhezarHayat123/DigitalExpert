import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getTestimonials, syncDatabaseFromCloud } from "@/lib/db";
import TestimonialsManagerClient from "./TestimonialsManagerClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Testimonials Manager | DigitalExpert Admin",
};

export default async function AdminTestimonialsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  await syncDatabaseFromCloud();
  const testimonials = getTestimonials();
  return <TestimonialsManagerClient initialTestimonials={testimonials} />;
}
