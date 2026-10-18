export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lectures: { title: string; duration: string }[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  scheduleText: string;
  fee: number; // in PKR
  oldFee?: number;
  image: string;
  previewVideoUrl?: string;
  instructor: string;
  tools: string[];
  whatYouWillLearn: string[];
  modules: CourseModule[];
  published: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number | null; // null for custom quote
  priceSuffix?: string; // e.g. "per month", "per video"
  description: string;
  features: string[];
  isPopular?: boolean;
  isCustomQuote?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  image: string;
  icon: string;
  deliverables: string[];
  tools: string[];
  processSteps: { step: number; title: string; description: string }[];
  packages: ServicePackage[];
  faqs: { question: string; answer: string }[];
  published: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Project {
  id: string;
  title: string;
  category: "WordPress" | "SEO" | "Social Media" | "Ads" | "Video" | "YouTube";
  clientType: string;
  image: string;
  resultText: string;
  link?: string;
  featured: boolean;
  isSample: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  country: string;
  text: string;
  photo?: string;
  rating: number;
  isSample: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  experienceBadge?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  group: "General" | "Courses" | "Services" | "Payment" | "Admission";
  order: number;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string; // rich text / markdown HTML
  lastUpdated: string;
  seoTitle?: string;
  seoDescription?: string;
}

export type EnrollmentStatus = "New" | "Payment verified" | "Admission confirmed" | "Rejected";

export interface Enrollment {
  id: string;
  studentName: string;
  email: string;
  whatsapp: string;
  city: string;
  courseSlug: string;
  courseTitle: string;
  feeAtTime: number;
  paymentMethod: "JazzCash" | "EasyPaisa" | "Bank transfer" | string;
  transactionId?: string;
  screenshotPath: string; // private file name
  screenshotUrl?: string; // signed / admin route URL
  notes?: string;
  status: EnrollmentStatus;
  rejectReason?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  altText: string;
  uploadedAt: string;
}

export type UserRole = "admin" | "editor" | "manager";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userEmail: string;
  timestamp: string;
  details: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  location: string;
  mapEmbedUrl: string;
  mapLink: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
  paymentAccounts: {
    jazzcash: { number: string; accountTitle: string };
    easypaisa: { number: string; accountTitle: string };
    bank: {
      bankName: string;
      accountTitle: string;
      accountNumber: string;
      iban: string;
    };
  };
  acceptedPaymentMethods: string[];
  welcomePopup: {
    enabled: boolean;
    title: string;
    message: string;
  };
  whatsappDefaultMessage: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  analyticsId?: string;
  facebookPixelId?: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  status: "pending" | "approved" | "rejected";
  enrolledCourses: string[]; // slugs of courses student is approved for
  requestedCourse: string;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface Lecture {
  id: string;
  courseSlug: string;
  moduleTitle: string;
  title: string;
  duration: string;
  videoUrl: string; // YouTube unlisted / Vimeo / MP4
  order: number;
  description?: string;
  resources?: { title: string; url: string }[];
  assignmentPrompt?: string;
}

export interface StudentAssignment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseSlug: string;
  lectureId: string;
  lectureTitle: string;
  submissionText: string;
  submissionUrl?: string;
  submittedAt: string;
  grade?: string;
  feedback?: string;
}

export interface DatabaseSchema {
  courses: Course[];
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  team: TeamMember[];
  faqs: FAQ[];
  pages: CMSPage[];
  enrollments: Enrollment[];
  messages: ContactMessage[];
  media: MediaFile[];
  users: AdminUser[];
  settings: SiteSettings;
  auditLogs: AuditLog[];
  students: Student[];
  lectures: Lecture[];
  studentAssignments: StudentAssignment[];
}
