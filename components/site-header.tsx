import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { publicSource } from "@/lib/source"
import { CommandMenu } from "@/components/command-menu"
import { GitHubLink } from "@/components/github-link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Separator } from "@/registry/new-york-v4/ui/separator"

export function SiteHeader() {
  const pageTree = publicSource.pageTree

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-4 sm:px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
          <MobileNav
            tree={pageTree}
            items={siteConfig.navItems}
            className="mr-3 flex lg:hidden"
          />
          <Link
            href="/"
            aria-label="FrontKit 홈"
            className="mr-6 shrink-0 text-lg font-semibold tracking-tight"
          >
            {siteConfig.name}
          </Link>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="w-24 md:w-auto">
              <CommandMenu
                tree={pageTree}
                colors={[]}
                showLegacySuggestions={false}
                navItems={siteConfig.navItems}
              />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <div className="hidden sm:block">
              <GitHubLink />
            </div>
            <Separator orientation="vertical" className="hidden sm:block" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
