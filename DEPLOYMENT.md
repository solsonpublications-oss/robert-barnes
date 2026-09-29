# R. Ray Barnes — The Art of Poetry (Official Website)

Complete, self-contained Next.js 16 website — books, awards, Queen Pin trailer
player, newsletter, and all content. This package is fully independent: host it
anywhere Node.js runs, or deploy it to Vercel/Netlify in minutes.

---

## 1. What's inside

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui
- Prisma (SQLite) powering the newsletter subscriber list
- All 8 published books with real Amazon links and official cover art
- Honors & Awards section (2019 Michigan Regional Emmy, 8th Annual Eclipse Award)
- Queen Pin trailer section, ready to play the author's video
- Light/dark themes, mobile-optimized, SEO metadata + JSON-LD

## 2. Run it on your own computer / server

Requirements: Node.js 20+ (or Bun 1.1+).

```bash
bun install            # or: npm install
bun run db:push        # creates the SQLite database (newsletter)
bun run dev            # development → http://localhost:3000
```

Production:

```bash
bun run build
bun run start          # serves the production build on port 3000
```

## 3. Deploy to Vercel / Netlify (no server needed)

1. Push this folder to a GitHub repository.
2. Import the repo at vercel.com (New Project).
3. Add environment variable `DATABASE_URL=file:../db/custom.db`
   (or swap Prisma's provider to Postgres for a serverless-friendly DB).
4. Deploy. Done.

## 4. Adding the author's media (drop-in, no code changes)

| Item | Where to put the file | Appears |
|------|----------------------|---------|
| Queen Pin trailer | `public/video/queen-pin-trailer.mp4` | Plays in the "official trailer" section |
| Author's logo | `public/images/barnes-logo.jpg` | Navbar + footer brand mark |
| Emmy award photo | `public/images/awards/award-emmy.jpg` | Gold-framed photo in the Emmy award card |
| Eclipse award photo | `public/images/awards/award-eclipse.jpg` | Gold-framed photo in the Eclipse award card |

Drop the file in and refresh the page — in dev **and** production the site
picks it up instantly, no restart and no code change. Each slot shows a
graceful hand-crafted fallback (medallion, butterfly mark, "premiering here"
player) until its file exists, so the site never shows a broken image.
Alternate names are accepted for award photos: `emmy.jpg` / `eclipse.jpg`
inside `public/images/awards/`, or `award-emmy.jpg` / `award-eclipse.jpg`.

## 5. Editing content

All site copy and data lives in `src/lib/poetry-data.ts` (books, awards,
poems, quotes, milestones). Section components live in
`src/components/poetry/`.

## 6. Contact

Newsletter signups are stored in `db/custom.db` (table `Subscriber`).
