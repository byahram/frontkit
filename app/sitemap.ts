import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { navigation } from "@/lib/navigation"

const staticRoutes = ["/", ...navigation.map((item) => item.href)]

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [...staticRoutes, ...source.getPages().map((page) => page.url)]

  return [...new Set(urls)].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }))
}
