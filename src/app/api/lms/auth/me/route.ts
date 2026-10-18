import { NextResponse } from "next/server";
import { getCurrentStudent } from "@/lib/studentAuth";

export async function GET() {
  const student = await getCurrentStudent();
  if (!student) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      enrolledCourses: student.enrolledCourses,
    },
  });
}
