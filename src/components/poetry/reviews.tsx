"use client";

import { useState } from "react";
import { Star, Copy, Check, Mail, ArrowRight, Instagram, Facebook, Twitter, ShoppingBag, BookOpen } from "lucide-react";
import { reviews } from "@/lib/poetry-data";
import { ButterflyMark } from "./particles";
import { ConfettiBurst } from "./confetti";
import { VisitorCounter } from "./visitor-counter";
import { LoadChime } from "./load-chime";
import { HighContrastToggle } from "./high-contrast";
import { useToast } from "@/hooks/use-toast";

function ReviewCard({ r, i }: { r: (typeof reviews)[number]; i: number }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`"${r.text}" — ${r.name}, ${r.role}`);
    } catch {
      /* ignore */
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <figure
      className="reveal group relative flex flex-col rounded-[1.5rem] border border-border/50 bg-card/30 p-8 hover-lift hover:border-primary/40"
      data-delay={i * 100}
    >
      <span className="font-serif text-6xl italic leading-none text-primary/30">
        &ldquo;
      </span>
      <blockquote className="-mt-4 flex-1 text-lg leading-relaxed text-foreground/90">
        {r.text}
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-serif text-lg italic text-primary">{r.name}</p>
          <p className="text-xs tracking-wide text-muted-foreground">{r.role}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
          </span>
          <button
            onClick={copy}
            aria-label={`Share review from ${r.name}`}
            className="grid h-8 w-8 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-14 flex flex-col items-center gap-3 text-center">
          <p className="kicker text-lg text-primary">kind words</p>
          <h2
            className="font-serif text-[clamp(2.2rem,5.5vw,3.75rem)] font-300 italic text-foreground"
            style={{ fontWeight: 300 }}
          >
            What Readers Are Saying
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <ReviewCard key={r.id} r={r} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const { toast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setConfettiTrigger((t) => t + 1);
    toast({
      title: "Welcome to the inner circle",
      description: "Letters from the heart will find their way to your inbox.",
    });
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="connect" className="relative px-5 py-24 sm:py-28">
      <div className="reveal relative mx-auto max-w-3xl rounded-[2rem] border border-accent/25 bg-gradient-to-br from-card/60 to-secondary/30 p-10 text-center backdrop-blur sm:p-14">
        <ConfettiBurst trigger={confettiTrigger} />
        <p className="kicker text-lg text-accent">stay connected</p>
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
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_-6px_var(--glow-gold)] hover:brightness-110"
          >
            {sent ? "Subscribed" : "Subscribe"}
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
        <p className="kicker text-lg text-primary">bring the verse home</p>
        <h2
          className="mt-3 font-serif text-[clamp(2.2rem,6vw,4rem)] font-300 italic text-gold-gradient"
          style={{ fontWeight: 300 }}
        >
          Own the Complete Series
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Four volumes. One heart, unfolding. Available now on Amazon in Kindle
          and Paperback editions.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.amazon.com/stores/R.-Ray-Barnes/author/B0D5F8H3QK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_36px_-6px_var(--glow-gold)] hover:brightness-110"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop on Amazon
          </a>
          <a
            href="https://www.amazon.com/stores/R.-Ray-Barnes/author/B0D5F8H3QK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10"
          >
            <BookOpen className="h-4 w-4" />
            All Books &amp; Works
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const links = [
    { href: "#about", label: "About the Poet" },
    { href: "#collection", label: "The Collection" },
    { href: "#themes", label: "Poetic Themes" },
    { href: "#reviews", label: "Reader Reviews" },
    { href: "#connect", label: "Stay Connected" },
  ];
  const socials = [
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
    { href: "https://facebook.com", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com", label: "X (Twitter)", icon: Twitter },
    { href: "https://www.amazon.com/stores/R.-Ray-Barnes/author/B0D5F8H3QK", label: "Amazon Author Page", icon: ShoppingBag },
  ];
  return (
    <footer className="relative mt-auto border-t border-border/50 bg-card/20 px-5 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary">
            <ButterflyMark className="h-9 w-12" />
          </span>
          <p className="font-serif text-2xl italic text-foreground">
            The Art of Poetry
          </p>
          <p className="text-sm text-muted-foreground">By R. Ray Barnes</p>
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

        <div className="flex flex-col items-center gap-1">
          <p className="kicker text-lg text-accent">with love, R. Ray Barnes</p>
          <p className="text-xs tracking-wide text-muted-foreground">
            © 2026 R. Ray Barnes Productions · The Art of Poetry
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <VisitorCounter />
            <LoadChime />
            <HighContrastToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
