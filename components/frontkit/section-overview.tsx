import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { navigation, type NavigationItem } from "@/lib/navigation"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/new-york-v4/ui/card"

export function SectionOverview({
  section,
  children,
}: {
  section?: NavigationItem
  children?: React.ReactNode
}) {
  return (
    <section
      className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-14"
      aria-labelledby="section-title"
    >
      <header className="space-y-5 border-b pb-8">
        <div className="flex items-center gap-3 text-xs font-medium tracking-widest text-muted-foreground">
          <span>{siteConfig.brand}</span>
          <span aria-hidden="true">/</span>
          <span>FRONTEND REFERENCE & UI KIT</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1
            id="section-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {section?.label ?? siteConfig.name}
          </h1>
          {section?.status === "planned" && (
            <Badge variant="outline">준비 중</Badge>
          )}
        </div>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          {section?.description ??
            "프로젝트를 만드는 데 필요한 개발 가이드, UI 컴포넌트와 인터랙션을 한곳에서 찾아보고 재사용하세요."}
        </p>
        {!section && (
          <Button asChild variant="outline">
            <Link href="/guide">
              Guide에서 시작하기 <ArrowUpRight />
            </Link>
          </Button>
        )}
      </header>

      {!section ? (
        <div className="grid gap-4 md:grid-cols-2">
          {navigation.map((item) => (
            <Card
              key={item.href}
              className="h-full gap-0 shadow-none transition-colors hover:border-foreground/25"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-3 text-lg">
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 rounded-sm outline-offset-4 hover:underline"
                  >
                    {item.label}
                    <ArrowUpRight className="size-4" />
                  </Link>
                  {item.status === "planned" && (
                    <Badge variant="outline">준비 중</Badge>
                  )}
                </CardTitle>
                <CardDescription className="leading-6">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="rounded-xl border bg-muted/20 p-6">
            <h2 className="mb-2 text-base font-medium">
              {section.status === "planned"
                ? "템플릿을 준비하고 있습니다"
                : "이곳에서 다룰 내용"}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {section.label === "Guide" &&
                "FrontKit 개발 가이드를 준비하고 있습니다. 프로젝트를 시작하려면 기존 설치 및 테마 문서를 참고하세요."}
              {section.label === "Components" &&
                "기존 컴포넌트와 사용 예제를 확인하세요. 목적에 맞는 UI를 쉽게 찾을 수 있도록 분류를 정리하고 있습니다."}
              {section.label === "Interactions" &&
                "움직임을 직접 확인하고 코드를 재사용할 수 있는 인터랙션 레퍼런스를 준비하고 있습니다."}
              {section.status === "planned" &&
                "Guide, Components, Interactions를 바탕으로 프로젝트를 시작할 수 있는 템플릿을 준비하고 있습니다."}
            </p>
          </div>
          <ul
            className="flex flex-wrap gap-2"
            aria-label={`${section.label} 예정 카테고리`}
          >
            {section.topics.map((topic) => (
              <li key={topic}>
                <Badge variant="secondary">{topic}</Badge>
              </li>
            ))}
          </ul>
          {section.resources.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">기존 레퍼런스 살펴보기</h2>
              <ul className="flex flex-wrap gap-3">
                {section.resources.map((resource) => (
                  <li key={resource.href}>
                    <Button asChild variant="outline" size="sm">
                      <Link href={resource.href}>
                        {resource.label}
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {children && <div className="typeset border-t pt-8">{children}</div>}
    </section>
  )
}
