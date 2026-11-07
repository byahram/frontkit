"use client"

import { useState, type ComponentProps } from "react"
import { buttonDesigns } from "@/examples/frontkit/button-designs"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Choice, Field, Playground, Toggle } from "./shared"

export type ButtonSettings = {
  variant: NonNullable<ComponentProps<typeof Button>["variant"]>
  size: NonNullable<ComponentProps<typeof Button>["size"]>
  disabled: boolean
  text: string
  design: string
}
export const buttonDefaults: ButtonSettings = {
  variant: "default",
  size: "default",
  disabled: false,
  text: "Continue",
  design: "basic",
}
export function buttonPresentation(s: ButtonSettings) {
  const design = buttonDesigns.find((item) => item.id === s.design)
  // Keep size owned by the real size prop, even for design presets.
  const className = design?.className
    .split(" ")
    .filter((token) => !/^(h-|px-|text-base$)/.test(token))
    .join(" ")
  return {
    className: design?.id === "glass" ? `border ${className}` : className,
    background: design?.background,
    icon: s.size.startsWith("icon"),
  }
}
export function ButtonPlaygroundPreview({
  settings: s,
}: {
  settings: ButtonSettings
}) {
  const p = buttonPresentation(s)
  return (
    <div
      className={`flex min-h-40 w-full items-center justify-center rounded-lg p-6 ${p.background ?? ""}`}
    >
      <Button
        type="button"
        variant={s.variant}
        size={s.size}
        disabled={s.disabled}
        className={p.className}
        aria-label={p.icon ? s.text || "Continue" : undefined}
      >
        {p.icon ? <span aria-hidden="true">+</span> : s.text}
      </Button>
    </div>
  )
}
export function getButtonPlaygroundCode(s: ButtonSettings) {
  const p = buttonPresentation(s)
  return `import { Button } from "@/registry/new-york-v4/ui/button"

export function ButtonExample() {
  return (
    <div className={${JSON.stringify(`flex min-h-40 w-full items-center justify-center rounded-lg p-6 ${p.background ?? ""}`)}}>
      <Button type="button" variant=${JSON.stringify(s.variant)} size=${JSON.stringify(s.size)} disabled={${s.disabled}}${p.className ? ` className={${JSON.stringify(p.className)}}` : ""}${p.icon ? ` aria-label={${JSON.stringify(s.text || "Continue")}}` : ""}>
        ${p.icon ? '<span aria-hidden="true">+</span>' : `{${JSON.stringify(s.text)}}`}
      </Button>
    </div>
  )
}
`
}
export function ButtonPlayground() {
  const [s, set] = useState(buttonDefaults)
  return (
    <Playground
      name="Button"
      preview={<ButtonPlaygroundPreview settings={s} />}
      code={getButtonPlaygroundCode(s)}
      onReset={() => set(buttonDefaults)}
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
              set({ ...s, variant: variant as ButtonSettings["variant"] })
            }
          />
          <Choice
            label="Size"
            value={s.size}
            options={[
              "default",
              "xs",
              "sm",
              "lg",
              "icon",
              "icon-xs",
              "icon-sm",
              "icon-lg",
            ]}
            onChange={(size) =>
              set({ ...s, size: size as ButtonSettings["size"] })
            }
          />
          <Toggle
            label="Disabled"
            checked={s.disabled}
            onChange={(disabled) => set({ ...s, disabled })}
          />
          <Field
            label={
              s.size.startsWith("icon")
                ? "버튼 접근성 이름 (아이콘 크기)"
                : "버튼 텍스트"
            }
          >
            <Input
              value={s.text}
              onChange={(event) => set({ ...s, text: event.target.value })}
            />
          </Field>
          <Choice
            label="Design Preset (className)"
            value={s.design}
            options={["basic", ...buttonDesigns.map((d) => d.id)]}
            onChange={(design) => set({ ...s, design })}
          />
          <p className="text-xs leading-5 text-muted-foreground">
            Preset은 className 조합입니다. 색상·모서리를 덮어쓸 수 있으며,
            Size는 기존 API를 따릅니다. Glass에는 배경을 포함합니다.
          </p>
        </>
      }
    />
  )
}
