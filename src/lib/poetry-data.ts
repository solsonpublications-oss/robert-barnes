export type Volume = {
  id: string;
  numeral: string;
  title: string;
  year: string;
  cover: string;
  rating: number;
  pages: number;
  description: string;
  /** Real Amazon detail-page ASIN link — omitted when the volume is forthcoming. */
  amazon?: string;
  /** Formats available on Amazon, e.g. "Kindle · Hardcover · Paperback". */
  formats?: string;
};

export const volumes: Volume[] = [
  {
    id: "vol1",
    numeral: "I",
    title: "Thoughts Dancing From Heart To Mind",
    year: "2014",
    cover: "/images/covers/vol1.jpg",
    rating: 5.0,
    pages: 134,
    description:
      "A soulful collection that explores the depth of human emotions, love, spirituality, and self-reflection. Every poem flows like a conversation between the heart and mind.",
    amazon: "https://www.amazon.com/dp/B0HC4RTW3V",
    formats: "Kindle · Hardcover · Paperback",
  },
  {
    id: "vol2",
    numeral: "II",
    title: "Butterfly Thoughts",
    year: "2016",
    cover: "/images/covers/vol2.jpg",
    rating: 5.0,
    pages: 121,
    description:
      "Ideas float off the page like butterflies. A spirit of love, peace, and joy accompanied by powerful poetic images of pain, courage, passion, and triumph.",
    amazon: "https://www.amazon.com/dp/B0HC4L7T6Q",
    formats: "Kindle · Hardcover · Paperback",
  },
  {
    id: "vol3",
    numeral: "III",
    title: "Thoughts From The Heart",
    year: "2018",
    cover: "/images/covers/vol3.jpg",
    rating: 5.0,
    pages: 110,
    description:
      "When you inner-connect spiritually with that special someone, the energy created gives birth to a oneness that transforms you — a manifestation of love greater than either could be alone.",
    amazon: "https://www.amazon.com/dp/B0HC4SJTYF",
    formats: "Kindle · Hardcover · Paperback",
  },
  {
    id: "vol4",
    numeral: "IV",
    title: "Love, Life, The Creator & Me",
    year: "2020",
    cover: "/images/covers/vol4.jpg",
    rating: 5.0,
    pages: 137,
    description:
      "The widest lens — faith, gratitude, and a life measured in grace rather than time. Love becomes the most important occurrence, mirroring the first love the Creator had for humankind.",
    amazon: "https://www.amazon.com/dp/B0HC4PL286",
    formats: "Kindle · Hardcover · Paperback",
  },
];

/** Canonical Amazon author page — every book by R. Ray Barnes lives here. */
export const AMAZON_AUTHOR_URL = "https://www.amazon.com/stores/author/B00QJ4O3CW";

export type Award = {
  id: string;
  /** Which medallion artwork to render. */
  medal: "emmy" | "eclipse";
  /** Short label engraved on the medallion face. */
  short: string;
  /** Year engraved under the medallion label, when applicable. */
  year?: string;
  title: string;
  subtitle: string;
  text: string;
  /**
   * Candidate paths for the real award photograph (the author sent
   * award-emmy.jpg / award-eclipse.jpg). The site probes them in order and
   * the first file that exists is shown inside a gold frame — drop the file
   * in with ANY of these names and it appears instantly, no code changes.
   */
  photoCandidates: string[];
};

/** Verifiable honors drawn from the author's own press materials ("Spotlight on Ray"). */
export const awards: Award[] = [
  {
    id: "emmy",
    medal: "emmy",
    short: "EMMY",
    year: "2019",
    title: "Michigan Regional Emmy Award",
    subtitle: "Winner · 2019",
    text:
      "Presented by the National Academy of Television Arts & Sciences, Michigan Chapter, for Interview/Discussion — Left Behind in Vietnam. Produced by R. Ray Barnes with iMichigan Productions and Peaceful Warriors Foundation.",
    photoCandidates: [
      "/images/awards/award-emmy.jpg",
      "/images/award-emmy.jpg",
    ],
  },
  {
    id: "eclipse",
    medal: "eclipse",
    short: "ECLIPSE",
    title: "36th Annual Eclipse Award",
    subtitle: "Winner",
    text:
      "Presented to R. Ray Barnes for Outstanding Television or Cable Program, honoring distinguished creative work across screen, song, and the written word.",
    photoCandidates: [
      "/images/awards/award-eclipse.jpg",
      "/images/award-eclipse.jpg",
    ],
  },
];

/** Real collaborations from the author's 35+ years as a music producer & songwriter. */
export const collaborators: string[] = [
  "Stevie Wonder",
  "Mary Wilson of the Supremes",
  "James Ingram",
  "Tony Coleman",
  "The Pointer Sisters",
];

/** Where the author's Queen Pin trailer lives (drop the mp4 in /public/video). */
export const QUEEN_PIN_TRAILER_SRC = "/video/queen-pin-trailer.mp4";

export type Milestone = {
  year: string;
  title: string;
  text: string;
};

export type OtherBook = {
  id: string;
  title: string;
  category: string;
  cover: string;
  description: string;
  /** Real Amazon detail-page ASIN link — omitted when the book is forthcoming. */
  amazon?: string;
  status?: string;
  /** Formats available on Amazon. */
  formats?: string;
};

export const otherBooks: OtherBook[] = [
  {
    id: "easy-guide",
    title: "One: An Easy Guide To Understanding: God, Spirit & Love",
    category: "Spiritual Companion",
    cover: "/images/covers/easy-guide.jpg",
    amazon: "https://www.amazon.com/dp/B0BSCL83DL",
    formats: "Kindle · Paperback",
    status: "Available now",
    description:
      "A plain-spoken companion for the seeker — a gentle, accessible path through the nature of God, the quiet power of Spirit, and the many shapes of Love. Written for anyone who has ever wanted the sacred made simple.",
  },
  {
    id: "go-sit",
    title: "Go Sit In A Corner And Think",
    category: "Reflections",
    cover: "/images/covers/go-sit.jpg",
    amazon: "https://www.amazon.com/dp/B0BQZ4X3NS",
    formats: "Kindle · Paperback",
    status: "Available now",
    description:
      "An invitation to pause. A collection of meditations, sometimes loud, and sometimes quiet provocations that ask the reader to sit with themselves — in the corner of a room, in thought about the lives of Negros, Colored People, Blacks and African Americans as they delt with the transitions in identity from one to the other— He explores various narratives, from what he labels as Go Sit In these different corners And Think. There is “The Peoples Corner,” dealing with life in general; “The Street Corner,” tackling issues from the street side of Black life; “The Love Corner,” rather speaks for itself; “The Righteous Corner,” commenting on, and exploring religion, the church and faith; and finally, “The Ladies Corner,” poems from a female perspective.",
  },
  {
    id: "69-ways",
    title: "69 Ways To Better Relationships, Sex and Love",
    category: "Relationships",
    cover: "/images/covers/69-ways.jpg",
    amazon: "https://www.amazon.com/dp/B00G641NOQ",
    formats: "Kindle · Paperback",
    status: "Available now",
    description:
      "Sixty-nine candid, warm-hearted ways to deepen connection — with 43 poems, photographs, and a few laughs along the way. Written with Roberto Casanova & Julie Lovelace, featuring photography by LaSalle Barnes. The same voice that writes of love in verse, turned toward the everyday art of loving well.",
  },
  {
    id: "queen-pin",
    title: "Queen Pin: The Story of Yvonne Barnes & The Motown Records Bowlerettes",
    category: "Biography",
    cover: "/images/covers/queen-pin.jpg",
    amazon: "https://www.amazon.com/dp/B0BJQMCLZV",
    formats: "Kindle · Audiobook · Paperback",
    status: "Available now",
    description:
      "The true story of Yvonne Barnes — the author’s mother — and the Motown Records Bowlerettes, the all-female team that won first place in the highest-scoring all-white league in the United States and built the largest youth bowling league in the nation while fighting prevailing racial inequities. A tribute to a woman once called the \u201cRosa Parks of bowling,\u201d and to an era that moved to its own rhythm. Available now on Amazon in Kindle, Audiobook, and Paperback.",
  },
];

export const journey: Milestone[] = [
  {
    year: "2008",
    title: "The First Poem",
    text: "A love letter scribbled on the back of a napkin becomes the seed of something much larger — the very first poem that would one day fill four volumes.",
  },
  {
    year: "2009",
    title: "Jazz & Ink",
    text: "The sounds of Coltrane and Miles begin weaving their way into verse. A collection of jazz poems takes shape, blurring the line between music and poetry.",
  },
  {
    year: "2012",
    title: "The Butterfly Is Born",
    text: "What began as a metaphor for transformation becomes the central image of the work — fragile, beautiful, forever becoming.",
  },
  {
    year: "2014",
    title: "Thoughts Dancing From Heart To Mind",
    text: "The first volume is completed. Love poems written over six years are gathered into a single, coherent voice.",
  },
  {
    year: "2016",
    title: "Butterfly Thoughts",
    text: "Transformation and longing take center stage. The second volume deepens the exploration of change, beauty, and letting go.",
  },
  {
    year: "2018",
    title: "Thoughts From The Heart",
    text: "Devotion goes deeper. The third volume strips away pretense to explore the raw, patient, deep-sea quality of waiting and being known.",
  },
  {
    year: "2020",
    title: "Love, Life, The Creator & Me",
    text: "The fourth and final volume widens the lens from romance to everything: faith, family, gratitude, and grace measured not in years but in grace.",
  },
  {
    year: "2022",
    title: "The Art of Poetry",
    text: "Four volumes become one unified work. The complete series is gathered into a single, coherent voice — a love letter told in four parts.",
  },
  {
    year: "2024",
    title: "Reaching Further",
    text: "New poems are written. Readings, interviews, and a growing community of readers who find their own stories in the verse.",
  },
  {
    year: "∞",
    title: "The Verse Continues",
    text: "There is no final poem. Every ordinary moment holds the seed of the next extraordinary line.",
  },
];

export type Pillar = {
  title: string;
  text: string;
  icon: string;
};

export const pillars: Pillar[] = [
  { title: "Love", text: "The kind that writes itself in the margins of every day", icon: "heart" },
  { title: "Faith", text: "A quiet trust that the music will find its way back", icon: "dove" },
  { title: "Jazz", text: "Improvisation as a form of devotion, rhythm as prayer", icon: "music" },
  { title: "Family", text: "The people who gave him both the words and the silence", icon: "users" },
  { title: "Grace", text: "Arriving unannounced in kitchen light and ordinary moments", icon: "sparkles" },
  { title: "Longing", text: "The beautiful ache that keeps the pen moving", icon: "moon" },
];

export type Poem = {
  id: string;
  source: string;
  lines: string[];
  attribution: string;
};

export const poems: Poem[] = [
  {
    id: "all-that-jazz",
    source: "FROM ALL THAT JAZZ (VOL. I)",
    lines: [
      "Jazz is Hot…",
      "Like sunlight, its energy is always aglow…",
      "as its Rhythms move through you",
      "like a hot lava flow…",
    ],
    attribution: "— All That Jazz",
  },
  {
    id: "god-speak",
    source: "FROM GOD SPEAK (VOL. III)",
    lines: [
      "It is in silence",
      "that God speaks the loudest…",
      "and",
      "She even sometimes sings!",
    ],
    attribution: "— God Speak",
  },
  {
    id: "on-the-inside",
    source: "FROM ON THE INSIDE (VOL. IV)",
    lines: [
      "when you tire",
      "of living with-out,",
      "go with-in",
      "and live life in abundance",
      "without limitation…",
      "on the Inside.",
    ],
    attribution: "— On The Inside",
  },
];

export type Quote = {
  text: string;
  source: string;
};

export const quotes: Quote[] = [
  {
    text: "If you Free the Love you have Within, you’ll never be Without Love.",
    source: "— Volume I — Thoughts Dancing From Heart To Mind",
  },
  {
    text: "Where there is only a little understanding, There can only be a little love.",
    source: "— Volume II — Butterfly Thoughts",
  },
  {
    text: "It is in silence that God speaks the loudest… and She even sometimes sings!",
    source: "— Volume III — Thoughts From The Heart",
  },
  {
    text: "True love has no hiding place…",
    source: "— Volume IV — Love, Life, The Creator & Me",
  },
];

export type VerseMoment = {
  lines: string[];
  source: string;
};

export const verseMoments: VerseMoment[] = [
  {
    lines: [
      "So don’t hope to",
      "fall in-to love,",
      "hope to be-come love…",
      "Then Love will",
      "fall out-of you,",
      "in abundance—",
    ],
    source: "— from Volume I: Love Is Always & Forever",
  },
  {
    lines: [
      "as i am indeed",
      "Falling, Falling...",
      "Free Falling",
      "in Love with you",
    ],
    source: "— from Volume II: Free Falling",
  },
  {
    lines: [
      "The faster you move towards",
      "the Light",
      "The faster",
      "the Light",
      "moves towards you",
    ],
    source: "— from Volume III: Lightspeed…",
  },
  {
    lines: [
      "when you tire",
      "of",
      "living with-out,",
      "go with-in",
      "and",
      "live life in abundance",
      "without limitation…",
      "on the",
      "Inside.",
    ],
    source: "— from Volume IV: On The Inside",
  },
];

export type Praise = {
  id: string;
  title: string;
  rating: string;
  detail: string;
  text: string;
  href: string;
};

/**
 * Real, verifiable Amazon facts only — every rated title on the author's
 * Amazon store holds a perfect 5.0-star average.
 */
export const praise: Praise[] = [
  {
    id: "p-collection",
    title: "A Five-Star Collection",
    rating: "5.0",
    detail: "Every rated title on Amazon",
    text:
      "From Volume I through Queen Pin, every rated book on R. Ray Barnes' Amazon author page holds a perfect five-star average — a rare, unbroken mark of reader love.",
    href: AMAZON_AUTHOR_URL,
  },
  {
    id: "p-queen-pin",
    title: "Queen Pin",
    rating: "5.0",
    detail: "Rated by Amazon readers",
    text:
      "The true story of Yvonne Barnes and the Motown Records Bowlerettes — the woman called the “Rosa Parks of bowling” — strikes the same five-star chord with readers.",
    href: "https://www.amazon.com/dp/B0BJQMCLZV",
  },
  {
    id: "p-series",
    title: "The Art of Poetry, Vols I–IV",
    rating: "5.0",
    detail: "Kindle · Hardcover · Paperback",
    text:
      "Each published volume carries a perfect five stars from Amazon readers, in every edition — verse that meets you where you are and stays with you.",
    href: "https://www.amazon.com/dp/B0HC4RTW3V",
  },
];

export const stats = [
  { value: 4, label: "VOLUMES", suffix: "" },
  { value: 350, label: "POEMS", suffix: "+" },
  { value: 18, label: "YEARS WRITING", suffix: "+" },
  { value: Infinity, label: "LOVE", suffix: "" },
];

export const processSteps = [
  {
    title: "The Spark",
    text: "Every poem begins with a moment — a conversation overheard, a sunset that won't let go, a memory that insists on being felt.",
  },
  {
    title: "The Craft",
    text: "Words are shaped by rhythm. Each line is tested against silence. If it sings, it stays. If it doesn't, it waits.",
  },
  {
    title: "The Gift",
    text: "The finished poem is not mine. It belongs to whoever reads it and finds their own story between the lines.",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#awards", label: "Awards" },
  { href: "#journey", label: "Journey" },
  { href: "#collection", label: "Volumes" },
  { href: "#verses", label: "Verses" },
  { href: "#themes", label: "Themes" },
  { href: "#more-books", label: "More Books" },
  { href: "#reviews", label: "Reviews" },
  { href: "#connect", label: "Connect" },
];
