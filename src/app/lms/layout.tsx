import Link from "next/link";
import Image from "next/image";
import { getCurrentStudent } from "@/lib/studentAuth";
import StudentLogoutButton from "@/components/lms/StudentLogoutButton";
import { BookOpen, User, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Student LMS Portal | DigitalExpert Bahawalpur",
  description: "Official Learning Management System and Video Classroom for DigitalExpert students.",
};

export default async function LMSLayout({ children }: { children: React.ReactNode }) {
  const student = await getCurrentStudent();

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col">
      {/* LMS Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-de-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="relative h-9 w-36 sm:h-10 sm:w-40">
              <Image
                src="/brand/digital-expert-logo.png"
                alt="DigitalExpert Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-de-border">
              <span className="px-2.5 py-0.5 rounded-full bg-de-green/15 text-de-green text-xs font-heading font-extrabold uppercase">
                Student LMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {student ? (
              <>
                <Link
                  href="/lms/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-de-warm border border-de-border text-xs font-bold text-de-black hover:bg-white"
                >
                  <BookOpen className="w-3.5 h-3.5 text-de-green" />
                  <span>My Courses</span>
                </Link>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-de-warm border border-de-black text-xs font-bold text-de-black">
                  <span className="w-2 h-2 rounded-full bg-de-green animate-pulse" />
                  <span className="max-w-[120px] truncate">{student.name}</span>
                </div>

                <StudentLogoutButton />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-xs font-bold text-de-muted hover:text-de-black mr-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Website</span>
                </Link>
                <Link
                  href="/lms/login"
                  className="px-4 py-1.5 rounded-btn font-heading font-extrabold text-xs bg-white text-de-black border-2 border-de-black shadow-hard-sm hover:bg-de-warm"
                >
                  Log In
                </Link>
                <Link
                  href="/lms/signup"
                  className="px-4 py-1.5 rounded-btn font-heading font-extrabold text-xs bg-de-amber text-de-black border-2 border-de-black shadow-hard-sm hover:bg-de-black hover:text-de-amber"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* LMS Mini Footer */}
      <footer className="py-6 bg-white border-t border-de-border text-center text-xs font-bold text-de-muted">
        <p>
          DigitalExpert Learning Management System &bull; University Chowk, Bahawalpur &bull; Support: 0312-4051296
        </p>
      </footer>
    </div>
  );
}
