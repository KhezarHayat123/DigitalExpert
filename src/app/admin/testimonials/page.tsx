import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getTestimonials } from "@/lib/db";
import TestimonialsManagerClient from "./TestimonialsManagerClient";

export const metadata = {
  title: "Testimonials Manager | DigitalExpert Admin",
};

export default async function AdminTestimonialsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const testimonials = getTestimonials();
  return <TestimonialsManagerClient initialTestimonials={testimonials} />;
}
