import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { deleteLecture } from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  deleteLecture(params.id, admin.email);
  return NextResponse.json({ success: true });
}
