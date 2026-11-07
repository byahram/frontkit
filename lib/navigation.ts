import { componentCatalog } from "@/registry/frontkit/components"

export const guideNavigation = [
  { label: "Getting Started", href: "/guide/getting-started" },
  { label: "Coding Convention", href: "/guide/coding-convention" },
  { label: "Project Structure", href: "/guide/project-structure" },
  { label: "Git", href: "/guide/git" },
  { label: "TypeScript", href: "/guide/typescript" },
  { label: "Next.js", href: "/guide/nextjs" },
  { label: "Tailwind CSS", href: "/guide/tailwind-css" },
  { label: "Lint / Format", href: "/guide/lint-format" },
]

// Explicit publication list: existing template files remain directly addressable.
export function isPublicContentUrl(url: string) {
  return (
    guideNavigation.some((item) => item.href === url) ||
    componentCatalog.some((item) => `/${item.docRef}` === url)
  )
}

export type NavigationItem = {
  label: string
  href: string
  description: string
  status?: "planned"
  topics: readonly string[]
  resources: readonly { label: string; href: string }[]
}

export const navigation: NavigationItem[] = [
  {
    label: "Guide",
    href: "/guide",
    description:
      "프로젝트를 시작하고 일관되게 개발하기 위한 규칙과 가이드입니다.",
    topics: [
      "Getting Started",
      "Coding Convention",
      "Project Structure",
      "Git",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Lint / Format",
    ],
    resources: guideNavigation,
  },
  {
    label: "Components",
    href: "/components",
    description:
      "실제 프로젝트에 재사용할 UI 컴포넌트와 구성 패턴을 정리합니다.",
    topics: ["Foundations", "Atoms", "Molecules", "Organisms"],
    resources: componentCatalog.map((item) => ({
      label: item.title,
      href: `/${item.docRef}`,
    })),
  },
  {
    label: "Interactions",
    href: "/interactions",
    description:
      "화면에 움직임을 더하는 인터랙션과 애니메이션을 정리할 공간입니다.",
    topics: [
      "Mouse",
      "Text",
      "Scroll",
      "Hover",
      "Loading",
      "Transition",
      "Particle",
      "Background",
    ],
    resources: [],
  },
  {
    label: "Templates",
    href: "/templates",
    description:
      "Guide, Components, Interactions를 조합한 프로젝트 템플릿을 준비합니다.",
    status: "planned",
    topics: [
      "Dashboard",
      "Admin",
      "Landing",
      "Portfolio",
      "Blog",
      "Project Starter",
    ],
    resources: [],
  },
]

export function isNavigationItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getNavigationItem(slug: readonly string[] = []) {
  const href = `/${slug.join("/")}`
  return navigation.find((item) => item.href === href)
}
