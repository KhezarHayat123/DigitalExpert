import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getMedia } from "@/lib/db";
import MediaManagerClient from "./MediaManagerClient";

export const metadata = {
  title: "Media Library | DigitalExpert Admin",
};

export default async function AdminMediaPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const media = getMedia();
  return <MediaManagerClient initialMedia={media} />;
}
