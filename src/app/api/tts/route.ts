import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cache = new Map<string, Buffer>();

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "jam", speed = 0.9 } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Clamp to API limits
    const cleanText = text.replace(/\s+/g, " ").trim().slice(0, 1020);
    const clampedSpeed = Math.min(2.0, Math.max(0.5, Number(speed) || 0.9));
    const clampedVoice = ["tongtong", "chuichui", "xiaochen", "jam", "kazi", "douji", "luodo"].includes(voice)
      ? voice
      : "jam";

    const cacheKey = `${clampedVoice}:${clampedSpeed}:${cleanText}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return new NextResponse(new Uint8Array(cached), {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Content-Length": cached.length.toString(),
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const response = await zai.audio.tts.create({
      input: cleanText,
      voice: clampedVoice,
      speed: clampedSpeed,
      response_format: "wav",
      stream: false,
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    // Cache small results (avoid memory blowup)
    if (buffer.length < 2_000_000) {
      cache.set(cacheKey, buffer);
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("TTS API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "TTS generation failed" },
      { status: 500 }
    );
  }
}
