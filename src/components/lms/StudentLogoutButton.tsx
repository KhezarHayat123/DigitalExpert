"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function StudentLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/lms/auth/logout", { method: "POST" });
      router.push("/lms/login");
      router.refresh();
    } catch {
      router.push("/lms/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="p-1.5 rounded-btn bg-white border border-de-border text-de-muted hover:text-red-500 hover:border-red-500 transition-colors"
      title="Log out of LMS"
      aria-label="Log Out"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
