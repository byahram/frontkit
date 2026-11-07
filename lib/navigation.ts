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
    resources: [
      { label: "기존 설치 문서", href: "/installation" },
      { label: "테마 설정", href: "/theming" },
      { label: "프로젝트 구성", href: "/components-json" },
    ],
  },
  {
    label: "Components",
    href: "/components",
    description:
      "기존 shadcn/ui를 바탕으로 프로젝트에 재사용할 UI를 찾아보세요.",
    topics: ["Foundations", "Atoms", "Molecules", "Organisms"],
    resources: [
      { label: "Button", href: "/components/base/button" },
      { label: "Input", href: "/components/base/input" },
      { label: "Sidebar", href: "/components/base/sidebar" },
      { label: "Data Table", href: "/components/base/data-table" },
    ],
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
