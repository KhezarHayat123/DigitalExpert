import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getMessages } from "@/lib/db";
import MessagesManagerClient from "./MessagesManagerClient";

export const metadata = {
  title: "Messages | DigitalExpert Admin",
};

export default async function AdminMessagesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const messages = getMessages();

  return <MessagesManagerClient initialMessages={messages} />;
}
