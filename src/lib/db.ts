import fs from "fs";
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
const PRIVATE_UPLOADS_DIR = path.join(DATA_DIR, "private-uploads");

// Ensure data directories exist
function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRIVATE_UPLOADS_DIR)) {
    fs.mkdirSync(PRIVATE_UPLOADS_DIR, { recursive: true });
  }
}

// In-memory cache for fast reads
let memoryDb: DatabaseSchema | null = null;

export function getDatabase(): DatabaseSchema {
  if (memoryDb) {
    memoryDb.students = memoryDb.students || [];
    memoryDb.lectures = memoryDb.lectures || [];
    memoryDb.studentAssignments = memoryDb.studentAssignments || [];
    return memoryDb;
  }

  ensureDirs();

  if (!fs.existsSync(DB_FILE)) {
    // Initialize with seed data
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSeedData, null, 2), "utf-8");
    memoryDb = JSON.parse(JSON.stringify(initialSeedData));
    memoryDb!.students = memoryDb!.students || [];
    memoryDb!.lectures = memoryDb!.lectures || [];
    memoryDb!.studentAssignments = memoryDb!.studentAssignments || [];
    return memoryDb!;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    memoryDb = JSON.parse(raw);
    memoryDb!.students = memoryDb!.students || [];
    memoryDb!.lectures = memoryDb!.lectures || [];
    memoryDb!.studentAssignments = memoryDb!.studentAssignments || [];
    return memoryDb!;
  } catch (error) {
    console.error("Error reading database, falling back to seed:", error);
    memoryDb = JSON.parse(JSON.stringify(initialSeedData));
    memoryDb!.students = memoryDb!.students || [];
    memoryDb!.lectures = memoryDb!.lectures || [];
    memoryDb!.studentAssignments = memoryDb!.studentAssignments || [];
    return memoryDb!;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  ensureDirs();
  memoryDb = data;
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempFile, DB_FILE);
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
  db.media.unshift(file);
  addAuditLog("Upload Media", userEmail, `Uploaded file ${file.name}`);
  saveDatabase(db);
}

export function deleteMediaFile(id: string, userEmail = "admin"): void {
  const db = getDatabase();
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
