import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db";
import { verifyPassword, signAdminToken, checkBruteForce, recordLoginAttempt, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check brute force protection
    const bruteCheck = checkBruteForce(cleanEmail);
    if (!bruteCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Account temporarily locked. Please try again in ${bruteCheck.remainingLockSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const user = findUserByEmail(cleanEmail);
    if (!user) {
      recordLoginAttempt(cleanEmail, false);
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      recordLoginAttempt(cleanEmail, false);
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Success: reset attempts and sign JWT
    recordLoginAttempt(cleanEmail, true);
    const token = await signAdminToken(user);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Login API error:", err);
    return NextResponse.json({ error: err.message || "Login failed." }, { status: 500 });
  }
}
