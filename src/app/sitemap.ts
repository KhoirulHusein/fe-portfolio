import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://byirul-deck.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             BASE_URL,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        1,
    },
  ];
}
