import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { findUserByEmail } from "./db";
import { AdminUser, UserRole } from "./types";

const JWT_SECRET = new TextEncoder().encode(
  process.env.PAYLOAD_SECRET || "de_super_secret_jwt_key_2026_digitalexpert_bahawalpur"
);

const COOKIE_NAME = "de_admin_token";

// Brute-force tracking (in-memory)
const loginAttempts: Map<string, { count: number; lockedUntil: number }> = new Map();

export function checkBruteForce(identifier: string): { allowed: boolean; remainingLockSeconds?: number } {
  const record = loginAttempts.get(identifier);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockedUntil > now) {
    const remaining = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingLockSeconds: remaining };
  }

  if (record.lockedUntil <= now && record.count >= 5) {
    // Reset after lock expires
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordLoginAttempt(identifier: string, success: boolean): void {
  if (success) {
    loginAttempts.delete(identifier);
    return;
  }

  const record = loginAttempts.get(identifier) || { count: 0, lockedUntil: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = Date.now() + 15 * 60 * 1000; // 15-minute lockout
  }
  loginAttempts.set(identifier, record);
}

export async function signAdminToken(user: AdminUser): Promise<string> {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; email: string; name: string; role: UserRole };
  } catch (error) {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<{ id: string; email: string; name: string; role: UserRole } | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export { COOKIE_NAME };
