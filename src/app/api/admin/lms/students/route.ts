import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getStudents, createStudent } from "@/lib/db";
import { hashStudentPassword } from "@/lib/studentAuth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const students = getStudents();
  return NextResponse.json({ success: true, students });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, phone, password, requestedCourse } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    const passwordHash = await hashStudentPassword(password);
    const student = createStudent({
      name,
      email,
      phone: phone || "",
      passwordHash,
      requestedCourse: requestedCourse || "wordpress",
    });

    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
