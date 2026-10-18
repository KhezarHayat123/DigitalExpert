import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getTeam } from "@/lib/db";
import TeamManagerClient from "./TeamManagerClient";

export const metadata = {
  title: "Team Members | DigitalExpert Admin",
};

export default async function AdminTeamPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const team = getTeam();
  return <TeamManagerClient initialTeam={team} />;
}
