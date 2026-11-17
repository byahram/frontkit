import { navigation } from "@/lib/navigation"

export const siteConfig = {
  name: "FrontKit",
  brand: "ARKD3X",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage:
    "/og?title=FrontKit&description=Frontend%20reference%20and%20UI%20Kit%20by%20ARKD3X",
  description:
    "ARKD3X가 운영하는 프론트엔드 개발 레퍼런스와 재사용 가능한 UI Kit입니다.",
  links: {
    github: "https://github.com/byahram/frontkit",
    upstream: "https://github.com/shadcn-ui/ui",
  },
  navItems: navigation,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
