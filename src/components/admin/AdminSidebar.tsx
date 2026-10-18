"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Users,
  MessageSquare,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  Settings,
  HelpCircle,
  ExternalLink,
  BookOpen,
  UserCog,
  Quote,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  unreadMessagesCount: number;
  newEnrollmentsCount: number;
  pendingStudentsCount?: number;
  userRole?: string;
}

export default function AdminSidebar({
  unreadMessagesCount,
  newEnrollmentsCount,
  pendingStudentsCount = 0,
  userRole = "admin",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isCurrent = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
      name: "Enrollments",
      href: "/admin/enrollments",
      icon: FileCheck2,
      badge: newEnrollmentsCount > 0 ? newEnrollmentsCount : undefined,
      badgeColor: "bg-de-green text-white",
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      badgeColor: "bg-de-amber text-de-black",
    },
    // LMS Sections
    {
      name: "LMS Students",
      href: "/admin/lms/students",
      icon: GraduationCap,
      badge: pendingStudentsCount > 0 ? `${pendingStudentsCount} pending` : undefined,
      badgeColor: "bg-amber-500 text-black font-extrabold",
    },
    { name: "LMS Lectures", href: "/admin/lms/lectures", icon: BookOpen },
    { name: "LMS Assignments", href: "/admin/lms/assignments", icon: FileText },

    // CMS & Content Management
    { name: "Courses", href: "/admin/courses", icon: GraduationCap, editorOnly: true },
    { name: "Services", href: "/admin/services", icon: Briefcase, editorOnly: true },
    { name: "Projects", href: "/admin/projects", icon: FolderGit2, editorOnly: true },
    { name: "Pages (CMS)", href: "/admin/pages", icon: FileText, editorOnly: true },
    { name: "Team Members", href: "/admin/team", icon: Users, editorOnly: true },
    { name: "Testimonials", href: "/admin/testimonials", icon: Quote, editorOnly: true },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle, editorOnly: true },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon, editorOnly: true },
    { name: "Users & Roles", href: "/admin/users", icon: UserCog, adminOnly: true },
    { name: "Settings", href: "/admin/settings", icon: Settings, adminOnly: true },
    { name: "Admin Guide", href: "/admin/guide", icon: BookOpen },
  ];

  const renderNavLinks = () => (
    <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
      <div className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-[#8C8F94]">
        Main Navigation
      </div>

      {navLinks.map((item) => {
        if (item.adminOnly && userRole !== "admin") return null;
        if (item.editorOnly && userRole === "manager") return null;

        const active = isCurrent(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between px-3 py-2.5 rounded text-sm font-semibold transition-all ${
              active
                ? "bg-[#2271B1] text-white font-bold shadow-sm"
                : "text-[#C3C4C7] hover:bg-[#2C3338] hover:text-[#72AEE6]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#8C8F94]"}`} />
              <span>{item.name}</span>
            </div>
            {item.badge !== undefined && (
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Top Bar (Visible on mobile only) */}
      <div className="md:hidden bg-[#101517] border-b border-[#2C3338] p-3.5 flex items-center justify-between sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative h-7 w-28">
            <Image
              src="/brand/digital-expert-logo-white.png"
              alt="DigitalExpert Admin"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-white/80 hover:text-white px-2 py-1 bg-white/10 rounded"
          >
            Website &rarr;
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded bg-[#2C3338] text-white hover:bg-[#2271B1] transition-colors"
            aria-label="Toggle admin menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Visible on mobile when toggled) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex">
          <div className="w-72 bg-[#1D2327] text-[#C3C4C7] flex flex-col h-full border-r border-[#2C3338] pt-16">
            <div className="p-3 bg-[#191F23] border-b border-[#2C3338] flex items-center justify-between">
              <span className="text-xs font-bold text-white">Navigation Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-xs text-[#8C8F94] hover:text-white"
              >
                Close &times;
              </button>
            </div>
            {renderNavLinks()}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop Persistent Sidebar (md and above) */}
      <aside className="hidden md:flex md:w-64 bg-[#1D2327] text-[#C3C4C7] flex-col shrink-0 min-h-screen border-r border-[#2C3338] select-none">
        {/* WordPress-style Top Bar */}
        <div className="p-4 bg-[#101517] border-b border-[#2C3338] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative h-8 w-32">
              <Image
                src="/brand/digital-expert-logo-white.png"
                alt="DigitalExpert Admin"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        {/* View Website Link */}
        <div className="p-3 bg-[#191F23] border-b border-[#2C3338]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded text-xs font-bold text-white hover:bg-[#2271B1] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>🌐 View Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70" />
          </Link>
        </div>

        {renderNavLinks()}

        {/* Footer Info */}
        <div className="p-3 bg-[#101517] border-t border-[#2C3338] text-[11px] text-[#8C8F94] text-center">
          DigitalExpert Admin &bull; v2.0
        </div>
      </aside>
    </>
  );
}
