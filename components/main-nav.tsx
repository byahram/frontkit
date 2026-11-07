"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

import { PAGES_NEW } from "@/lib/docs"
import { isNavigationItemActive, type NavigationItem } from "@/lib/navigation"
import { Button } from "@/registry/new-york-v4/ui/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: readonly NavigationItem[]
}) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="주요 메뉴"
      className={cn("items-center gap-0", className)}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          size="sm"
          className="px-2.5"
        >
          <Link
            href={item.href}
            data-active={isNavigationItemActive(pathname, item.href)}
            aria-current={
              isNavigationItemActive(pathname, item.href)
                ? "location"
                : undefined
            }
            data-new={PAGES_NEW.includes(item.href)}
            className="relative items-center data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
          >
            {item.label}
            {item.status === "planned" && (
              <span className="text-[10px] font-normal text-muted-foreground">
                준비 중
              </span>
            )}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
