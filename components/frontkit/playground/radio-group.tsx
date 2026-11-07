"use client"

import { useState } from "react"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/new-york-v4/ui/radio-group"
import { Choice, Field, Playground, Toggle } from "./shared"

export const radioDesigns = {
  default: "flex items-center gap-3",
  card: "flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-muted has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
  segmented:
    "flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 has-[[data-state=checked]]:bg-background has-[[data-state=checked]]:shadow-sm has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
  button:
    "flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
}
export type RadioOption = {
  id: string
  value: string
  label: string
  disabled: boolean
}
export type RadioSettings = {
  options: RadioOption[]
  value: string
  defaultValue: string
  disabled: boolean
  orientation: "vertical" | "horizontal"
  design: keyof typeof radioDesigns
}
export const radioDefaults: RadioSettings = {
  options: [
    { id: "one", value: "starter", label: "Starter", disabled: false },
    { id: "two", value: "pro", label: "Pro", disabled: false },
    { id: "three", value: "team", label: "Team", disabled: false },
  ],
  value: "starter",
  defaultValue: "starter",
  disabled: false,
  orientation: "vertical",
  design: "default",
}
export function radioLayout(s: RadioSettings) {
  return `flex flex-wrap gap-3 ${s.orientation === "vertical" ? "flex-col" : "flex-row"}${s.design === "segmented" ? " rounded-lg bg-muted p-1" : ""}`
}
export function radioItemStyle(s: RadioSettings) {
  return s.design === "button"
    ? "border-current text-current [&_svg]:fill-current"
    : ""
}
export function RadioPlaygroundPreview({
  settings: s,
  onChange,
}: {
  settings: RadioSettings
  onChange?: (value: string) => void
}) {
  return (
    <div className="w-full min-w-0 space-y-4">
      <RadioGroup
        aria-label="요금제 선택"
        value={s.value}
        onValueChange={onChange}
        disabled={s.disabled}
        orientation={s.orientation}
        className={radioLayout(s)}
      >
        {s.options.map((option) => (
          <label key={option.id} className={radioDesigns[s.design]}>
            <RadioGroupItem
              value={option.value}
              disabled={option.disabled}
              className={radioItemStyle(s)}
            />
            <span className="min-w-0 text-sm break-all">
              {option.label || option.value}
            </span>
          </label>
        ))}
      </RadioGroup>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={s.disabled}
        onClick={() => onChange?.(s.defaultValue)}
      >
        초기 선택 복원
      </Button>
    </div>
  )
}
export function getRadioPlaygroundCode(s: RadioSettings) {
  return `"use client"

import { useState } from "react"
import { Button } from "@/registry/new-york-v4/ui/button"
import { RadioGroup, RadioGroupItem } from "@/registry/new-york-v4/ui/radio-group"

export function RadioExample() {
  const defaultValue = ${JSON.stringify(s.defaultValue)}
  const [value, setValue] = useState(${JSON.stringify(s.value)})
  return (
    <div className="w-full min-w-0 space-y-4">
      <RadioGroup aria-label="요금제 선택" value={value} onValueChange={setValue} disabled={${s.disabled}} orientation=${JSON.stringify(s.orientation)} className={${JSON.stringify(radioLayout(s))}}>
${s.options
  .map(
    (
      option
    ) => `        <label className={${JSON.stringify(radioDesigns[s.design])}}>
          <RadioGroupItem value={${JSON.stringify(option.value)}} disabled={${option.disabled}} className={${JSON.stringify(radioItemStyle(s))}} />
          <span className="min-w-0 text-sm break-all">{${JSON.stringify(option.label || option.value)}}</span>
        </label>`
  )
  .join("\n")}
      </RadioGroup>
      <Button type="button" variant="outline" size="sm" disabled={${s.disabled}} onClick={() => setValue(defaultValue)}>초기 선택 복원</Button>
    </div>
  )
}
`
}
export function RadioGroupPlayground() {
  const [s, set] = useState(radioDefaults)
  const [error, setError] = useState("")
  function updateOption(id: string, patch: Partial<RadioOption>) {
    const old = s.options.find((option) => option.id === id)!
    if (
      patch.value !== undefined &&
      (!patch.value.trim() ||
        s.options.some(
          (option) => option.id !== id && option.value === patch.value
        ))
    ) {
      setError("옵션 Value는 비어 있거나 중복될 수 없습니다.")
      return
    }
    setError("")
    set({
      ...s,
      options: s.options.map((option) =>
        option.id === id ? { ...option, ...patch } : option
      ),
      value:
        patch.value !== undefined && s.value === old.value
          ? patch.value
          : s.value,
      defaultValue:
        patch.value !== undefined && s.defaultValue === old.value
          ? patch.value
          : s.defaultValue,
    })
  }
  function removeOption(id: string) {
    const options = s.options.filter((option) => option.id !== id)
    set({
      ...s,
      options,
      value: options.some((o) => o.value === s.value)
        ? s.value
        : options[0].value,
      defaultValue: options.some((o) => o.value === s.defaultValue)
        ? s.defaultValue
        : options[0].value,
    })
    setError("")
  }
  return (
    <Playground
      name="Radio Group"
      preview={
        <RadioPlaygroundPreview
          settings={s}
          onChange={(value) => set({ ...s, value })}
        />
      }
      code={getRadioPlaygroundCode(s)}
      onReset={() => {
        set(radioDefaults)
        setError("")
      }}
      controls={
        <>
          <Choice
            label="Value (현재 선택)"
            value={s.value}
            options={s.options.map((o) => o.value)}
            onChange={(value) => set({ ...s, value })}
          />
          <Choice
            label="Default Value (초기 / 복원 기준)"
            value={s.defaultValue}
            options={s.options.map((o) => o.value)}
            onChange={(defaultValue) =>
              set({ ...s, defaultValue, value: defaultValue })
            }
          />
          <p className="text-xs leading-5 text-muted-foreground">
            현재 선택은 value로 제어합니다. Default Value를 바꾸면 선택을
            초기화하며, 복사 코드에도 복원 기준을 포함합니다. 비제어
            defaultValue API는 아래 기본 예제를 참고하세요.
          </p>
          <Toggle
            label="Disabled (전체)"
            checked={s.disabled}
            onChange={(disabled) => set({ ...s, disabled })}
          />
          <Choice
            label="Orientation"
            value={s.orientation}
            options={["vertical", "horizontal"]}
            onChange={(orientation) =>
              set({
                ...s,
                orientation: orientation as RadioSettings["orientation"],
              })
            }
          />
          <Choice
            label="Design Preset (className)"
            value={s.design}
            options={Object.keys(radioDesigns)}
            onChange={(design) =>
              set({ ...s, design: design as RadioSettings["design"] })
            }
          />
          <div className="space-y-3">
            <h4 className="text-sm font-medium">
              Options / Label / Item Disabled
            </h4>
            {s.options.map((option, index) => (
              <fieldset
                key={option.id}
                className="space-y-3 rounded-lg border p-3"
              >
                <legend className="px-1 text-xs">옵션 {index + 1}</legend>
                <Field label={`옵션 ${index + 1} Value`}>
                  <Input
                    value={option.value}
                    onChange={(event) =>
                      updateOption(option.id, { value: event.target.value })
                    }
                  />
                </Field>
                <Field label={`옵션 ${index + 1} Label`}>
                  <Input
                    value={option.label}
                    onChange={(event) =>
                      updateOption(option.id, { label: event.target.value })
                    }
                  />
                </Field>
                <Toggle
                  label={`옵션 ${index + 1} Disabled`}
                  checked={option.disabled}
                  onChange={(disabled) => updateOption(option.id, { disabled })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={s.options.length <= 1}
                  onClick={() => removeOption(option.id)}
                >
                  옵션 삭제
                </Button>
              </fieldset>
            ))}
            <p role="status" className="text-xs text-destructive">
              {error}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={s.options.length >= 8}
              onClick={() => {
                let index = s.options.length + 1
                while (
                  s.options.some(
                    (o) =>
                      o.value === `option-${index}` ||
                      o.id === `option-${index}`
                  )
                )
                  index++
                const value = `option-${index}`
                set({
                  ...s,
                  options: [
                    ...s.options,
                    {
                      id: value,
                      value,
                      label: `Option ${index}`,
                      disabled: false,
                    },
                  ],
                })
              }}
            >
              옵션 추가 (최대 8개)
            </Button>
          </div>
        </>
      }
    />
  )
}
