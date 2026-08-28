import { volumes } from "@/lib/poetry-data";

/**
 * JSON-LD structured data for the author + book series, injected into
 * the page head for richer search results (Google Books / rich snippets).
 */
export function StructuredData() {
  const authorLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "R. Ray Barnes",
    description:
      "American poet writing in the tradition of love, faith, jazz, family, grace, and longing. Author of The Art of Poetry, a four-volume collection.",
    url: "https://robert-barnes.space-z.ai",
    jobTitle: "Poet",
    knowsAbout: ["Poetry", "Love poetry", "Jazz poetry", "Faith", "Spirituality"],
  };

  const seriesLd = {
    "@context": "https://schema.org",
    "@type": "BookSeries",
    name: "The Art of Poetry",
    author: {
      "@type": "Person",
      name: "R. Ray Barnes",
    },
    description:
      "Four volumes, one voice. A life written in verse — to romance, to grief, to jazz, and to the faith that carries a heart through all of it.",
    hasPart: volumes.map((v) => ({
      "@type": "Book",
      name: v.title,
      bookEdition: `Volume ${v.numeral}`,
      numberOfPages: v.pages,
      author: { "@type": "Person", name: "R. Ray Barnes" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: v.rating,
        reviewCount: 1,
      },
      offers: {
        "@type": "Offer",
        url: v.amazon,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Art of Poetry — R. Ray Barnes",
    url: "https://robert-barnes.space-z.ai",
    description:
      "Four volumes, one voice. A life written in verse by R. Ray Barnes.",
    inLanguage: "en",
    author: { "@type": "Person", name: "R. Ray Barnes" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
    </>
  );
}
