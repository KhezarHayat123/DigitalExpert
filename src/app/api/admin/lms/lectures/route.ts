import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getLectures, saveLecture } from "@/lib/db";
import { Lecture } from "@/lib/types";

export async function GET(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseSlug = searchParams.get("courseSlug") || undefined;
  const lectures = getLectures(courseSlug);

  return NextResponse.json({ success: true, lectures });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.courseSlug) {
      return NextResponse.json({ error: "Title and course are required." }, { status: 400 });
    }

    const lecture: Lecture = {
      id: body.id || `lec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      courseSlug: body.courseSlug,
      moduleTitle: body.moduleTitle || "Module 1: Core Fundamentals",
      title: body.title,
      duration: body.duration || "45 mins",
      videoUrl: body.videoUrl || "",
      order: body.order || Date.now(),
      description: body.description || "",
      assignmentPrompt: body.assignmentPrompt || "",
    };

    saveLecture(lecture, admin.email);
    return NextResponse.json({ success: true, lecture });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
