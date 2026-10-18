import { redirect, notFound } from "next/navigation";
import { getCurrentStudent } from "@/lib/studentAuth";
import { getCourseBySlug, getLectures, getStudentAssignments } from "@/lib/db";
import ClassroomClient from "./ClassroomClient";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default async function LMSCourseClassroomPage({ params }: { params: { slug: string } }) {
  const student = await getCurrentStudent();

  if (!student) {
    redirect("/lms/login");
  }

  const course = getCourseBySlug(params.slug);
  if (!course) {
    notFound();
  }

  // STRICT ACCESS CONTROL:
  // "ye bhe bta dena k kon kes class men hi ye nhi ho k ek students multiple clasess ky video bhe dekhta rhy belkul nhi"
  const isEnrolled = student.enrolledCourses.includes(course.slug);

  if (!isEnrolled) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto border-2 border-de-black shadow-hard">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-heading font-extrabold uppercase">
            Access Restricted
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black">
            You are not enrolled in {course.title}
          </h1>
          <p className="text-sm text-de-muted font-semibold leading-relaxed">
            Per DigitalExpert security policy, your account is not authorized to view lectures for this class batch. You are only permitted to view the classes you have enrolled and paid for.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border-2 border-de-black shadow-hard-sm text-xs font-bold text-de-body space-y-1">
          <p>Your Active Enrolled Courses:</p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {student.enrolledCourses.length > 0 ? (
              student.enrolledCourses.map((c) => (
                <Link
                  key={c}
                  href={`/lms/courses/${c}`}
                  className="px-3 py-1 bg-de-warm border border-de-black rounded-lg text-de-black hover:bg-de-green hover:text-white"
                >
                  {c.toUpperCase()} Classroom &rarr;
                </Link>
              ))
            ) : (
              <span className="text-de-muted">No courses approved yet.</span>
            )}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/lms/dashboard"
            className="px-6 py-3 rounded-btn font-heading font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all border-2 border-de-black shadow-hard-sm"
          >
            &larr; Back to Student Dashboard
          </Link>
          <a
            href={`https://wa.me/923124051296?text=${encodeURIComponent(
              `Hi DigitalExpert, I am student ${student.name} (${student.email}). I would like to request enrollment in ${course.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-btn font-heading font-extrabold text-sm bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm"
          >
            Request Access on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // Student is verified and enrolled!
  const lectures = getLectures(course.slug);
  const submissions = getStudentAssignments(student.id, course.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ClassroomClient
        student={student}
        course={course}
        lectures={lectures}
        initialSubmissions={submissions}
      />
    </div>
  );
}
