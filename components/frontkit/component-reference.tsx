import type { ReactNode } from "react"

import { highlightCode } from "@/lib/highlight-code"
import { getRegistryItem } from "@/lib/registry"
import { getCatalogComponent } from "@/registry/frontkit/components"
import { registry } from "@/registry/new-york-v4/registry"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/new-york-v4/ui/tabs"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { CopyButton } from "@/components/copy-button"
import styles from "./component-reference.module.css"

export async function ComponentReference({
  slug,
  children,
}: {
  slug: string
  children: ReactNode
}) {
  const entry = getCatalogComponent(slug)
  if (!entry) throw new Error(`Component is not published: ${slug}`)
  const [implementation, demo] = await Promise.all([
    getRegistryItem(entry.registryRef.name, entry.registryRef.style),
    getRegistryItem(entry.previewRef.name, entry.previewRef.style),
  ])
  if (!implementation || !demo)
    throw new Error(`Registry reference is missing: ${slug}`)

  const styleMetadata = registry.items.find((item) => item.name === "style")
  const metadata = registry.items.find(
    (item) => item.name === entry.registryRef.name
  )
  if (!styleMetadata || !metadata)
    throw new Error(`Registry metadata is missing: ${slug}`)
  const dependencies = [
    ...new Set([
      ...(styleMetadata.dependencies ?? []),
      ...(metadata.dependencies ?? []),
    ]),
  ]
  const devDependencies = [
    ...new Set([
      ...(styleMetadata.devDependencies ?? []),
      ...(metadata.devDependencies ?? []),
    ]),
  ]
  const command = [
    `npm install ${dependencies.join(" ")}`,
    ...(devDependencies.length
      ? [`npm install -D ${devDependencies.join(" ")}`]
      : []),
  ].join("\n")
  const highlightedCommand = await highlightCode(command, "bash")

  return (
    <div className="space-y-8" data-component-reference={entry.id}>
      <Tabs
        defaultValue="preview"
        className="w-full"
        aria-label={`${entry.title} 레퍼런스`}
      >
        <TabsList aria-label="컴포넌트 상세 보기">
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
        </TabsList>
        <TabsContent
          forceMount
          value="preview"
          className="data-[state=inactive]:hidden"
        >
          <ComponentPreview
            name={entry.previewRef.name}
            styleName={entry.previewRef.style}
            hideCode
          />
        </TabsContent>
        <TabsContent
          forceMount
          value="code"
          className="space-y-6 pt-5 data-[state=inactive]:hidden"
        >
          <div>
            <h3 className="mb-3 font-medium">사용 예제</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Live Preview에서 실행하는 데모 코드입니다. 컴포넌트 구현 자체와
              구분해서 사용하세요.
            </p>
            <ComponentSource
              name={entry.previewRef.name}
              styleName={entry.previewRef.style}
              title={`examples/${entry.previewRef.name}.tsx`}
              collapsible={false}
            />
          </div>
          <div>
            <h3 className="mb-3 font-medium">컴포넌트 구현</h3>
            <ComponentSource
              name={entry.registryRef.name}
              styleName={entry.registryRef.style}
              title={`components/ui/${entry.slug}.tsx`}
              collapsible={false}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            코드 탭은 다른 프로젝트에 옮길 수 있도록 import 경로를 표시합니다.
            대상 프로젝트의 UI 경로에 맞게 조정하세요.
          </p>
        </TabsContent>
        <TabsContent
          forceMount
          value="props"
          className={`typeset pt-5 data-[state=inactive]:hidden ${styles.props}`}
        >
          {children}
        </TabsContent>
      </Tabs>
      <section className="space-y-4" aria-label="설치 의존성">
        <h2>사용 방법 및 의존성</h2>
        <p>
          FrontKit에는 이미 설치되어 있습니다. 다른 프로젝트에서는
          React·TypeScript·Tailwind CSS와 디자인 토큰을 먼저 준비하세요.
        </p>
        <p className="text-sm text-muted-foreground">
          컴포넌트 선언 의존성:{" "}
          {metadata.dependencies?.join(", ") || "추가 선언 없음"}. 아래 명령에는
          기존 new-york-v4 스타일의 공통 의존성도 포함됩니다.
        </p>
        <figure
          className="relative overflow-hidden rounded-lg border bg-code"
          data-rehype-pretty-code-figure=""
        >
          <CopyButton value={command} />
          <div dangerouslySetInnerHTML={{ __html: highlightedCommand }} />
        </figure>
        <p className="text-sm text-muted-foreground">
          공통 스타일: {styleMetadata.dependencies?.join(", ")}. 개발·스타일
          의존성: {devDependencies.join(", ") || "없음"}.
        </p>
      </section>
    </div>
  )
}
