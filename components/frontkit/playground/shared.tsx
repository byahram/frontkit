"use client"

import { useEffect, useId, useState, type ReactNode } from "react"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { CopyButton } from "@/components/copy-button"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/new-york-v4/ui/native-select"

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  )
}

export function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <Field label={label}>
      <NativeSelect
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full"
      >
        {options.map((option) => (
          <NativeSelectOption key={option} value={option}>
            {option}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </Field>
  )
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  const id = useId()
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
      />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  )
}

function PlaygroundCode({ code }: { code: string }) {
  const [highlighted, setHighlighted] = useState<{
    code: string
    html: string
  } | null>(null)
  useEffect(() => {
    let active = true
    const timer = setTimeout(() => {
      void import("@/lib/playground-highlight")
        .then(({ highlightPlaygroundCode }) => highlightPlaygroundCode(code))
        .then((html) => {
          if (active) setHighlighted({ code, html })
        })
        .catch(() => {
          /* Plain code remains available if highlighting fails. */
        })
    }, 150)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [code])
  return (
    <figure
      className="relative m-0 min-w-0 overflow-hidden rounded-lg border bg-code"
      data-rehype-pretty-code-figure=""
    >
      <CopyButton value={code} aria-label="Playground JSX 코드 복사" />
      <div
        className="[&_pre]:max-h-96 [&_pre]:overflow-auto [&_pre]:bg-transparent! [&_pre]:p-4 [&_pre]:pr-12"
        aria-label="생성된 JSX 코드"
      >
        {highlighted?.code === code ? (
          <div dangerouslySetInnerHTML={{ __html: highlighted.html }} />
        ) : (
          <pre className="text-sm">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
  )
}

export function Playground({
  name,
  preview,
  controls,
  code,
  onReset,
}: {
  name: string
  preview: ReactNode
  controls: ReactNode
  code: string
  onReset: () => void
}) {
  return (
    <section
      className="not-typeset min-w-0 space-y-5 rounded-xl border bg-card p-4 text-card-foreground sm:p-6"
      data-playground={name}
      aria-label={`${name} Playground`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{name} Playground</h3>
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
        <div className="min-w-0 space-y-3">
          <h4 className="text-sm font-medium">Live Preview</h4>
          <ComponentPreviewTabs
            component={preview}
            source={null}
            hideCode
            styleName="new-york-v4"
            className="my-0"
            previewClassName="min-h-52 w-full px-4 py-8"
          />
        </div>
        <fieldset className="min-w-0 space-y-4">
          <legend className="mb-3 text-sm font-medium">
            Properties Controls
          </legend>
          {controls}
        </fieldset>
      </div>
      <div className="min-w-0 space-y-3">
        <h4 className="text-sm font-medium">사용 예제 JSX / Copy</h4>
        <p className="text-xs leading-5 text-muted-foreground">
          현재 설정을 반영한 사용 예제입니다. 다른 프로젝트에서는 Button 등 UI의
          import 경로를 변경하세요. 실제 구현 코드는 기존 Code 탭에서 확인할 수
          있습니다.
        </p>
        <PlaygroundCode code={code} />
      </div>
    </section>
  )
}
