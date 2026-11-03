export const siteConfig = {
  name: "Frontkit",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Composable, accessible components with thoughtful defaults. Build your own component library with code you can customize, extend, and make your own.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },
  navItems: [
    { href: "/", label: "Docs" },
    { href: "/components", label: "Components" },
    { href: "/directory", label: "Directory" },
  ],
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
