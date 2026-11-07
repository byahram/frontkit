"use client"

import { useState, type ComponentProps } from "react"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Choice, Field, Playground } from "./shared"

export const badgeDesigns = {
  basic: "",
  square: "rounded-md px-3 py-1",
  soft: "border-emerald-200 bg-emerald-100 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100",
}
export type BadgeSettings = {
  variant: NonNullable<ComponentProps<typeof Badge>["variant"]>
  text: string
  design: keyof typeof badgeDesigns
}
export const badgeDefaults: BadgeSettings = {
  variant: "default",
  text: "New",
  design: "basic",
}
export function BadgePlaygroundPreview({
  settings: s,
}: {
  settings: BadgeSettings
}) {
  return (
    <Badge variant={s.variant} className={badgeDesigns[s.design]}>
      {s.text}
    </Badge>
  )
}
export function getBadgePlaygroundCode(s: BadgeSettings) {
  return `import { Badge } from "@/registry/new-york-v4/ui/badge"

export function BadgeExample() {
  return <Badge variant=${JSON.stringify(s.variant)} className={${JSON.stringify(badgeDesigns[s.design])}}>{${JSON.stringify(s.text)}}</Badge>
}
`
}
export function BadgePlayground() {
  const [s, set] = useState(badgeDefaults)
  return (
    <Playground
      name="Badge"
      preview={<BadgePlaygroundPreview settings={s} />}
      code={getBadgePlaygroundCode(s)}
      onReset={() => set(badgeDefaults)}
      controls={
        <>
          <Choice
            label="Variant (Basic Props)"
            value={s.variant}
            options={[
              "default",
              "secondary",
              "outline",
              "ghost",
              "destructive",
              "link",
            ]}
            onChange={(variant) =>
              set({ ...s, variant: variant as BadgeSettings["variant"] })
            }
          />
          <Field label="표시 텍스트">
            <Input
              value={s.text}
              onChange={(event) => set({ ...s, text: event.target.value })}
            />
          </Field>
          <Choice
            label="Design Preset (className)"
            value={s.design}
            options={Object.keys(badgeDesigns)}
            onChange={(design) =>
              set({ ...s, design: design as BadgeSettings["design"] })
            }
          />
          <p className="text-xs leading-5 text-muted-foreground">
            Soft는 Variant의 색상을 className으로 덮어쓰는 스타일 예제이며
            새로운 Variant가 아닙니다.
          </p>
        </>
      }
    />
  )
}
