import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Deterministic-by-day cache so every visitor on the same day sees the same poem.
let cachedPoem: { date: string; text: string; title: string } | null = null;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const SYSTEM_PROMPT =
  "You are R. Ray Barnes, an American poet writing in the tradition of love, faith, jazz, family, grace, and longing. Your style is soft, plainspoken, and tender — moving between the sacred and the everyday. You write short free-verse poems (4–8 lines) with lowercase openings, simple imagery, and an emotional turn near the end. You always write in the voice of the poet himself.";

const THEMES = [
  "love arriving in an ordinary moment",
  "the quiet faith of a Sunday morning",
  "jazz as a form of prayer",
  "a butterfly and the courage to change",
  "longing measured in kitchen light",
  "grace finding you unprepared",
  "the weight of a hand on a shoulder",
  "a memory that insists on being felt",
  "the sea and waiting for the moon",
  "love as a foundation that lasts forever",
  "the first poem scribbled on a napkin",
  "evening footsteps coming home",
];

export async function POST(req: NextRequest) {
  try {
    const today = todayKey();
    if (cachedPoem && cachedPoem.date === today) {
      return NextResponse.json({
        date: cachedPoem.date,
        title: cachedPoem.title,
        text: cachedPoem.text,
        cached: true,
      });
    }

    const body = await req.json().catch(() => ({}));
    const themeOverride =
      typeof body?.theme === "string" && body.theme.trim().length > 0
        ? body.theme.trim().slice(0, 120)
        : null;
    const theme =
      themeOverride ||
      THEMES[Math.floor(Math.random() * THEMES.length)];

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Write an original short poem (4 to 8 lines) about: ${theme}.\n\nReturn your answer as STRICT JSON with this exact shape and nothing else:\n{"title":"a short 2-5 word title","lines":["line one","line two","line three","line four"]}\n\nDo not include any prose, markdown, or code fences. Only the JSON object.`,
        },
      ],
      thinking: { type: "disabled" },
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    let parsed: { title?: string; lines?: string[] } = {};
    try {
      // Tolerate code fences / surrounding text
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(match ? match[0] : raw);
    } catch {
      parsed = {};
    }

    const lines = Array.isArray(parsed.lines)
      ? parsed.lines.map((l) => String(l)).filter(Boolean).slice(0, 10)
      : [];
    const title =
      typeof parsed.title === "string" && parsed.title.trim()
        ? parsed.title.trim()
        : "Untitled";

    if (lines.length === 0) {
      return NextResponse.json(
        { error: "Could not compose a poem, please try again." },
        { status: 500 }
      );
    }

    cachedPoem = { date: today, title, text: lines.join("\n") };

    return NextResponse.json({
      date: today,
      title,
      text: cachedPoem.text,
      theme,
      cached: false,
    });
  } catch (error) {
    console.error("Poem API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Poem generation failed",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST(new NextRequest("http://localhost/api/poem", { method: "POST" }));
}
