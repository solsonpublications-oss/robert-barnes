import { volumes, otherBooks, AMAZON_AUTHOR_URL } from "@/lib/poetry-data";

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
      "Emmy Award–winning American author, producer, and poet. Author of The Art of Poetry, a five-volume collection, and Queen Pin: The Story of Yvonne Barnes and the Motown Records Bowlerettes. Over thirty-five years as a music producer and songwriter collaborating with Stevie Wonder, Mary Wilson, James Ingram, and Tony Coleman.",
    url: "https://robert-barnes.space-z.ai",
    sameAs: [AMAZON_AUTHOR_URL],
    jobTitle: "Author · Producer · Poet",
    award: ["2019 Michigan Regional Emmy Award", "8th Annual Eclipse Award"],
    knowsAbout: ["Poetry", "Love poetry", "Jazz poetry", "Faith", "Spirituality", "Music production", "Songwriting"],
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
      "Five volumes, one voice. A life written in verse — to romance, to grief, to jazz, and to the faith that carries a heart through all of it.",
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
      ...(v.amazon
        ? {
            offers: {
              "@type": "Offer",
              url: v.amazon,
              availability: "https://schema.org/InStock",
            },
          }
        : {}),
    })),
  };

  // Every published book with its real Amazon detail page.
  const allBooksLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Books by R. Ray Barnes",
    itemListElement: [
      ...volumes
        .filter((v) => v.amazon)
        .map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: v.amazon,
          name: `The Art of Poetry Volume ${v.numeral}: ${v.title}`,
        })),
      ...otherBooks
        .filter((b) => b.amazon)
        .map((b, i) => ({
          "@type": "ListItem",
          position: volumes.filter((v) => v.amazon).length + i + 1,
          url: b.amazon,
          name: b.title,
        })),
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Art of Poetry — R. Ray Barnes",
    url: "https://robert-barnes.space-z.ai",
    description:
      "Five volumes, one voice. A life written in verse by R. Ray Barnes.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allBooksLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
    </>
  );
}
