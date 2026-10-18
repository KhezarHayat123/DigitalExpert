import { NextResponse } from "next/server";
import { STUDENT_COOKIE_NAME } from "@/lib/studentAuth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete(STUDENT_COOKIE_NAME);
  return response;
}
