import { siteConfig } from "@/lib/config"

export { cn } from "cn"

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString()
}
