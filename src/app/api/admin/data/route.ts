import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import {
  getDatabase,
  saveCourse,
  deleteCourse,
  saveService,
  deleteService,
  saveProject,
  deleteProject,
  saveTestimonial,
  deleteTestimonial,
  saveTeamMember,
  deleteTeamMember,
  saveFaq,
  deleteFaq,
  savePage,
  updateSettings,
  saveUser,
  deleteUser,
} from "@/lib/db";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDatabase();
  return NextResponse.json({ success: true, data: db });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action, collection, item, id } = await req.json();

    // Only full admin can modify settings or users
    if ((collection === "settings" || collection === "users") && admin.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin role required for this action." }, { status: 403 });
    }

    if (action === "save") {
      if (collection === "courses") saveCourse(item, admin.email);
      else if (collection === "services") saveService(item, admin.email);
      else if (collection === "projects") saveProject(item, admin.email);
      else if (collection === "testimonials") saveTestimonial(item, admin.email);
      else if (collection === "team") saveTeamMember(item, admin.email);
      else if (collection === "faqs") saveFaq(item, admin.email);
      else if (collection === "pages") savePage(item, admin.email);
      else if (collection === "settings") updateSettings(item, admin.email);
      else if (collection === "users") saveUser(item, admin.email);
      else return NextResponse.json({ error: "Invalid collection" }, { status: 400 });

      return NextResponse.json({ success: true });
    }

    if (action === "delete") {
      if (collection === "courses") deleteCourse(id, admin.email);
      else if (collection === "services") deleteService(id, admin.email);
      else if (collection === "projects") deleteProject(id, admin.email);
      else if (collection === "testimonials") deleteTestimonial(id, admin.email);
      else if (collection === "team") deleteTeamMember(id, admin.email);
      else if (collection === "faqs") deleteFaq(id, admin.email);
      else if (collection === "users") deleteUser(id, admin.email);
      else return NextResponse.json({ error: "Invalid collection" }, { status: 400 });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
