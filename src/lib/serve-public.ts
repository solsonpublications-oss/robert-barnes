import { NextResponse } from "next/server";
import { stat, readFile } from "fs/promises";
import path from "path";

/**
 * Streams a file from /public at request time. Next's static handler snapshots
 * the public/ file list at server start, so media dropped in AFTER a
 * production start would 404 — these route handlers make "drop in → refresh"
 * work with no restart, in every mode (dev, next start, self-hosted Node).
 * Public files only reach this handler when the static layer missed them, so
 * this is strictly a fallback that returns the same bytes.
 */

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".m4v": "video/x-m4v",
};

export async function servePublicFile(
  request: Request,
  segments: string[]
): Promise<NextResponse> {
  const rel = "/" + segments.map((s) => decodeURIComponent(s)).join("/");
  const publicRoot = path.normalize(path.join(process.cwd(), "public"));
  const full = path.normalize(path.join(publicRoot, rel));

  // never serve anything outside /public (path traversal guard)
  if (!full.startsWith(publicRoot + path.sep)) {
    return new NextResponse(null, { status: 403 });
  }

  let info;
  try {
    info = await stat(full);
  } catch {
    return new NextResponse(null, { status: 404 });
  }
  if (!info.isFile()) return new NextResponse(null, { status: 404 });

  const type = MIME[path.extname(full).toLowerCase()];
  if (!type) return new NextResponse(null, { status: 415 });

  const range = request.headers.get("range");
  // Range support (needed for <video> seeking)
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    if (m) {
      const start = m[1] ? parseInt(m[1], 10) : 0;
      const end = m[2] ? Math.min(parseInt(m[2], 10), info.size - 1) : info.size - 1;
      if (start <= end && start < info.size) {
        const buf = await readFile(full);
        const chunk = buf.subarray(start, end + 1);
        return new NextResponse(new Uint8Array(chunk), {
          status: 206,
          headers: {
            "Content-Type": type,
            "Content-Length": String(chunk.byteLength),
            "Content-Range": `bytes ${start}-${end}/${info.size}`,
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${info.size}` },
      });
    }
  }

  const buf = await readFile(full);
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": type,
      "Content-Length": String(info.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
