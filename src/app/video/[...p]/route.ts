import { servePublicFile } from "@/lib/serve-public";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ p: string[] }> };

/** Serves /public/video/* files added after server start (see serve-public.ts). */
export async function GET(request: Request, ctx: Ctx) {
  const { p } = await ctx.params;
  return servePublicFile(request, ["video", ...p]);
}
