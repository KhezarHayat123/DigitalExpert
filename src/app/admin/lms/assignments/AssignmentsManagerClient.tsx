"use client";

import { useState } from "react";
import { StudentAssignment } from "@/lib/types";
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  Clock,
  Edit,
  X,
  MessageCircle,
} from "lucide-react";

export default function AssignmentsManagerClient({
  initialAssignments,
}: {
  initialAssignments: StudentAssignment[];
}) {
  const [assignments, setAssignments] = useState<StudentAssignment[]>(initialAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<StudentAssignment | null>(null);
  const [grade, setGrade] = useState("A");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const openGradeModal = (asg: StudentAssignment) => {
    setSelectedAssignment(asg);
    setGrade(asg.grade || "A");
    setFeedback(asg.feedback || "Good job! Live implementation is clean and verified.");
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/lms/assignments/${selectedAssignment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade, feedback }),
      });

      if (res.ok) {
        setAssignments(
          assignments.map((a) =>
            a.id === selectedAssignment.id ? { ...a, grade, feedback } : a
          )
        );
        setSelectedAssignment(null);
      }
    } catch {
      alert("Failed to save grade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-[#DCDCDE] shadow-sm overflow-hidden">
        {assignments.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <FileText className="w-12 h-12 text-[#8C8F94] mx-auto" />
            <h3 className="text-base font-bold text-[#1D2327]">No Homework Submissions Yet</h3>
            <p className="text-xs text-[#646970]">
              When students submit practical projects or links in their LMS video classroom, they will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0F0F1]">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="p-4 hover:bg-[#F9F9F9] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1D2327]">{asg.studentName}</span>
                    <span className="text-xs text-[#646970]">({asg.studentEmail})</span>
                    <span className="px-2 py-0.5 bg-[#F0F0F1] rounded text-[10px] font-bold uppercase text-[#50575E]">
                      {asg.courseSlug}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#2C3338]">
                    Lecture: <strong>{asg.lectureTitle}</strong>
                  </p>

                  {asg.submissionUrl && (
                    <div className="flex items-center gap-1.5 text-xs text-[#2271B1]">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <a
                        href={asg.submissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-bold truncate max-w-md"
                      >
                        {asg.submissionUrl}
                      </a>
                    </div>
                  )}

                  {asg.submissionText && (
                    <p className="text-xs text-[#50575E] bg-[#F6F7F7] p-2 rounded border border-[#E0E0E0] max-w-xl">
                      {asg.submissionText}
                    </p>
                  )}

                  {asg.grade ? (
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Graded: {asg.grade}</span>
                      {asg.feedback && <span>&bull; Feedback: &quot;{asg.feedback}&quot;</span>}
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Clock className="w-3 h-3" />
                      <span>Pending Grade</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openGradeModal(asg)}
                    className="px-3 py-1.5 bg-[#2271B1] hover:bg-[#135E96] text-white rounded font-bold text-xs inline-flex items-center gap-1 shadow-sm transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>{asg.grade ? "Update Grade" : "Grade Submission"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GRADE MODAL */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-[#2C3338] shadow-lg max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCDCDE]">
              <h3 className="text-base font-bold text-[#1D2327]">Grade Student Assignment</h3>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="p-1 text-[#8C8F94] hover:text-[#1D2327]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#1D2327] mb-1">
                  Grade / Evaluation
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F6F7F7] border border-[#8C8F94] rounded text-xs font-bold text-[#2C3338]"
                >
                  <option value="A+">A+ (Exceptional & Complete)</option>
                  <option value="A">A (Passed & Great Quality)</option>
                  <option value="B">B (Satisfactory - Minor Edits Needed)</option>
                  <option value="Needs Revision">Needs Revision (Resubmit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2327] mb-1">
                  Instructor Feedback & Guidance
                </label>
                <textarea
                  rows={3}
                  placeholder="Feedback for the student..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-[#8C8F94] rounded text-xs font-semibold text-[#2C3338]"
                />
              </div>

              <div className="pt-3 border-t border-[#DCDCDE] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-1.5 text-xs font-semibold text-[#50575E] hover:bg-[#F0F0F1] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1.5 text-xs font-bold bg-[#2271B1] hover:bg-[#135E96] text-white rounded shadow-sm"
                >
                  Save & Publish Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
