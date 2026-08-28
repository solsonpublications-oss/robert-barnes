export type Volume = {
  id: string;
  numeral: string;
  title: string;
  cover: string;
  rating: number;
  pages: number;
  description: string;
  amazon: string;
};

export const volumes: Volume[] = [
  {
    id: "vol1",
    numeral: "I",
    title: "Thoughts Dancing From Heart To Mind",
    cover: "/images/vol1.jpg",
    rating: 5.0,
    pages: 86,
    description:
      "A soulful collection that explores the depth of human emotions, love, spirituality, and self-reflection. Every poem flows like a conversation between the heart and mind.",
    amazon: "https://www.amazon.com/dp/B0D5FKQ7ZL",
  },
  {
    id: "vol2",
    numeral: "II",
    title: "Butterfly Thoughts",
    cover: "/images/vol2.jpg",
    rating: 5.0,
    pages: 116,
    description:
      "Ideas float off the page like butterflies. A spirit of love, peace, and joy accompanied by powerful poetic images of pain, courage, passion, and triumph.",
    amazon: "https://www.amazon.com/dp/B0D5FMY3P5",
  },
  {
    id: "vol3",
    numeral: "III",
    title: "Thoughts From The Heart",
    cover: "/images/vol3.jpg",
    rating: 5.0,
    pages: 107,
    description:
      "When you inner-connect spiritually with that special someone, the energy created gives birth to a oneness that transforms you — a manifestation of love greater than either could be alone.",
    amazon: "https://www.amazon.com/dp/B0D5FPB5GH",
  },
  {
    id: "vol4",
    numeral: "IV",
    title: "Love, Life, The Creator & Me",
    cover: "/images/vol4.jpg",
    rating: 5.0,
    pages: 78,
    description:
      "The widest lens — faith, gratitude, and a life measured in grace rather than time. Love becomes the most important occurrence, mirroring the first love the Creator had for humankind.",
    amazon: "https://www.amazon.com/dp/B0D5FRZQK9",
  },
];

export type Milestone = {
  year: string;
  title: string;
  text: string;
};

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
    text: "The final volume widens the lens from romance to everything: faith, family, gratitude, and grace measured not in years but in grace.",
  },
  {
    year: "2022",
    title: "The Art of Poetry",
    text: "Four volumes become one unified work. The complete series is published, a love letter told in four parts.",
  },
  {
    year: "2024",
    title: "Reaching Further",
    text: "New poems are written. Readings, interviews, and a growing community of readers who find their own stories in the verse.",
  },
  {
    year: "2025",
    title: "Still Writing",
    text: "The pen keeps moving. New work is in progress — because the well of love, faith, and wonder never runs dry.",
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
    id: "mist",
    source: "FROM BUTTERFLY THOUGHTS (VOL. II)",
    lines: [
      "out of the mist you appeared —",
      "and though the music was blaring,",
      "I heard your eyes as they whispered",
      "sweet melodies into mine.",
    ],
    attribution: "— untitled",
  },
  {
    id: "delicacy",
    source: "FROM DELICACY (VOL. III)",
    lines: [
      "i've been sailing",
      "around, around, around",
      "in your sea of love,",
      "making circles",
      "around your heart —",
    ],
    attribution: "— Delicacy",
  },
  {
    id: "great-love",
    source: "FROM A GREAT LOVE (VOL. IV)",
    lines: [
      "a Great Love",
      "is much like the Great Pyramid —",
      "it seems impossible to build,",
      "but built on a solid foundation,",
      "it will last forever.",
    ],
    attribution: "— A Great Love",
  },
];

export type Quote = {
  text: string;
  source: string;
};

export const quotes: Quote[] = [
  {
    text: "Grace arrives in the unguarded hour — while you're stirring coffee, while you're not looking.",
    source: "— Volume III — Thoughts From The Heart",
  },
  {
    text: "Love is the only language the heart speaks without translation.",
    source: "— Volume I — Thoughts Dancing From Heart To Mind",
  },
  {
    text: "A butterfly does not ask permission to be beautiful. It simply is.",
    source: "— Volume II — Butterfly Thoughts",
  },
  {
    text: "Faith is the music the soul hums when the mind has forgotten the words.",
    source: "— Volume IV — Love, Life, The Creator & Me",
  },
  {
    text: "We do not write the poem. The poem writes us, and waits for us to catch up.",
    source: "— R. Ray Barnes, on the craft",
  },
];

export type VerseMoment = {
  lines: string[];
  source: string;
};

export const verseMoments: VerseMoment[] = [
  {
    lines: [
      "The body remembers",
      "what the mind tries to forget—",
      "a shoulder, a rhythm,",
      "the weight of Sunday morning.",
    ],
    source: "— from Volume IV: Love, Life, The Creator & Me",
  },
  {
    lines: [
      "I keep your name",
      "behind my teeth like a seed—",
      "some nights it almost",
      "blooms into a song.",
    ],
    source: "— from Volume II: Butterfly Thoughts",
  },
  {
    lines: [
      "All my prayers",
      "sound like your footsteps",
      "coming home through",
      "the long corridor of evening.",
    ],
    source: "— from Volume III: Thoughts From The Heart",
  },
  {
    lines: [
      "Jazz taught me",
      "that silence is just",
      "a rest held long enough",
      "to become a note.",
    ],
    source: "— from Volume I: Thoughts Dancing From Heart To Mind",
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
  { value: 4, label: "VOLUMES", suffix: "" },
  { value: 380, label: "POEMS", suffix: "+" },
  { value: 16, label: "YEARS WRITING", suffix: "+" },
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
  { href: "#reviews", label: "Reviews" },
  { href: "#connect", label: "Connect" },
];
