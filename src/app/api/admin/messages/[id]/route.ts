import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { markMessageRead, deleteMessage } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { read } = await req.json();
  markMessageRead(params.id, read, admin.email);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  deleteMessage(params.id, admin.email);
  return NextResponse.json({ success: true });
}
