export const atomicLevels = [
  { value: "foundations", label: "Foundations" },
  { value: "atoms", label: "Atoms" },
  { value: "molecules", label: "Molecules" },
  { value: "organisms", label: "Organisms" },
] as const

export type AtomicLevel = (typeof atomicLevels)[number]["value"]

export type ComponentCatalogItem = {
  id: string
  slug: string
  title: string
  description: string
  atomicLevel: AtomicLevel
  tags: string[]
  docRef: string
  registryRef: { name: string; style: "new-york-v4" }
  previewRef: { name: string; style: "new-york-v4" }
}

// This list is the publication boundary. Implementation paths and dependencies
// remain owned by the existing Registry, not by this catalog.
export const componentCatalog: ComponentCatalogItem[] = [
  {
    id: "button",
    slug: "button",
    title: "Button",
    description: "사용자의 동작과 페이지 이동을 명확하게 표현하는 버튼입니다.",
    atomicLevel: "atoms",
    tags: ["버튼", "action", "variant", "size"],
    docRef: "components/button",
    registryRef: { name: "button", style: "new-york-v4" },
    previewRef: { name: "button-demo", style: "new-york-v4" },
  },
  {
    id: "input",
    slug: "input",
    title: "Input",
    description: "텍스트와 이메일 등 사용자 입력을 받는 기본 폼 컨트롤입니다.",
    atomicLevel: "atoms",
    tags: ["입력", "form", "text", "email"],
    docRef: "components/input",
    registryRef: { name: "input", style: "new-york-v4" },
    previewRef: { name: "input-demo", style: "new-york-v4" },
  },
  {
    id: "badge",
    slug: "badge",
    title: "Badge",
    description: "상태와 분류, 짧은 정보를 작게 표시하는 배지입니다.",
    atomicLevel: "atoms",
    tags: ["배지", "status", "label", "분류"],
    docRef: "components/badge",
    registryRef: { name: "badge", style: "new-york-v4" },
    previewRef: { name: "badge-demo", style: "new-york-v4" },
  },
  {
    id: "checkbox",
    slug: "checkbox",
    title: "Checkbox",
    description: "항목의 선택 여부와 동의 상태를 표현하는 체크박스입니다.",
    atomicLevel: "atoms",
    tags: ["체크박스", "form", "선택", "checked"],
    docRef: "components/checkbox",
    registryRef: { name: "checkbox", style: "new-york-v4" },
    previewRef: { name: "checkbox-with-text", style: "new-york-v4" },
  },
  {
    id: "radio-group",
    slug: "radio-group",
    title: "Radio Group",
    description: "여러 옵션 중 하나를 선택하는 라디오 그룹입니다.",
    atomicLevel: "atoms",
    tags: ["라디오", "form", "선택", "radio", "options"],
    docRef: "components/radio-group",
    registryRef: { name: "radio-group", style: "new-york-v4" },
    previewRef: { name: "radio-group-demo", style: "new-york-v4" },
  },
]

export function getCatalogComponent(slug: string) {
  return componentCatalog.find((item) => item.slug === slug)
}

export function filterComponentCatalog(
  items: readonly ComponentCatalogItem[],
  query: string,
  level: AtomicLevel | "all"
) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return items.filter((item) => {
    if (level !== "all" && item.atomicLevel !== level) return false
    const text = [item.title, item.description, ...item.tags]
      .join(" ")
      .toLocaleLowerCase()
    return terms.every((term) => text.includes(term))
  })
}
