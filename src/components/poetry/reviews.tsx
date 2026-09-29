"use client";

import { useState } from "react";
import { Star, Mail, ArrowRight, ShoppingBag, BookOpen, BadgeCheck } from "lucide-react";
import { praise, AMAZON_AUTHOR_URL } from "@/lib/poetry-data";
import { BrandLogo } from "./brand-logo";
import { useToast } from "@/hooks/use-toast";

function PraiseCard({ p, i }: { p: (typeof praise)[number]; i: number }) {
  return (
    <figure
      className="reveal group relative flex flex-col rounded-[1.5rem] border border-border/50 bg-card/30 p-8 hover-lift hover:border-primary/40"
      data-delay={i * 100}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-baseline gap-1">
          <span className="font-serif text-4xl text-primary">{p.rating}</span>
          <span className="inline-flex pb-1">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </span>
        </span>
        <BadgeCheck className="h-5 w-5 text-primary/70" aria-hidden />
      </div>
      <h3 className="mt-4 font-serif text-xl italic text-foreground">{p.title}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.detail}</p>
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">
        {p.text}
      </blockquote>
      <figcaption className="mt-6">
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-accent"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Verified on Amazon
        </a>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-primary">kind words</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] font-300 italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            Praise on Amazon
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Real ratings from real readers — every rated title in the collection
            holds a perfect five stars on Amazon.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {praise.map((p, i) => (
            <PraiseCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        setState("sent");
        toast({
          title: "Welcome to the inner circle",
          description: "Letters from the heart will find their way to your inbox.",
        });
        setEmail("");
        setTimeout(() => setState("idle"), 3000);
      } else {
        setState("idle");
        toast({
          title: "Hmm — that didn't go through",
          description: data?.error || "Please check the address and try again.",
        });
      }
    } catch {
      setState("idle");
      toast({
        title: "Connection trouble",
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <section id="connect" className="relative px-5 py-24 sm:py-28">
      <div className="reveal relative mx-auto max-w-3xl rounded-[2rem] border border-accent/25 bg-gradient-to-br from-card/60 to-secondary/30 p-10 text-center backdrop-blur sm:p-14">
        <p className="kicker text-accent">stay connected</p>
        <h2
          className="mt-3 font-serif text-[clamp(2rem,5vw,3.25rem)] font-300 italic text-foreground"
          style={{ fontWeight: 300 }}
        >
          Letters From the Heart
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Occasional notes on poetry, new work, and the quiet art of paying
          attention. No spam, no noise — just verse.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="h-12 w-full rounded-full border border-border bg-background/60 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
            />
          </div>
          <button
            type="submit"
            disabled={state === "sending"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_-6px_var(--glow-gold)] hover:brightness-110 disabled:opacity-60"
          >
            {state === "sending" ? "Subscribing…" : state === "sent" ? "Subscribed" : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          We respect your inbox. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section id="own" className="relative px-5 py-24 sm:py-32">
      <div className="reveal mx-auto max-w-4xl text-center">
        <p className="kicker text-primary">bring the verse home</p>
        <h2
          className="mt-3 font-serif text-[clamp(2.2rem,6vw,4rem)] font-300 italic text-gold-gradient"
          style={{ fontWeight: 300 }}
        >
          Own the Complete Series
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Five volumes. One heart, unfolding — plus Queen Pin and more, all
          available now on Amazon in Kindle and print editions.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={AMAZON_AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_36px_-6px_var(--glow-gold)] hover:brightness-110"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop on Amazon
          </a>
          <button
            onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10"
          >
            <BookOpen className="h-4 w-4" />
            Browse the Collection
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const links = [
    { href: "#about", label: "About the Poet" },
    { href: "#awards", label: "Awards" },
    { href: "#collection", label: "The Collection" },
    { href: "#more-books", label: "Other Books" },
    { href: "#trailer", label: "Trailer" },
    { href: "#reviews", label: "Praise" },
    { href: "#connect", label: "Stay Connected" },
  ];
  const socials = [
    { href: AMAZON_AUTHOR_URL, label: "Amazon Author Page", icon: ShoppingBag },
  ];
  return (
    <footer className="relative mt-auto border-t border-border/50 bg-card/20 px-5 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <BrandLogo className="h-20 w-auto" rounded="rounded-xl" />
          <p className="font-serif text-2xl italic text-foreground">
            R. Ray Barnes
          </p>
          <p className="text-sm text-muted-foreground">Author · Poet · Music Producer · Songwriter</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3">
          <p className="kicker text-accent">Made with love, R. Ray Barnes</p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-wide text-muted-foreground">
            © 2026 R. Ray Barnes Productions · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
