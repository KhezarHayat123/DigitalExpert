import { NextResponse } from "next/server";
import { getMediaBinaryById } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const found = await getMediaBinaryById(params.id);
  if (!found) {
    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }

  if (found.url.startsWith("data:")) {
    const match = found.url.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ error: "Invalid media format" }, { status: 400 });
    }
    const contentType = match[1] || found.mimeType || "image/jpeg";
    const buffer = Buffer.from(match[2], "base64");
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  if (found.url.startsWith("/") || found.url.startsWith("http")) {
    return NextResponse.redirect(new URL(found.url, req.url), { status: 302 });
  }

  return NextResponse.json({ error: "Unsupported media URL" }, { status: 400 });
}
