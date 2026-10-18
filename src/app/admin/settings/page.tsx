import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/db";
import SettingsManagerClient from "./SettingsManagerClient";

export const metadata = {
  title: "Settings | DigitalExpert Admin",
};

export default async function AdminSettingsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  if (admin.role !== "admin") {
    return (
      <div className="p-8 bg-white rounded-2xl border-2 border-red-500 text-center">
        <h3 className="font-heading font-extrabold text-lg text-red-600">Access Restricted</h3>
        <p className="text-xs text-de-muted mt-1">Only the full Admin (owner) role can view and modify global settings.</p>
      </div>
    );
  }

  const settings = getSettings();
  return <SettingsManagerClient initialSettings={settings} />;
}
