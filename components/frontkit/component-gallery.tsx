"use client"

import Link from "next/link"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"

import {
  atomicLevels,
  filterComponentCatalog,
  type ComponentCatalogItem,
} from "@/registry/frontkit/components"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/new-york-v4/ui/card"
import { Input } from "@/registry/new-york-v4/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"

const levelValues = ["all", ...atomicLevels.map((item) => item.value)] as const

export function ComponentGallery({ items }: { items: ComponentCatalogItem[] }) {
  const [filters, setFilters] = useQueryStates(
    {
      q: parseAsString.withDefault(""),
      level: parseAsStringLiteral(levelValues).withDefault("all"),
    },
    { history: "replace", shallow: true }
  )
  const results = filterComponentCatalog(items, filters.q, filters.level)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <label htmlFor="component-search" className="text-sm font-medium">
            컴포넌트 검색
          </label>
          <Input
            id="component-search"
            type="search"
            placeholder="이름 또는 키워드 검색"
            value={filters.q}
            onChange={(event) => void setFilters({ q: event.target.value })}
          />
        </div>
        <div className="space-y-2 sm:w-48">
          <label id="component-level-label" className="text-sm font-medium">
            Atomic 분류
          </label>
          <Select
            value={filters.level}
            onValueChange={(value) =>
              void setFilters({ level: value as typeof filters.level })
            }
          >
            <SelectTrigger
              aria-labelledby="component-level-label"
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 분류</SelectItem>
              {atomicLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => void setFilters({ q: null, level: null })}
          disabled={!filters.q && filters.level === "all"}
        >
          초기화
        </Button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="text-sm text-muted-foreground"
      >
        {results.length}개 컴포넌트
      </p>
      {results.length ? (
        <GalleryCards items={results} />
      ) : (
        <div className="rounded-xl border border-dashed px-6 py-14 text-center">
          <h2 className="font-medium">검색 결과가 없습니다</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            검색어나 분류를 변경해 보세요. 현재 공개 컴포넌트는 {items.length}
            개입니다.
          </p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => void setFilters({ q: null, level: null })}
          >
            전체 컴포넌트 보기
          </Button>
        </div>
      )}
    </div>
  )
}

// Keep the approved catalog navigable while the URL-aware filters hydrate.
export function ComponentGalleryFallback({
  items,
}: {
  items: ComponentCatalogItem[]
}) {
  return (
    <div className="space-y-6">
      <p role="status" className="text-sm text-muted-foreground">
        필터를 불러오는 중입니다.
      </p>
      <GalleryCards items={items} />
    </div>
  )
}

function GalleryCards({ items }: { items: readonly ComponentCatalogItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card
          key={item.id}
          data-catalog-id={item.id}
          className="h-full shadow-none"
        >
          <CardHeader className="space-y-3">
            <Badge variant="outline">
              {
                atomicLevels.find((level) => level.value === item.atomicLevel)
                  ?.label
              }
            </Badge>
            <CardTitle className="text-lg">
              <Link
                href={`/${item.docRef}`}
                className="rounded-sm underline-offset-4 hover:underline"
              >
                {item.title}
              </Link>
            </CardTitle>
            <CardDescription className="leading-6">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-wrap content-start gap-2">
            {item.tags.map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link
                href={`/${item.docRef}`}
                aria-label={`${item.title} 상세 보기`}
              >
                상세 보기
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
