import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { gradeStudentAssignment } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { grade, feedback } = await req.json();
    gradeStudentAssignment(params.id, grade || "A", feedback || "Well done!", admin.email);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
