import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { findStudentByEmail, findStudentById } from "./db";
import { Student } from "./types";

const STUDENT_JWT_SECRET = new TextEncoder().encode(
  process.env.STUDENT_JWT_SECRET || "de_student_lms_secret_token_2026_digitalexpert"
);

export const STUDENT_COOKIE_NAME = "de_student_token";

export async function signStudentToken(student: Student): Promise<string> {
  return await new SignJWT({
    id: student.id,
    email: student.email,
    name: student.name,
    status: student.status,
    enrolledCourses: student.enrolledCourses,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // 7 days session
    .sign(STUDENT_JWT_SECRET);
}

export async function verifyStudentToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, STUDENT_JWT_SECRET);
    return payload as {
      id: string;
      email: string;
      name: string;
      status: string;
      enrolledCourses: string[];
    };
  } catch {
    return null;
  }
}

export async function getCurrentStudent(): Promise<Student | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(STUDENT_COOKIE_NAME)?.value;
    if (!token) return null;
    const payload = await verifyStudentToken(token);
    if (!payload?.id) return null;

    // Fetch latest fresh student data from DB
    const student = findStudentById(payload.id);
    if (!student || student.status !== "approved") return null;
    return student;
  } catch {
    return null;
  }
}

export async function hashStudentPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyStudentPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
