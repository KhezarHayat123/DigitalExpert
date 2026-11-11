import fs from "fs";
import os from "os";
import path from "path";
import {
  DatabaseSchema,
  Course,
  Service,
  Project,
  Testimonial,
  TeamMember,
  FAQ,
  CMSPage,
  Enrollment,
  ContactMessage,
  MediaFile,
  AdminUser,
  SiteSettings,
  AuditLog,
  EnrollmentStatus,
  Student,
  Lecture,
  StudentAssignment,
} from "./types";
import { initialSeedData } from "./seedData";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const TMP_DB_FILE = path.join(os.tmpdir(), "digitalexpert-db.json");
const PRIVATE_UPLOADS_DIR = path.join(DATA_DIR, "private-uploads");

// Ensure data directories exist
function ensureDirs() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PRIVATE_UPLOADS_DIR)) {
      fs.mkdirSync(PRIVATE_UPLOADS_DIR, { recursive: true });
    }
  } catch {
    // Ignore read-only filesystem errors in cloud environments
  }
}

export function isDiskWritable(): boolean {
  try {
    fs.accessSync(DATA_DIR, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function normalizeSchema(db: DatabaseSchema): DatabaseSchema {
  db.students = db.students || [];
  db.lectures = db.lectures || [];
  db.studentAssignments = db.studentAssignments || [];
  db.media = db.media || [];
  return db;
}

// In-memory cache for fast reads
let memoryDb: DatabaseSchema | null = null;

export function getDatabase(): DatabaseSchema {
  if (memoryDb) {
    return normalizeSchema(memoryDb);
  }

  ensureDirs();

  // In read-only cloud deployments (like Vercel), check if a newer /tmp state exists
  try {
    const tmpExists = fs.existsSync(TMP_DB_FILE);
    const dbExists = fs.existsSync(DB_FILE);
    if (tmpExists && (!dbExists || fs.statSync(TMP_DB_FILE).mtimeMs > fs.statSync(DB_FILE).mtimeMs)) {
      const tmpRaw = fs.readFileSync(TMP_DB_FILE, "utf-8");
      memoryDb = normalizeSchema(JSON.parse(tmpRaw));
      return memoryDb;
    }
  } catch {
    // Ignore /tmp read failures and fall through to DB_FILE
  }

  if (!fs.existsSync(DB_FILE)) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSeedData, null, 2), "utf-8");
    } catch {
      // Read-only runtime; use memory/seed directly
    }
    memoryDb = normalizeSchema(JSON.parse(JSON.stringify(initialSeedData)));
    return memoryDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    memoryDb = normalizeSchema(JSON.parse(raw));
    return memoryDb;
  } catch (error) {
    console.error("Error reading database, falling back to seed:", error);
    memoryDb = normalizeSchema(JSON.parse(JSON.stringify(initialSeedData)));
    return memoryDb;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  ensureDirs();
  const normalized = normalizeSchema(data);
  memoryDb = normalized;
  const serialized = JSON.stringify(normalized, null, 2);

  try {
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, serialized, "utf-8");
    fs.renameSync(tempFile, DB_FILE);
    return;
  } catch {
    // Expected on read-only serverless runtimes like Vercel; fall back to /tmp
  }

  try {
    const tmpFallback = `${TMP_DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpFallback, serialized, "utf-8");
    fs.renameSync(tmpFallback, TMP_DB_FILE);
  } catch (err) {
    console.warn("Could not write database to disk or /tmp:", err);
  }
}

function getRedisConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

export function getStorageMode(): "disk" | "cloud" | "temporary" {
  if (isDiskWritable()) return "disk";
  if (getRedisConfig() || process.env.GITHUB_TOKEN) return "cloud";
  return "temporary";
}

let cachedCloudVersion: string | null = null;
let lastGitHubCheckMs = 0;
let lastGitHubEtag: string | null = null;

/**
 * Pull latest shared state from Upstash Redis / Vercel KV (instant) or GitHub (fallback)
 * when running on read-only serverless hosting like Vercel.
 */
export async function syncDatabaseFromCloud(force = false): Promise<DatabaseSchema> {
  const localDb = getDatabase();
  if (isDiskWritable()) return localDb;

  const redis = getRedisConfig();
  if (redis) {
    try {
      const verRes = await fetch(`${redis.url}/get/de:version`, {
        headers: { Authorization: `Bearer ${redis.token}` },
        cache: "no-store",
      });
      if (verRes.ok) {
        const verJson = await verRes.json();
        const remoteVersion = verJson?.result ? String(verJson.result) : null;
        if (remoteVersion && (remoteVersion !== cachedCloudVersion || force)) {
          const pipeRes = await fetch(`${redis.url}/pipeline`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${redis.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              ["GET", "de:courses"],
              ["GET", "de:services"],
              ["GET", "de:testimonials"],
              ["GET", "de:media"],
              ["GET", "de:core"],
            ]),
            cache: "no-store",
          });
          if (pipeRes.ok) {
            const parts = await pipeRes.json();
            const merged: DatabaseSchema = { ...localDb };
            if (parts?.[0]?.result) merged.courses = JSON.parse(parts[0].result);
            if (parts?.[1]?.result) merged.services = JSON.parse(parts[1].result);
            if (parts?.[2]?.result) merged.testimonials = JSON.parse(parts[2].result);
            if (parts?.[3]?.result) merged.media = JSON.parse(parts[3].result);
            if (parts?.[4]?.result) {
              const core = JSON.parse(parts[4].result);
              Object.assign(merged, core);
            }
            memoryDb = normalizeSchema(merged);
            cachedCloudVersion = remoteVersion;
            return memoryDb;
          }
        }
      }
    } catch (err) {
      console.warn("Redis cloud sync check failed:", err);
    }
    return localDb;
  }

  const ghToken = process.env.GITHUB_TOKEN;
  if (ghToken && (force || Date.now() - lastGitHubCheckMs > 3000)) {
    lastGitHubCheckMs = Date.now();
    const repo = process.env.GITHUB_REPO || "KhezarHayat123/DigitalExpert";
    const branch = process.env.GITHUB_BRANCH || "main";
    const apiUrl = `https://api.github.com/repos/${repo}/contents/data/db.json?ref=${branch}`;
    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      };
      if (lastGitHubEtag && !force) headers["If-None-Match"] = lastGitHubEtag;

      const res = await fetch(apiUrl, { headers, cache: "no-store" });
      if (res.status === 200) {
        const etag = res.headers.get("etag");
        if (etag) lastGitHubEtag = etag;
        const fileData = await res.json();
        let rawJson = "";
        if (fileData.content) {
          rawJson = Buffer.from(fileData.content, "base64").toString("utf-8");
        } else if (fileData.sha) {
          const blobRes = await fetch(`https://api.github.com/repos/${repo}/git/blobs/${fileData.sha}`, {
            headers: {
              Authorization: `Bearer ${ghToken}`,
              Accept: "application/vnd.github.raw+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
            cache: "no-store",
          });
          if (blobRes.ok) rawJson = await blobRes.text();
        }
        if (rawJson) {
          memoryDb = normalizeSchema(JSON.parse(rawJson));
          return memoryDb;
        }
      }
    } catch (err) {
      console.warn("GitHub cloud sync check failed:", err);
    }
  }

  return localDb;
}

const mediaBinCache = new Map<string, string>();
const pendingDeletedMediaIds = new Set<string>();

/**
 * Retrieve raw data URL or remote/local image path for a Media Library item ID.
 */
export async function getMediaBinaryById(id: string): Promise<{ url: string; mimeType?: string } | null> {
  const cached = mediaBinCache.get(id);
  if (cached) return { url: cached };

  const db = await syncDatabaseFromCloud();
  const item = db.media.find((m) => m.id === id);
  if (item && item.url.startsWith("data:")) {
    mediaBinCache.set(id, item.url);
    return { url: item.url, mimeType: item.mimeType };
  }

  const redis = getRedisConfig();
  if (redis) {
    try {
      const res = await fetch(`${redis.url}/get/${encodeURIComponent(`de:media-bin:${id}`)}`, {
        headers: { Authorization: `Bearer ${redis.token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.result) {
          const val = String(json.result);
          mediaBinCache.set(id, val);
          return { url: val, mimeType: item?.mimeType };
        }
      }
    } catch {
      // Ignore transient Redis read errors
    }
  }

  if (item?.url && !item.url.startsWith("/api/media/")) {
    return { url: item.url, mimeType: item.mimeType };
  }

  return null;
}

/**
 * Persistent remote storage sync to Upstash Redis / Vercel KV (instant live updates)
 * and/or GitHub Contents API if configured in Vercel Environment Variables.
 */
export async function persistDatabaseRemotely(commitMessage = "CMS update via Admin Panel"): Promise<boolean> {
  const db = getDatabase();
  let savedAnywhere = false;

  const redis = getRedisConfig();
  if (redis) {
    try {
      const version = `${Date.now()}`;
      const { courses, services, testimonials, media, ...core } = db;
      const commands: string[][] = [];
      const lightweightMedia = media.map((m) => {
        if (m.url.startsWith("data:")) {
          mediaBinCache.set(m.id, m.url);
          commands.push(["SET", `de:media-bin:${m.id}`, m.url]);
          return { ...m, url: `/api/media/${m.id}` };
        }
        return m;
      });
      for (const delId of Array.from(pendingDeletedMediaIds)) {
        commands.push(["DEL", `de:media-bin:${delId}`]);
      }

      commands.push(
        ["SET", "de:courses", JSON.stringify(courses)],
        ["SET", "de:services", JSON.stringify(services)],
        ["SET", "de:testimonials", JSON.stringify(testimonials)],
        ["SET", "de:media", JSON.stringify(lightweightMedia)],
        ["SET", "de:core", JSON.stringify(core)],
        ["SET", "de:version", version]
      );

      const pipeRes = await fetch(`${redis.url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redis.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commands),
        cache: "no-store",
      });
      if (pipeRes.ok) {
        pendingDeletedMediaIds.clear();
        cachedCloudVersion = version;
        savedAnywhere = true;
      }
    } catch (err) {
      console.warn("Redis persistence failed:", err);
    }
  }

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const repo = process.env.GITHUB_REPO || "KhezarHayat123/DigitalExpert";
    const branch = process.env.GITHUB_BRANCH || "main";
    const apiUrl = `https://api.github.com/repos/${repo}/contents/data/db.json`;

    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      };

      const getRes = await fetch(`${apiUrl}?ref=${branch}`, { headers, cache: "no-store" });
      if (getRes.ok) {
        const currentFile = await getRes.json();
        const contentBase64 = Buffer.from(JSON.stringify(db, null, 2) + "\n", "utf-8").toString("base64");

        const putRes = await fetch(apiUrl, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            message: commitMessage,
            content: contentBase64,
            sha: currentFile.sha,
            branch,
          }),
        });
        if (putRes.ok) {
          lastGitHubEtag = null;
          savedAnywhere = true;
        }
      }
    } catch (err) {
      console.warn("Optional GitHub DB persistence failed:", err);
    }
  }

  return savedAnywhere;
}

// Courses
export function getCourses(publishedOnly = false): Course[] {
  const db = getDatabase();
  const list = db.courses.sort((a, b) => a.order - b.order);
  return publishedOnly ? list.filter((c) => c.published) : list;
}

export function getCourseBySlug(slug: string): Course | undefined {
  const db = getDatabase();
  return db.courses.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function saveCourse(course: Course, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.courses.findIndex((c) => c.id === course.id);
  if (idx >= 0) {
    db.courses[idx] = course;
    addAuditLog("Update Course", userEmail, `Updated course ${course.title}`);
  } else {
    db.courses.push(course);
    addAuditLog("Create Course", userEmail, `Created course ${course.title}`);
  }
  saveDatabase(db);
}

export function deleteCourse(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.courses = db.courses.filter((c) => c.id !== id);
  addAuditLog("Delete Course", userEmail, `Deleted course ${id}`);
  saveDatabase(db);
}

// Services
export function getServices(publishedOnly = false): Service[] {
  const db = getDatabase();
  const list = db.services.sort((a, b) => a.order - b.order);
  return publishedOnly ? list.filter((s) => s.published) : list;
}

export function getServiceBySlug(slug: string): Service | undefined {
  const db = getDatabase();
  return db.services.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

export function saveService(service: Service, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.services.findIndex((s) => s.id === service.id);
  if (idx >= 0) {
    db.services[idx] = service;
    addAuditLog("Update Service", userEmail, `Updated service ${service.name}`);
  } else {
    db.services.push(service);
    addAuditLog("Create Service", userEmail, `Created service ${service.name}`);
  }
  saveDatabase(db);
}

export function deleteService(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.services = db.services.filter((s) => s.id !== id);
  addAuditLog("Delete Service", userEmail, `Deleted service ${id}`);
  saveDatabase(db);
}

// Projects
export function getProjects(): Project[] {
  const db = getDatabase();
  return db.projects.sort((a, b) => a.order - b.order);
}

export function saveProject(project: Project, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    db.projects[idx] = project;
  } else {
    db.projects.push(project);
  }
  addAuditLog("Save Project", userEmail, `Saved project ${project.title}`);
  saveDatabase(db);
}

export function deleteProject(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.projects = db.projects.filter((p) => p.id !== id);
  addAuditLog("Delete Project", userEmail, `Deleted project ${id}`);
  saveDatabase(db);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  const db = getDatabase();
  return db.testimonials;
}

export function saveTestimonial(testimonial: Testimonial, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.testimonials.findIndex((t) => t.id === testimonial.id);
  if (idx >= 0) {
    db.testimonials[idx] = testimonial;
  } else {
    db.testimonials.push(testimonial);
  }
  addAuditLog("Save Testimonial", userEmail, `Saved testimonial by ${testimonial.name}`);
  saveDatabase(db);
}

export function deleteTestimonial(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  saveDatabase(db);
}

// Team
export function getTeam(): TeamMember[] {
  const db = getDatabase();
  return db.team.sort((a, b) => a.order - b.order);
}

export function saveTeamMember(member: TeamMember, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.team.findIndex((t) => t.id === member.id);
  if (idx >= 0) {
    db.team[idx] = member;
  } else {
    db.team.push(member);
  }
  addAuditLog("Save Team Member", userEmail, `Saved team member ${member.name}`);
  saveDatabase(db);
}

export function deleteTeamMember(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.team = db.team.filter((t) => t.id !== id);
  saveDatabase(db);
}

// FAQs
export function getFaqs(): FAQ[] {
  const db = getDatabase();
  return db.faqs.sort((a, b) => a.order - b.order);
}

export function saveFaq(faq: FAQ, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.faqs.findIndex((f) => f.id === faq.id);
  if (idx >= 0) {
    db.faqs[idx] = faq;
  } else {
    db.faqs.push(faq);
  }
  saveDatabase(db);
}

export function deleteFaq(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.faqs = db.faqs.filter((f) => f.id !== id);
  saveDatabase(db);
}

// Pages (Legal & Content)
export function getPages(): CMSPage[] {
  const db = getDatabase();
  return db.pages;
}

export function getPageBySlug(slug: string): CMSPage | undefined {
  const db = getDatabase();
  return db.pages.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function savePage(page: CMSPage, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.pages.findIndex((p) => p.id === page.id);
  if (idx >= 0) {
    db.pages[idx] = page;
  } else {
    db.pages.push(page);
  }
  addAuditLog("Save Page", userEmail, `Updated page ${page.title}`);
  saveDatabase(db);
}

// Settings
export function getSettings(): SiteSettings {
  const db = getDatabase();
  return db.settings;
}

export function updateSettings(settings: Partial<SiteSettings>, userEmail = "admin"): SiteSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...settings };
  addAuditLog("Update Settings", userEmail, "Updated global site settings");
  saveDatabase(db);
  return db.settings;
}

// Enrollments
export function getEnrollments(): Enrollment[] {
  const db = getDatabase();
  return db.enrollments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getEnrollmentById(id: string): Enrollment | undefined {
  const db = getDatabase();
  return db.enrollments.find((e) => e.id === id);
}

export function createEnrollment(enrollment: Omit<Enrollment, "id" | "createdAt" | "updatedAt" | "status">): Enrollment {
  const db = getDatabase();
  const now = new Date().toISOString();
  const newEnrollment: Enrollment = {
    ...enrollment,
    id: `enr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: "New",
    createdAt: now,
    updatedAt: now
  };
  db.enrollments.unshift(newEnrollment);
  addAuditLog("New Enrollment", "public", `${newEnrollment.studentName} enrolled for ${newEnrollment.courseTitle}`);
  saveDatabase(db);
  return newEnrollment;
}

export function updateEnrollmentStatus(id: string, status: EnrollmentStatus, rejectReason?: string, internalNotes?: string, userEmail = "admin"): Enrollment | null {
  const db = getDatabase();
  const item = db.enrollments.find((e) => e.id === id);
  if (!item) return null;

  item.status = status;
  item.updatedAt = new Date().toISOString();
  if (rejectReason !== undefined) item.rejectReason = rejectReason;
  if (internalNotes !== undefined) item.internalNotes = internalNotes;

  addAuditLog("Update Enrollment Status", userEmail, `Changed enrollment ${id} to ${status}`);
  saveDatabase(db);
  return item;
}

// Messages
export function getMessages(): ContactMessage[] {
  const db = getDatabase();
  return db.messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createMessage(msg: Omit<ContactMessage, "id" | "read" | "createdAt">): ContactMessage {
  const db = getDatabase();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    read: false,
    createdAt: new Date().toISOString()
  };
  db.messages.unshift(newMsg);
  addAuditLog("New Message", "public", `Received enquiry from ${newMsg.name}`);
  saveDatabase(db);
  return newMsg;
}

export function markMessageRead(id: string, read: boolean, userEmail = "admin"): void {
  const db = getDatabase();
  const msg = db.messages.find((m) => m.id === id);
  if (msg) {
    msg.read = read;
    saveDatabase(db);
  }
}

export function deleteMessage(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.messages = db.messages.filter((m) => m.id !== id);
  saveDatabase(db);
}

// Media
export function getMedia(): MediaFile[] {
  const db = getDatabase();
  return db.media;
}

export function addMediaFile(file: MediaFile, userEmail = "admin"): void {
  const db = getDatabase();
  if (file.url.startsWith("data:")) {
    mediaBinCache.set(file.id, file.url);
  }
  const existingIdx = db.media.findIndex((m) => m.id === file.id);
  if (existingIdx >= 0) {
    db.media[existingIdx] = file;
  } else {
    db.media.unshift(file);
  }
  addAuditLog("Upload Media", userEmail, `Uploaded file ${file.name}`);
  saveDatabase(db);
}

export function deleteMediaFile(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  mediaBinCache.delete(id);
  pendingDeletedMediaIds.add(id);
  db.media = db.media.filter((m) => m.id !== id);
  saveDatabase(db);
}

// Users
export function getUsers(): AdminUser[] {
  const db = getDatabase();
  return db.users;
}

export function findUserByEmail(email: string): AdminUser | undefined {
  const db = getDatabase();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function saveUser(user: AdminUser, userEmail = "admin"): void {
  const db = getDatabase();
  const idx = db.users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    db.users[idx] = user;
  } else {
    db.users.push(user);
  }
  addAuditLog("Save User", userEmail, `Updated user ${user.email}`);
  saveDatabase(db);
}

export function deleteUser(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.users = db.users.filter((u) => u.id !== id);
  saveDatabase(db);
}

// Audit Logs
export function getAuditLogs(): AuditLog[] {
  const db = getDatabase();
  return db.auditLogs.slice(0, 100);
}

export function addAuditLog(action: string, userEmail: string, details: string): void {
  const db = getDatabase();
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    action,
    userEmail,
    timestamp: new Date().toISOString(),
    details
  };
  db.auditLogs.unshift(log);
  if (db.auditLogs.length > 200) {
    db.auditLogs = db.auditLogs.slice(0, 200);
  }
}

// Private uploads path helper
export function getPrivateUploadsPath(): string {
  ensureDirs();
  return PRIVATE_UPLOADS_DIR;
}

// ==================== LMS: STUDENTS ====================
export function getStudents(): Student[] {
  const db = getDatabase();
  return db.students || [];
}

export function findStudentByEmail(email: string): Student | undefined {
  const db = getDatabase();
  return (db.students || []).find((s) => s.email.toLowerCase() === email.toLowerCase());
}

export function findStudentById(id: string): Student | undefined {
  const db = getDatabase();
  return (db.students || []).find((s) => s.id === id);
}

export function createStudent(data: {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  requestedCourse: string;
}): Student {
  const db = getDatabase();
  const newStudent: Student = {
    id: `std-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
    passwordHash: data.passwordHash,
    status: "pending", // strictly requires admin approval
    enrolledCourses: [],
    requestedCourse: data.requestedCourse,
    createdAt: new Date().toISOString(),
  };

  db.students = db.students || [];
  db.students.unshift(newStudent);
  addAuditLog("Student Signup", data.email, `Student registered for ${data.requestedCourse} (Status: Pending Approval)`);
  saveDatabase(db);
  return newStudent;
}

export function updateStudent(student: Student, userEmail = "admin"): void {
  const db = getDatabase();
  db.students = db.students || [];
  const idx = db.students.findIndex((s) => s.id === student.id);
  if (idx >= 0) {
    db.students[idx] = student;
    addAuditLog("Update Student", userEmail, `Updated student ${student.email}`);
    saveDatabase(db);
  }
}

export function approveStudent(id: string, courseSlug?: string, userEmail = "admin"): Student | null {
  const db = getDatabase();
  db.students = db.students || [];
  const student = db.students.find((s) => s.id === id);
  if (!student) return null;

  student.status = "approved";
  student.approvedAt = new Date().toISOString();
  student.approvedBy = userEmail;

  const targetCourse = courseSlug || student.requestedCourse;
  if (targetCourse && !student.enrolledCourses.includes(targetCourse)) {
    student.enrolledCourses.push(targetCourse);
  }

  addAuditLog("Approve Student", userEmail, `Approved student ${student.email} for course: ${student.enrolledCourses.join(", ")}`);
  saveDatabase(db);
  return student;
}

export function deleteStudent(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.students = (db.students || []).filter((s) => s.id !== id);
  addAuditLog("Delete Student", userEmail, `Deleted student ID ${id}`);
  saveDatabase(db);
}

// ==================== LMS: LECTURES ====================
export function getLectures(courseSlug?: string): Lecture[] {
  const db = getDatabase();
  const list = db.lectures || [];
  if (courseSlug) {
    return list.filter((l) => l.courseSlug === courseSlug).sort((a, b) => a.order - b.order);
  }
  return list.sort((a, b) => a.order - b.order);
}

export function saveLecture(lecture: Lecture, userEmail = "admin"): void {
  const db = getDatabase();
  db.lectures = db.lectures || [];
  const idx = db.lectures.findIndex((l) => l.id === lecture.id);
  if (idx >= 0) {
    db.lectures[idx] = lecture;
  } else {
    db.lectures.push(lecture);
  }
  addAuditLog("Save Lecture", userEmail, `Saved lecture "${lecture.title}" in ${lecture.courseSlug}`);
  saveDatabase(db);
}

export function deleteLecture(id: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.lectures = (db.lectures || []).filter((l) => l.id !== id);
  addAuditLog("Delete Lecture", userEmail, `Deleted lecture ID ${id}`);
  saveDatabase(db);
}

// ==================== LMS: ASSIGNMENTS ====================
export function getStudentAssignments(studentId?: string, courseSlug?: string): StudentAssignment[] {
  const db = getDatabase();
  let list = db.studentAssignments || [];
  if (studentId) list = list.filter((a) => a.studentId === studentId);
  if (courseSlug) list = list.filter((a) => a.courseSlug === courseSlug);
  return list;
}

export function submitStudentAssignment(data: Omit<StudentAssignment, "id" | "submittedAt">): StudentAssignment {
  const db = getDatabase();
  db.studentAssignments = db.studentAssignments || [];
  const newSubmission: StudentAssignment = {
    id: `asg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    submittedAt: new Date().toISOString(),
  };
  db.studentAssignments.unshift(newSubmission);
  addAuditLog("Submit Assignment", data.studentEmail, `Submitted assignment for ${data.lectureTitle}`);
  saveDatabase(db);
  return newSubmission;
}

export function gradeStudentAssignment(id: string, grade: string, feedback: string, userEmail = "admin"): void {
  const db = getDatabase();
  db.studentAssignments = db.studentAssignments || [];
  const submission = db.studentAssignments.find((a) => a.id === id);
  if (submission) {
    submission.grade = grade;
    submission.feedback = feedback;
    addAuditLog("Grade Assignment", userEmail, `Graded assignment ${id} for ${submission.studentName}`);
    saveDatabase(db);
  }
}
