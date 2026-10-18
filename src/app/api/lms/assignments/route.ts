import { NextResponse } from "next/server";
import { getCurrentStudent } from "@/lib/studentAuth";
import { submitStudentAssignment, getStudentAssignments } from "@/lib/db";

export async function GET(req: Request) {
  const student = await getCurrentStudent();
  if (!student) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseSlug = searchParams.get("courseSlug") || undefined;
  const submissions = getStudentAssignments(student.id, courseSlug);

  return NextResponse.json({ success: true, submissions });
}

export async function POST(req: Request) {
  const student = await getCurrentStudent();
  if (!student) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { lectureId, lectureTitle, courseSlug, submissionText, submissionUrl } = await req.json();

    if (!lectureId || !courseSlug || (!submissionText && !submissionUrl)) {
      return NextResponse.json(
        { error: "Lecture details and submission content/link are required." },
        { status: 400 }
      );
    }

    // Verify student is enrolled in this course
    if (!student.enrolledCourses.includes(courseSlug)) {
      return NextResponse.json(
        { error: "You are not enrolled in this course." },
        { status: 403 }
      );
    }

    const submission = submitStudentAssignment({
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      courseSlug,
      lectureId,
      lectureTitle: lectureTitle || "Lecture Assignment",
      submissionText: submissionText || "",
      submissionUrl: submissionUrl || "",
    });

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    console.error("Assignment submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit assignment." }, { status: 500 });
  }
}
