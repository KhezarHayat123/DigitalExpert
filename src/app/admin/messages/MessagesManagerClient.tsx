"use client";

import { useState } from "react";
import { ContactMessage } from "@/lib/types";
import { MessageSquare, Phone, Mail, Trash2, CheckCircle2, Clock, Search } from "lucide-react";

export default function MessagesManagerClient({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = messages.filter((m) => {
    const matchesFilter =
      filterRead === "all" ? true : filterRead === "unread" ? !m.read : m.read;
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.interestedIn.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
      );
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-de-black">Contact Enquiries & Messages</h2>
          <p className="text-xs text-de-muted font-semibold mt-0.5">
            Website inquiries submitted via the Contact Us form. Reply directly on WhatsApp or Email.
          </p>
        </div>

        {/* Read Filter Buttons */}
        <div className="flex items-center gap-2">
          {(["all", "unread", "read"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterRead(mode)}
              className={`px-3.5 py-1.5 rounded-btn text-xs font-heading font-extrabold capitalize transition-all border-2 ${
                filterRead === mode
                  ? "bg-de-black text-white border-de-black shadow-hard-sm"
                  : "bg-white text-de-body border-de-border hover:border-de-black"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search messages by name, phone, or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 pl-9 rounded-btn border-2 border-de-black bg-white text-xs font-semibold focus:outline-none shadow-hard-sm"
        />
        <Search className="w-4 h-4 text-de-muted absolute left-3 top-3" />
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border-2 border-de-black text-center text-de-muted font-bold text-sm">
            No messages match your search criteria.
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border-2 border-de-black transition-all ${
                !msg.read
                  ? "bg-white shadow-hard border-l-8 border-l-de-amber"
                  : "bg-de-warm/70 shadow-hard-sm"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-extrabold text-base text-de-black">{msg.name}</h3>
                    {!msg.read && (
                      <span className="text-[10px] font-extrabold bg-de-amber text-de-black px-2 py-0.5 rounded-full border border-de-black">
                        New / Unread
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-extrabold text-de-green">{msg.interestedIn}</p>
                  <p className="text-xs text-de-muted font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT
                  </p>
                </div>

                {/* Reply Buttons & Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* WhatsApp Reply */}
                  <a
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${msg.name}, thank you for reaching out to DigitalExpert regarding ${msg.interestedIn}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-btn bg-[#25D366] text-white hover:bg-black text-xs font-bold transition-all border border-de-black shadow-sm flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>Reply on WhatsApp ({msg.phone})</span>
                  </a>

                  {/* Email Reply */}
                  {msg.email && (
                    <a
                      href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Enquiry about ${msg.interestedIn} - DigitalExpert`)}`}
                      className="px-3 py-1.5 rounded-btn bg-white text-de-black hover:bg-de-warm text-xs font-bold transition-all border border-de-border shadow-sm flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-de-green" />
                      <span>Reply by Email</span>
                    </a>
                  )}

                  {/* Mark as Read / Unread */}
                  <button
                    onClick={() => toggleRead(msg.id, msg.read)}
                    className="px-3 py-1.5 rounded-btn bg-de-warm hover:bg-white text-xs font-bold text-de-body transition-all border border-de-border"
                  >
                    {msg.read ? "Mark Unread" : "Mark Read"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-btn hover:bg-red-50 text-de-muted hover:text-red-600 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="mt-4 p-4 rounded-xl bg-white border border-de-border text-sm text-de-body font-semibold whitespace-pre-line leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
