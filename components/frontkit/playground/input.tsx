"use client"

import { useState } from "react"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Choice, Field, Playground, Toggle } from "./shared"

export const inputDesigns = {
  basic: "",
  soft: "border-transparent bg-muted shadow-none dark:bg-muted",
  underline:
    "rounded-none border-0 border-b-2 shadow-none focus-visible:ring-0",
}
export type InputSettings = {
  type: string
  placeholder: string
  disabled: boolean
  readOnly: boolean
  value: string
  design: keyof typeof inputDesigns
}
export const inputDefaults: InputSettings = {
  type: "text",
  placeholder: "Enter a value",
  disabled: false,
  readOnly: false,
  value: "",
  design: "basic",
}
export function InputPlaygroundPreview({
  settings: s,
  onChange,
}: {
  settings: InputSettings
  onChange?: (value: string) => void
}) {
  return (
    <div className="w-full max-w-sm space-y-2">
      <label htmlFor="playground-input" className="text-sm">
        입력 예제
      </label>
      <Input
        id="playground-input"
        type={s.type}
        placeholder={s.placeholder}
        disabled={s.disabled}
        readOnly={s.readOnly}
        value={s.value}
        onChange={(event) => onChange?.(event.target.value)}
        className={inputDesigns[s.design]}
      />
    </div>
  )
}
export function getInputPlaygroundCode(s: InputSettings) {
  return `"use client"

import { useState } from "react"
import { Input } from "@/registry/new-york-v4/ui/input"

export function InputExample() {
  const [value, setValue] = useState(${JSON.stringify(s.value)})
  return (
    <div className="w-full max-w-sm space-y-2">
      <label htmlFor="playground-input" className="text-sm">입력 예제</label>
      <Input id="playground-input" type=${JSON.stringify(s.type)} placeholder={${JSON.stringify(s.placeholder)}} disabled={${s.disabled}} readOnly={${s.readOnly}} value={value} onChange={event => setValue(event.target.value)} className={${JSON.stringify(inputDesigns[s.design])}} />
    </div>
  )
}
`
}
export function InputPlayground() {
  const [s, set] = useState(inputDefaults)
  return (
    <Playground
      name="Input"
      preview={
        <InputPlaygroundPreview
          settings={s}
          onChange={(value) => set({ ...s, value })}
        />
      }
      code={getInputPlaygroundCode(s)}
      onReset={() => set(inputDefaults)}
      controls={
        <>
          <Choice
            label="Type (Basic Props)"
            value={s.type}
            options={[
              "text",
              "email",
              "password",
              "search",
              "tel",
              "url",
              "number",
            ]}
            onChange={(type) => set({ ...s, type, value: "" })}
          />
          <Field label="Placeholder">
            <Input
              value={s.placeholder}
              onChange={(event) =>
                set({ ...s, placeholder: event.target.value })
              }
            />
          </Field>
          <Field label="입력값">
            <Input
              type={s.type}
              value={s.value}
              onChange={(event) => set({ ...s, value: event.target.value })}
            />
          </Field>
          <Toggle
            label="Disabled"
            checked={s.disabled}
            onChange={(disabled) => set({ ...s, disabled })}
          />
          <Toggle
            label="Read Only"
            checked={s.readOnly}
            onChange={(readOnly) => set({ ...s, readOnly })}
          />
          <Choice
            label="Design Preset (className)"
            value={s.design}
            options={Object.keys(inputDesigns)}
            onChange={(design) =>
              set({ ...s, design: design as InputSettings["design"] })
            }
          />
        </>
      }
    />
  )
}
