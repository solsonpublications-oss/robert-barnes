import { NextResponse } from "next/server";
import { existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Single always-200 endpoint that tells the client which drop-in media files
 * exist on disk. Requesting missing files from the browser would log a 404 in
 * the console for every probe; this way the site checks silently and only
 * loads media that actually exists. Self-healing stays intact: drop a file in
 * at the documented path and it appears on the next page load, no code change.
 *
 * If no public/ directory can be seen from the server (e.g. serverless hosts
 * where static files live on a CDN instead), the route says ok:false and the
 * client falls back to its own HEAD probes.
 */

const CANDIDATES: Record<string, string[]> = {
  logo: ["/images/barnes-logo.jpg"],
  trailer: ["/video/queen-pin-trailer.mp4"],
  awardEmmy: [
    "/images/awards/award-emmy.jpg",
    "/images/awards/emmy.jpg",
    "/images/award-emmy.jpg",
  ],
  awardEclipse: [
    "/images/awards/award-eclipse.jpg",
    "/images/awards/eclipse.jpg",
    "/images/award-eclipse.jpg",
  ],
};

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  if (!existsSync(publicDir)) {
    return NextResponse.json({ ok: false, media: null });
  }

  const media: Record<string, string | null> = {};
  for (const [key, candidates] of Object.entries(CANDIDATES)) {
    media[key] = candidates.find((rel) => existsSync(path.join(publicDir, rel))) ?? null;
  }

  return NextResponse.json({ ok: true, media });
}
