import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

// No lastModified: with Cache Components a bare `new Date()` here would need io(); search
// engines read changes from the pages themselves.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/register`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ]
}
