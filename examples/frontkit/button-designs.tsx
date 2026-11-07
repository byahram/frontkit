import type { ComponentProps } from "react"

import { Button } from "@/registry/new-york-v4/ui/button"

type ButtonVariant = NonNullable<ComponentProps<typeof Button>["variant"]>

export const basicButtonVariants = [
  { variant: "default", label: "Default" },
  { variant: "secondary", label: "Secondary" },
  { variant: "outline", label: "Outline" },
  { variant: "ghost", label: "Ghost" },
  { variant: "destructive", label: "Destructive" },
  { variant: "link", label: "Link" },
] as const satisfies readonly { variant: ButtonVariant; label: string }[]

export type ButtonDesign = {
  id: "gradient" | "pill" | "glass" | "three-d"
  title: string
  description: string
  variant: ButtonVariant
  className: string
  background?: string
}

export const buttonDesigns: readonly ButtonDesign[] = [
  {
    id: "gradient",
    title: "Gradient Button",
    description:
      "그라데이션 배경이 Hover에서 부드럽게 이동하며 색상이 달라집니다.",
    variant: "default",
    className:
      "h-11 rounded-lg bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-[length:200%_100%] bg-left px-6 text-white shadow-sm transition-[background-position,box-shadow] duration-300 hover:bg-right hover:shadow-md motion-reduce:transition-none",
  },
  {
    id: "pill",
    title: "Pill Button",
    description:
      "기본 Variant를 유지하면서 완전히 둥근 모서리와 넉넉한 패딩을 적용합니다.",
    variant: "default",
    className: "h-11 rounded-full px-8 text-base",
  },
  {
    id: "glass",
    title: "Glass Button",
    description:
      "반투명 배경과 Blur, 테두리를 조합합니다. 효과를 확인할 수 있는 배경도 코드에 포함합니다.",
    variant: "outline",
    className:
      "h-11 rounded-xl border-white/70 bg-white/60 px-6 text-slate-950 shadow-sm backdrop-blur-md hover:bg-white/80 hover:text-slate-950 dark:border-white/20 dark:bg-slate-950/45 dark:text-slate-50 dark:hover:bg-slate-950/65 dark:hover:text-slate-50",
    background:
      "bg-linear-to-br from-sky-100 via-violet-100 to-rose-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
  },
  {
    id: "three-d",
    title: "3D Button",
    description:
      "아래쪽 그림자로 깊이를 표현하고 Hover와 Active에서 높이와 그림자를 조절합니다.",
    variant: "default",
    className:
      "h-11 rounded-lg bg-indigo-600 px-6 text-white shadow-[0_5px_0_0_var(--color-indigo-800)] transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-[0_7px_0_0_var(--color-indigo-800)] active:translate-y-1 active:bg-indigo-600 active:shadow-[0_1px_0_0_var(--color-indigo-800)] motion-reduce:transition-none",
  },
]

const basicLayout = "flex flex-wrap items-center justify-center gap-3"

function designLayout(design: ButtonDesign) {
  return `flex min-h-40 w-full flex-wrap items-center justify-center gap-3 rounded-lg p-6 ${design.background ?? "bg-muted/20"}`
}

export function BasicButtonPreview() {
  return (
    <div className={basicLayout}>
      {basicButtonVariants.map((item) => (
        <Button key={item.variant} type="button" variant={item.variant}>
          {item.label}
        </Button>
      ))}
    </div>
  )
}

export function ButtonDesignPreview({ design }: { design: ButtonDesign }) {
  return (
    <div className={designLayout(design)}>
      <Button
        type="button"
        variant={design.variant}
        className={design.className}
      >
        {design.title}
      </Button>
    </div>
  )
}

// Inline the same props used above so each copied example is standalone and
// cannot drift from its preview. No separate design component is required.
export function getButtonDesignCode(design: ButtonDesign) {
  const name =
    design.id === "three-d"
      ? "ThreeD"
      : design.id[0].toUpperCase() + design.id.slice(1)
  return `import { Button } from "@/registry/new-york-v4/ui/button"

export function ${name}ButtonExample() {
  return (
    <div className=${JSON.stringify(designLayout(design))}>
      <Button
        type="button"
        variant=${JSON.stringify(design.variant)}
        className=${JSON.stringify(design.className)}
      >
        ${design.title}
      </Button>
    </div>
  )
}
`
}

export function getBasicButtonCode() {
  const buttons = basicButtonVariants
    .map(
      (item) =>
        `      <Button type="button" variant=${JSON.stringify(item.variant)}>${item.label}</Button>`
    )
    .join("\n")
  return `import { Button } from "@/registry/new-york-v4/ui/button"

export function BasicButtonVariants() {
  return (
    <div className=${JSON.stringify(basicLayout)}>
${buttons}
    </div>
  )
}
`
}
