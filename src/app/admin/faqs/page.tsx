import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getFaqs } from "@/lib/db";
import FaqsManagerClient from "./FaqsManagerClient";

export const metadata = {
  title: "FAQs Manager | DigitalExpert Admin",
};

export default async function AdminFaqsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const faqs = getFaqs();
  return <FaqsManagerClient initialFaqs={faqs} />;
}
