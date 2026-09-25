import { volumes, otherBooks, AMAZON_AUTHOR_URL, STUDIO_URL } from "@/lib/poetry-data";

/**
 * JSON-LD structured data for the author + books, injected into the page
 * head for richer search results (Google Books / rich snippets / knowledge
 * panel signals).
 */

const SITE = "https://robert-barnes.space-z.ai";
const AMAZON_AUTHOR = AMAZON_AUTHOR_URL;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "R. Ray Barnes",
  alternateName: ["Robert Ray Barnes", "Robert Barnes"],
  description:
    "Emmy® Award–winning American author, producer, and poet. Author of The Art of Poetry, a five-volume collection, and Queen Pin: The Story of Yvonne Barnes and the Motown Records Bowlerettes. Over thirty-five years as a music producer and songwriter collaborating with Stevie Wonder, Mary Wilson, James Ingram, and Tony Coleman.",
  url: SITE,
  image: `${SITE}/images/author-portrait.png`,
  jobTitle: "Author · Producer · Poet",
  award: [
    "2019 Michigan Regional Emmy® Award (Interview / Discussion: Left Behind In Vietnam)",
    "2019 Eclipse Award (Best Television or Online Program: WWII Veteran Carroll Braxton – Original Montford Point Marine)",
  ],
  knowsAbout: ["Poetry", "Love poetry", "Jazz poetry", "Faith", "Spirituality", "Music production", "Songwriting"],
  sameAs: [AMAZON_AUTHOR, STUDIO_URL],
};

const bookJsonLd = (book: { title: string; description: string; cover: string; amazon?: string; status?: string }) => ({
  "@type": "Book",
  name: book.title,
  author: { "@type": "Person", name: "R. Ray Barnes" },
  description: book.description,
  image: `${SITE}${book.cover}`,
  url: book.amazon ?? AMAZON_AUTHOR,
  ...(book.status
    ? { offers: { "@type": "Offer", url: book.amazon ?? AMAZON_AUTHOR, availability: "https://schema.org/PreOrder" } }
    : {
        offers: {
          "@type": "Offer",
          url: book.amazon ?? AMAZON_AUTHOR,
          availability: "https://schema.org/InStock",
        },
      }),
});

const seriesLd = {
  "@context": "https://schema.org",
  "@type": "BookSeries",
  name: "The Art of Poetry",
  author: {
    "@type": "Person",
    name: "R. Ray Barnes",
  },
  description:
    "Five volumes, one voice. A life written in verse — to romance, to grief, to jazz, and to the faith that carries a heart through all of it.",
  hasPart: volumes.map((v) => ({
    ...bookJsonLd(v),
    bookEdition: `Volume ${v.numeral}`,
    numberOfPages: v.pages,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: v.rating,
      reviewCount: 1,
    },
  })),
};

const otherWorksLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Companion works by R. Ray Barnes",
  itemListElement: otherBooks.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: bookJsonLd(b),
  })),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Art of Poetry — R. Ray Barnes",
  url: SITE,
  description: "Five volumes, one voice. A life written in verse by R. Ray Barnes.",
  inLanguage: "en",
  author: { "@type": "Person", name: "R. Ray Barnes" },
  image: `${SITE}/api/og`,
  publisher: { "@type": "Person", name: "R. Ray Barnes" },
};

const ld = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(seriesLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(otherWorksLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(websiteLd) }} />
    </>
  );
}
