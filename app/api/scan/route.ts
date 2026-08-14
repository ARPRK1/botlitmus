import { NextResponse } from "next/server";
import { scanUrl } from "@/lib/scanner";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let url = "";
  try {
    const body = await req.json();
    url = String(body.url || "").trim();
  } catch {
    return NextResponse.json({ error: "Send JSON { url }" }, { status: 400 });
  }
  if (!url) return NextResponse.json({ error: "url is required" }, { status: 400 });
  if (url.length > 500) return NextResponse.json({ error: "url too long" }, { status: 400 });

  try {
    const report = await scanUrl(url);
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "scan failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
