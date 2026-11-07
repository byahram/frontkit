"use client"

import { useState } from "react"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Choice, Field, Playground, Toggle } from "./shared"

export type CheckboxSettings = {
  checked: boolean | "indeterminate"
  disabled: boolean
  label: string
}
export const checkboxDefaults: CheckboxSettings = {
  checked: false,
  disabled: false,
  label: "Accept terms",
}
export function CheckboxPlaygroundPreview({
  settings: s,
  onChange,
}: {
  settings: CheckboxSettings
  onChange?: (value: CheckboxSettings["checked"]) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id="playground-checkbox"
        checked={s.checked}
        disabled={s.disabled}
        onCheckedChange={(value) => onChange?.(value)}
      />
      <label htmlFor="playground-checkbox" className="text-sm">
        {s.label || "Checkbox"}
      </label>
    </div>
  )
}
export function getCheckboxPlaygroundCode(s: CheckboxSettings) {
  return `"use client"

import { useState } from "react"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"

export function CheckboxExample() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(${JSON.stringify(s.checked)})
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="playground-checkbox" checked={checked} disabled={${s.disabled}} onCheckedChange={setChecked} />
      <label htmlFor="playground-checkbox" className="text-sm">{${JSON.stringify(s.label || "Checkbox")}}</label>
    </div>
  )
}
`
}
export function CheckboxPlayground() {
  const [s, set] = useState(checkboxDefaults)
  return (
    <Playground
      name="Checkbox"
      preview={
        <CheckboxPlaygroundPreview
          settings={s}
          onChange={(checked) => set({ ...s, checked })}
        />
      }
      code={getCheckboxPlaygroundCode(s)}
      onReset={() => set(checkboxDefaults)}
      controls={
        <>
          <Toggle
            label="Checked"
            checked={s.checked === true}
            onChange={(checked) => set({ ...s, checked })}
          />
          <Choice
            label="선택 상태 / State (Basic Props)"
            value={String(s.checked)}
            options={["false", "true", "indeterminate"]}
            onChange={(checked) =>
              set({
                ...s,
                checked:
                  checked === "indeterminate" ? checked : checked === "true",
              })
            }
          />
          <Toggle
            label="Disabled"
            checked={s.disabled}
            onChange={(disabled) => set({ ...s, disabled })}
          />
          <Field label="Label">
            <Input
              value={s.label}
              onChange={(event) => set({ ...s, label: event.target.value })}
            />
          </Field>
          <p className="text-xs leading-5 text-muted-foreground">
            Indeterminate는 기존 Radix API가 지원합니다. 원본 Indicator의 체크
            아이콘은 유지하며 aria-checked는 mixed가 됩니다.
          </p>
        </>
      }
    />
  )
}
