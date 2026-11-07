import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"
import { publicSource } from "@/lib/source"
import { navigation } from "@/lib/navigation"

const staticRoutes = ["/", ...navigation.map((item) => item.href)]

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [
    ...staticRoutes,
    ...publicSource.getPages().map((page) => page.url),
  ]

  return [...new Set(urls)].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }))
}
