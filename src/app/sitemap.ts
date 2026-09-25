import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://robert-barnes.space-z.ai";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/images/author-portrait.png`,
        `${baseUrl}/images/cover-vol1.jpg`,
        `${baseUrl}/images/cover-vol2.jpg`,
        `${baseUrl}/images/cover-vol3.jpg`,
        `${baseUrl}/images/cover-vol4.jpg`,
        `${baseUrl}/images/cover-vol5.jpg`,
        `${baseUrl}/images/cover-go-sit.jpg`,
        `${baseUrl}/images/cover-easy-guide.jpg`,
        `${baseUrl}/images/cover-queen-pin.jpg`,
        `${baseUrl}/images/cover-69-ways.jpg`,
        `${baseUrl}/images/award-emmy.jpg`,
        `${baseUrl}/images/award-eclipse.jpg`,
      ],
    },
  ];
}
