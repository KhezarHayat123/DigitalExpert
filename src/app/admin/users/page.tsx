import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getUsers } from "@/lib/db";
import UsersManagerClient from "./UsersManagerClient";

export const metadata = {
  title: "Users & Roles | DigitalExpert Admin",
};

export default async function AdminUsersPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  if (admin.role !== "admin") {
    return (
      <div className="p-8 bg-white rounded-2xl border-2 border-red-500 text-center">
        <h3 className="font-heading font-extrabold text-lg text-red-600">Access Restricted</h3>
        <p className="text-xs text-de-muted mt-1">Only the full Admin (owner) role can view and manage user accounts.</p>
      </div>
    );
  }

  const users = getUsers();
  return <UsersManagerClient initialUsers={users} />;
}
