"use client";

import { useRouter } from "next/navigation";
import { LogOut, User, Shield } from "lucide-react";

interface AdminHeaderProps {
  user: {
    email: string;
    name: string;
    role: string;
  };
  storageMode?: "disk" | "cloud" | "temporary";
}

export default function AdminHeader({ user, storageMode = "disk" }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-de-border px-6 flex items-center justify-between shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-heading font-extrabold text-sm text-de-black uppercase tracking-wider">
          DigitalExpert Dashboard
        </span>
        <span className="hidden md:inline text-xs px-2.5 py-0.5 rounded-full bg-de-warm border border-de-border font-bold text-de-muted">
          University Chowk, Bahawalpur
        </span>
        {storageMode === "cloud" && (
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-green-100 border border-green-400 font-extrabold text-green-800">
            Cloud Sync Active
          </span>
        )}
        {storageMode === "temporary" && (
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-500 font-extrabold text-amber-900">
            Temporary Mode (Read-Only Hosting)
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* User Badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-de-black text-white flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0)}
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-de-black leading-tight">{user.name}</p>
            <p className="text-[10px] font-extrabold uppercase text-de-green flex items-center gap-1 justify-end">
              <Shield className="w-3 h-3" />
              {user.role}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-btn hover:bg-red-50 text-de-muted hover:text-red-600 transition-colors flex items-center gap-1.5 text-xs font-bold"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}
