import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      email?: unknown;
    } | null;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Upsert keeps the endpoint idempotent — re-subscribing never errors.
    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source: "website" },
    });

    return NextResponse.json({ ok: true, id: subscriber.id });
  } catch (err) {
    console.error("[subscribe] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
