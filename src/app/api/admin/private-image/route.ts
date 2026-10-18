import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCurrentAdmin } from "@/lib/auth";
import { getPrivateUploadsPath } from "@/lib/db";

export async function GET(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access to private files." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "File name is required." }, { status: 400 });
  }

  // Prevent directory traversal attacks
  const safeName = path.basename(file);
  const privateDir = getPrivateUploadsPath();
  const filePath = path.join(privateDir, safeName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  let contentType = "application/octet-stream";
  if (ext === ".png") contentType = "image/png";
  else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
  else if (ext === ".webp") contentType = "image/webp";
  else if (ext === ".pdf") contentType = "application/pdf";

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
    },
  });
}
