export const AMAZON_AUTHOR_URL = "https://www.amazon.com/stores/author/B00QJ4O3CW";

export type Volume = {
  id: string;
  numeral: string;
  title: string;
  year: string;
  cover: string;
  rating: number;
  pages: number;
  description: string;
  amazon: string;
  status?: string;
  formats?: string[];
};

export const volumes: Volume[] = [
  {
    id: "vol1",
    numeral: "I",
    title: "Thoughts Dancing From Heart To Mind",
    year: "2014",
    cover: "/images/cover-vol1.jpg",
    rating: 5.0,
    pages: 86,
    formats: ["Kindle", "Paperback", "Hardcover"],
    description:
      "Where the dance begins. Love arrives as music — choreographed in the heart until it fills the mind — while jazz burns through the pages like a hot lava flow. The first truth of the series: if you free the Love you have Within, you'll never be Without Love.",
    amazon: "https://www.amazon.com/dp/B0HC4RTW3V",
  },
  {
    id: "vol2",
    numeral: "II",
    title: "Butterfly Thoughts",
    year: "2016",
    cover: "/images/cover-vol2.jpg",
    rating: 5.0,
    pages: 116,
    formats: ["Kindle", "Paperback", "Hardcover"],
    description:
      "Ideas float off the page like butterflies. A spirit of love, peace, and joy accompanied by powerful poetic images of pain, courage, passion, and triumph.",
    amazon: "https://www.amazon.com/dp/B0HC4L7T6Q",
  },
  {
    id: "vol3",
    numeral: "III",
    title: "Thoughts From The Heart",
    year: "2018",
    cover: "/images/cover-vol3.jpg",
    rating: 5.0,
    pages: 107,
    formats: ["Kindle", "Paperback", "Hardcover"],
    description:
      "When you inner-connect spiritually with that special someone, the energy created gives birth to a oneness that transforms you — a manifestation of love greater than either could be alone.",
    amazon: "https://www.amazon.com/dp/B0HC4SJTYF",
  },
  {
    id: "vol4",
    numeral: "IV",
    title: "Love, Life, The Creator & Me",
    year: "2020",
    cover: "/images/cover-vol4.jpg",
    rating: 5.0,
    pages: 78,
    formats: ["Kindle", "Paperback", "Hardcover"],
    description:
      "The widest lens — faith, gratitude, and a life measured in grace rather than time. Love becomes the most important occurrence, mirroring the first love the Creator had for humankind.",
    amazon: "https://www.amazon.com/dp/B0HC4PL286",
  },
  {
    id: "vol5",
    numeral: "V",
    title: "A Spectrum Of Thoughts",
    year: "2026",
    cover: "/images/cover-vol5.jpg",
    rating: 5.0,
    pages: 112,
    formats: ["Hardcover", "Paperback", "Kindle"],
    description:
      "The fifth and final volume opens the lens widest of all — a spectrum of love, faith, jazz, and the full colour of feeling. Every shade of a life lived in verse, gathered into one luminous voice.",
    amazon: AMAZON_AUTHOR_URL,
    status: "Forthcoming 2026",
  },
];

export type Award = {
  id: string;
  name: string;
  title: string;
  category?: string;
  work?: string;
  credits?: string;
  description: string;
  image?: string;
  imageWebp?: string;
};

export const awards: Award[] = [
  {
    id: "emmy",
    name: "Emmy® Award",
    title: "2019 Michigan Regional Emmy®",
    category: "Interview / Discussion",
    work: "Left Behind In Vietnam",
    credits: "R. Ray Barnes · Warriors Productions / Peaceful Warrior Foundation",
    description:
      "Presented by the National Academy of Television Arts & Sciences for Interview/Discussion on 'Left Behind In Vietnam' — honoring exceptional documentary storytelling and emotional truth.",
    image: "/images/award-emmy.jpg",
    imageWebp: "/images/award-emmy.webp",
  },
  {
    id: "eclipse",
    name: "Eclipse Award",
    title: "2019 Eclipse Award",
    category: "Best Television or Online Program",
    work: "WWII Veteran Carroll Braxton – Original Montford Point Marine",
    credits: "Rodney Brown & R. Ray Barnes",
    description:
      "Honored with the Eclipse Award for Best Television or Online Program for the documentary tribute to Montford Point Marine Carroll Braxton — celebrating courage, American history, and creative achievement.",
    image: "/images/award-eclipse.jpg",
    imageWebp: "/images/award-eclipse.webp",
  },
];

export type Milestone = {
  year: string;
  title: string;
  text: string;
};

export type BookCorner = {
  name: string;
  note: string;
};

export type OtherBook = {
  id: string;
  title: string;
  category: string;
  cover: string;
  description: string;
  corners?: BookCorner[];
  featured?: boolean;
  amazon?: string;
  status?: string;
  formats?: string[];
  subtitle?: string;
  credits?: string;
};

export const STUDIO_URL = "https://www.RRayBarnesProductions.com";

export const otherBooks: OtherBook[] = [
  {
    id: "easy-guide",
    title: "One: An Easy Guide To Understanding God, Spirit & Love",
    category: "Spiritual Companion",
    cover: "/images/cover-easy-guide.jpg",
    amazon: "https://www.amazon.com/dp/B0BSCL83DL",
    formats: ["Kindle", "Paperback"],
    subtitle: "The book that unites people of all faiths…",
    credits: "Photographs by R. Ray Barnes and Damon R. Ritchie",
    description:
      "The book that unites people of all faiths… A plain-spoken companion for the seeker — a gentle, accessible path through the nature of God, the quiet power of Spirit, and the many shapes of Love. Photographs by R. Ray Barnes and Damon R. Ritchie. Available now on Amazon.",
  },
  {
    id: "go-sit",
    title: "Go Sit In A Corner And Think",
    category: "Reflections",
    cover: "/images/cover-go-sit.jpg",
    amazon: "https://www.amazon.com/dp/B0BQZ4X3NS",
    featured: true,
    formats: ["Kindle", "Paperback", "Hardcover"],
    subtitle: "The Poetic Artistry of R. Ray Barnes",
    description:
      "An invitation to pause. A collection of meditations, sometimes loud, and sometimes quiet provocations that ask the reader to sit with themselves — in the corner of a room, in thought about the lives of Negroes, Colored People, Blacks and African Americans as they dealt with the transitions in identity from one to the other. He explores various narratives, from what he labels as Go Sit In these different corners And Think:",
    corners: [
      {
        name: "The Peoples Corner",
        note: "dealing with life in general",
      },
      {
        name: "The Street Corner",
        note: "tackling issues from the street side of Black life",
      },
      {
        name: "The Love Corner",
        note: "rather speaks for itself",
      },
      {
        name: "The Righteous Corner",
        note: "commenting on, and exploring religion, the church and faith",
      },
      {
        name: "The Ladies Corner",
        note: "poems from a female perspective",
      },
    ],
  },
  {
    id: "queen-pin",
    title: "Queen Pin: The Story Of Yvonne Barnes And The Motown Records Bowlerettes",
    category: "Biography",
    cover: "/images/cover-queen-pin.jpg",
    amazon: "https://www.amazon.com/dp/B0BJQMCLZV",
    formats: ["Kindle", "Paperback"],
    description:
      "The true story of Yvonne Barnes — the author’s mother — and the Motown Records Bowlerettes, the all-female team that won first place in the highest-scoring all-white league in the United States and built the largest youth bowling league in the nation while fighting prevailing racial inequities. A tribute to a woman once called the \u201cRosa Parks of bowling,\u201d and to an era that moved to its own rhythm. Available now on Amazon.",
  },
  {
    id: "69-ways",
    title: "69 Ways To Better Relationships, Sex & Love",
    category: "Relationships",
    cover: "/images/cover-69-ways.jpg",
    amazon: "https://www.amazon.com/dp/B00G641NOQ",
    formats: ["Kindle", "Paperback"],
    subtitle: "With 43 poems, photographs and a few laughs…",
    credits: "By R. Ray Barnes with Roberto Casanova & Julie Lovelace · Photography by LaSalle Barnes",
    description:
      "With 43 poems, photographs and a few laughs… by R. Ray Barnes with Roberto Casanova & Julie Lovelace, photography by LaSalle Barnes. A bold, plainspoken guide to the heart’s hardest subjects — intimacy, desire, and the daily work of loving well. Barnes turns the same honest eye he brings to poetry onto the questions that keep couples up at night, offering sixty-nine ways back to each other. Available now on Amazon.",
  },
];

export const journey: Milestone[] = [
  {
    year: "2008",
    title: "The First Poem",
    text: "A love letter scribbled on the back of a napkin becomes the seed of something much larger — the very first poem that would one day fill five volumes.",
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
    text: "The final volume widens the lens from romance to everything: faith, family, gratitude, and grace measured not in years but in grace.",
  },
  {
    year: "2022",
    title: "The Art of Poetry",
    text: "Four volumes become one unified work. The complete series is gathered into a single, coherent voice — a love letter told in verse.",
  },
  {
    year: "2024",
    title: "Reaching Further",
    text: "New poems are written. Readings, interviews, and a growing community of readers who find their own stories in the verse.",
  },
  {
    year: "2025",
    title: "Still Writing",
    text: "The pen keeps moving. A fifth volume takes shape — because the well of love, faith, and wonder never runs dry.",
  },
  {
    year: "2026",
    title: "A Spectrum Of Thoughts",
    text: "The fifth volume opens the lens widest of all. The series completes itself as five volumes, one voice — a love letter told in five parts.",
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
    id: "in-living-color",
    source: "FROM IN LIVING COLOR (VOL. V)",
    lines: [
      "LOVE",
      "is comprised of a broad",
      "Spectrum of COLORS…",
      "&",
      "HATE",
      "is merely a dull array of GRAYS…",
    ],
    attribution: "— In Living Color",
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
  {
    text: "LOVE is comprised of a broad Spectrum of COLORS… and HATE is merely a dull array of GRAYS…",
    source: "— Volume V — A Spectrum Of Thoughts",
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
      "It seems",
      "my thoughts",
      "take flight",
      "right where",
      "yours landed",
      "as we",
      "kiss and fly",
      "off together",
      "in heavenly bliss.",
    ],
    source: "— from Volume V: Equinox",
  },
];

export type Review = {
  id: string;
  text: string;
  name: string;
  role: string;
};

export const reviews: Review[] = [
  {
    id: "r0",
    text: "Very clever with words.",
    name: "Berry Gordy, Jr.",
    role: "Founder, Motown Records",
  },
  {
    id: "r1",
    text: "His words don't just sit on the page — they rise up and meet you where you are. I've never read poetry that feels this alive.",
    name: "Marcus D.",
    role: "Reader & Poet",
  },
  {
    id: "r2",
    text: "Butterfly Thoughts changed how I see love. Every line feels like it was written for anyone who has ever ached beautifully.",
    name: "Tamara R.",
    role: "Book Club Host",
  },
  {
    id: "r3",
    text: "This is not decoration poetry. This is the kind of writing that makes you put the book down and stare at the ceiling for ten minutes.",
    name: "James O.",
    role: "Literary Blogger",
  },
];

export const stats = [
  { value: 5, label: "VOLUMES", suffix: "" },
  { value: 420, label: "POEMS", suffix: "+" },
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
  { href: "#journey", label: "Journey" },
  { href: "#collection", label: "Volumes" },
  { href: "#verses", label: "Verses" },
  { href: "#themes", label: "Themes" },
  { href: "#more-books", label: "More Books" },
  { href: "#reviews", label: "Reviews" },
  { href: "#connect", label: "Connect" },
];
