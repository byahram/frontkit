"use client"

import * as React from "react"
import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

import { isNavigationItemActive, type NavigationItem } from "@/lib/navigation"

import { PAGES_NEW } from "@/lib/docs"
import { showMcpDocs } from "@/lib/flags"
import { getCurrentBase, getPagesFromFolder } from "@/lib/page-tree"
import { type source } from "@/lib/source"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york-v4/ui/popover"

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree
  items: readonly NavigationItem[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const currentBase = getCurrentBase(pathname)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-open:animate-none!"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">
              FrontKit
            </div>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                  className="aria-[current=location]:underline aria-[current=location]:underline-offset-4"
                  aria-current={
                    isNavigationItemActive(pathname, item.href)
                      ? "location"
                      : undefined
                  }
                >
                  {item.label}
                  {item.status === "planned" && (
                    <span className="text-xs font-normal text-muted-foreground">
                      준비 중
                    </span>
                  )}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {tree?.children?.map((group, index) => {
              if (group.type === "folder") {
                const pages = getPagesFromFolder(group, currentBase)
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="text-sm font-medium text-muted-foreground">
                      {group.name}
                    </div>
                    <div className="flex flex-col gap-3">
                      {pages.map((item) => {
                        if (!showMcpDocs && item.url.includes("/mcp")) {
                          return null
                        }
                        return (
                          <MobileLink
                            key={`${item.url}-${index}`}
                            href={item.url}
                            onOpenChange={setOpen}
                            className="flex items-center gap-2"
                          >
                            {item.name}{" "}
                            {PAGES_NEW.includes(item.url) && (
                              <span className="flex size-2 rounded-full bg-blue-500" />
                            )}
                          </MobileLink>
                        )
                      })}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={cn("flex items-center gap-2 text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
