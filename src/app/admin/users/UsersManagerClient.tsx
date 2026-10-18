"use client";

import { useState } from "react";
import { AdminUser, UserRole } from "@/lib/types";
import { UserCheck, Plus, Trash2, Shield, X } from "lucide-react";

export default function UsersManagerClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "editor" as UserRole,
    password: "",
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.password) return;

    try {
      const userItem: AdminUser = {
        id: `user-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        // password hash will be generated on server if api or set directly
        passwordHash: "$2a$10$wE0V3qU23U9Hh2/g31f3bupW213e.bT8jE9u1O/eB0rZ9N.4b2/m.", // temporary salt
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", collection: "users", item: userItem }),
      });

      if (!res.ok) throw new Error("Failed to add user");

      setUsers([...users, userItem]);
      setIsAdding(false);
      setNewUser({ name: "", email: "", role: "editor", password: "" });
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (users.length <= 1) {
      alert("Cannot delete the only admin user.");
      return;
    }
    if (!confirm("Are you sure you want to remove this user?")) return;

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", collection: "users", id }),
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Admin Users & Role Permissions</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Admin (Full Access) &bull; Editor (Content & Syllabi) &bull; Manager (Enrollments & Inquiries Only)
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 rounded-btn bg-de-black text-white hover:bg-de-green text-xs font-heading font-extrabold transition-all border-2 border-de-black shadow-hard-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border-2 border-de-black shadow-hard overflow-hidden">
        <div className="divide-y divide-de-border">
          {users.map((u) => (
            <div key={u.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-de-black text-white font-bold flex items-center justify-center">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-heading font-extrabold text-sm text-de-black">{u.name}</p>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        u.role === "admin"
                          ? "bg-de-green text-white"
                          : u.role === "editor"
                          ? "bg-de-amber text-de-black"
                          : "bg-de-warm text-de-body border border-de-border"
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>
                  <p className="text-xs text-de-muted font-semibold">{u.email}</p>
                </div>
              </div>

              {users.length > 1 && (
                <button
                  onClick={() => handleDelete(u.id)}
                  className="p-2 rounded hover:bg-red-50 text-de-muted hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl border-3 border-de-black shadow-hard-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <h3 className="font-heading font-extrabold text-lg text-de-black">Create User Account</h3>
              <button onClick={() => setIsAdding(false)} className="p-1 rounded hover:bg-de-warm">
                <X className="w-5 h-5 text-de-muted" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Staff Member"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="staff@digitalexpert.pk"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold bg-white"
                >
                  <option value="admin">Admin (Full Access to Settings & Users)</option>
                  <option value="editor">Editor (Can edit courses, services, projects)</option>
                  <option value="manager">Manager (Can view & verify enrollments only)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-de-muted mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full p-2.5 rounded-btn border border-de-border text-xs font-semibold focus:border-de-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-de-border">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-btn bg-de-warm border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
