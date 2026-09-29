import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";
import { volumes, otherBooks, type Volume, type OtherBook } from "@/lib/poetry-data";

/**
 * Dynamic Open Graph image generator (1200x630) for social link previews
 * (WhatsApp / Facebook / X / LinkedIn / email clients that render OG cards).
 *
 * Control surface:
 *   GET /api/og             -> author card (portrait + series + cover strip)
 *   GET /api/og?book=vol2   -> card for any volume (vol1..vol5)
 *   GET /api/og?book=go-sit -> card for any other book (easy-guide / go-sit / queen-pin / 69-ways)
 *
 * Data-driven: edit src/lib/poetry-data.ts and the previews update automatically.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GOLD = "#d9a44d";
const CREAM = "#f5ece0";
const INK = "#150d1a";
const ROSE = "#c85c7c";

/* ---------- asset helpers (cached at module level) ---------- */

const b64Cache = new Map<string, string>();
function img64(publicPath: string): string {
  const hit = b64Cache.get(publicPath);
  if (hit) return hit;
  const file = readFileSync(path.join(process.cwd(), "public", publicPath));
  const ext = publicPath.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
  const url = `data:${ext};base64,${file.toString("base64")}`;
  b64Cache.set(publicPath, url);
  return url;
}

const fontCache = new Map<string, Buffer>();
function font(name: string): Buffer {
  const hit = fontCache.get(name);
  if (hit) return hit;
  // public/fonts works both in dev and in a standalone build (public/ is copied)
  const buf = readFileSync(path.join(process.cwd(), "public", "fonts", name));
  fontCache.set(name, buf);
  return buf;
}

const FONT_STACK = [
  { name: "Fraunces", data: font("fraunces-700.ttf"), weight: 700 as const, style: "normal" as const },
  { name: "Fraunces", data: font("fraunces-600.ttf"), weight: 600 as const, style: "normal" as const },
  { name: "Fraunces", data: font("fraunces-600italic.ttf"), weight: 600 as const, style: "italic" as const },
  { name: "DejaVu", data: font("dejavu-sans-bold.ttf"), weight: 700 as const, style: "normal" as const },
  { name: "DejaVu", data: font("dejavu-sans.ttf"), weight: 400 as const, style: "normal" as const },
];

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;
}

/**
 * resvg cannot decode the designed vol5.png — swap in a JPEG derivative for
 * OG rendering only (the site itself keeps using vol5.png via next/image).
 */
function ogCover(publicPath: string): string {
  if (publicPath === "/images/vol5.png") return "/images/cover-vol5.jpg";
  return publicPath;
}

/* ---------- decorative glow (satori has no radial-gradient; layered rings) ---------- */

function Glow({
  x,
  y,
  size,
  color,
  rings = 3,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  rings?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        display: "flex",
      }}
    >
      {Array.from({ length: rings }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (size * i) / (rings * 2.6),
            top: (size * i) / (rings * 2.6),
            width: size - (size * i) / rings,
            height: size - (size * i) / rings,
            borderRadius: 9999,
            backgroundColor: color,
            opacity: 0.05 + 0.05 * (rings - i),
            display: "flex",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- default card: the author ---------- */

function AuthorCard() {
  const covers = volumes.map((v) => ogCover(v.cover));
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        backgroundColor: INK,
        padding: 56,
        position: "relative",
      }}
    >
      <Glow x={1050} y={90} size={520} color={GOLD} />
      <Glow x={120} y={560} size={420} color={ROSE} />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 8,
          height: 630,
          backgroundColor: GOLD,
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 52, position: "relative" }}>
        <img
          src={img64("/images/og-portrait.jpg")}
          width={300}
          height={300}
          alt="Portrait of R. Ray Barnes"
          style={{ borderRadius: 24, border: `4px solid ${GOLD}` }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              color: GOLD,
              fontSize: 19,
              fontWeight: 700,
              fontFamily: "DejaVu",
              letterSpacing: 6,
            }}
          >
            EMMY-WINNING AUTHOR · PRODUCER · POET
          </div>
          <div
            style={{
              display: "flex",
              color: CREAM,
              fontSize: 84,
              fontWeight: 600,
              fontFamily: "Fraunces",
              fontStyle: "italic",
              lineHeight: 1.05,
            }}
          >
            The Art of Poetry
          </div>
          <div style={{ display: "flex", color: GOLD, fontSize: 40, fontWeight: 700, fontFamily: "Fraunces" }}>
            R. Ray Barnes
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(245,236,224,0.72)",
              fontSize: 24,
              fontFamily: "DejaVu",
              marginTop: 6,
            }}
          >
            Five volumes, one voice — a life written in verse.
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(245,236,224,0.62)",
              fontSize: 19,
              fontFamily: "DejaVu",
              marginTop: 10,
            }}
          >
            Also — Queen Pin · Go Sit In A Corner And Think · One: An Easy Guide
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(245,236,224,0.42)",
              fontSize: 19,
              fontFamily: "DejaVu",
            }}
          >
            · 69 Ways To Better Relationships, Sex and Love
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 22, alignItems: "flex-end", position: "relative" }}>
        {covers.map((c, i) => (
          <img
            key={i}
            src={img64(c)}
            width={130}
            height={195}
            alt={`The Art of Poetry volume ${i + 1} cover`}
            style={{
              borderRadius: 8,
              border: "1px solid rgba(217,164,77,0.55)",
              boxShadow: "0 18px 32px rgba(0,0,0,0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- per-book card ---------- */

function BookCard({ book }: { book: Volume | OtherBook }) {
  const isVolume = "numeral" in book;
  const kicker = isVolume
    ? `THE ART OF POETRY · VOLUME ${(book as Volume).numeral}`
    : `${(book as OtherBook).category.toUpperCase()}`;
  const hasAmazon = Boolean(book.amazon) && !book.status;
  const pillText = book.status ?? (book.amazon ? "Available on Amazon" : "Forthcoming");
  const desc = truncate(book.description.replace(/\s+/g, " "), 218);

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        backgroundColor: INK,
        padding: 60,
        gap: 64,
        position: "relative",
      }}
    >
      <Glow x={1080} y={560} size={560} color={GOLD} />
      <Glow x={90} y={70} size={380} color={ROSE} />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 8,
          height: 630,
          backgroundColor: GOLD,
          display: "flex",
        }}
      />

      <img
        src={img64(ogCover(book.cover))}
        width={296}
        height={470}
        alt={`Cover of ${book.title}`}
        style={{
          borderRadius: 14,
          border: `3px solid ${GOLD}`,
          boxShadow: "0 26px 48px rgba(0,0,0,0.55)",
          objectFit: "cover",
          marginTop: 20,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 18, paddingTop: 8, position: "relative" }}>
        <div style={{ display: "flex", color: GOLD, fontSize: 20, fontWeight: 700, fontFamily: "DejaVu", letterSpacing: 5 }}>
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            color: CREAM,
            fontSize: isVolume ? 56 : 46,
            fontWeight: 700,
            fontFamily: "Fraunces",
            lineHeight: 1.12,
          }}
        >
          {book.title}
        </div>
        <div style={{ display: "flex", color: GOLD, fontSize: 30, fontFamily: "Fraunces", fontStyle: "italic" }}>
          by R. Ray Barnes
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(245,236,224,0.7)",
            fontSize: 21,
            fontFamily: "DejaVu",
            lineHeight: 1.5,
          }}
        >
          {desc}
        </div>
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: hasAmazon ? GOLD : "transparent",
              border: `2px solid ${GOLD}`,
              color: hasAmazon ? INK : GOLD,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "DejaVu",
              padding: "12px 26px",
              borderRadius: 9999,
            }}
          >
            {pillText}
          </div>
          <div style={{ display: "flex", color: "rgba(245,236,224,0.5)", fontSize: 19, fontFamily: "DejaVu" }}>
            amazon.com/author/rraybarnes
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- route ---------- */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("book");
  const book = slug
    ? volumes.find((v) => v.id === slug) ?? otherBooks.find((b) => b.id === slug)
    : undefined;

  return new ImageResponse(book ? <BookCard book={book} /> : <AuthorCard />, {
    width: 1200,
    height: 630,
    fonts: FONT_STACK,
  });
}
