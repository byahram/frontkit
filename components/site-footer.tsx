import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="group-has-[[data-slot=designer]]/body:hidden group-has-[[data-slot=docs]]/body:hidden">
      <div className="container-wrapper px-4 sm:px-6">
        <div className="flex min-h-(--footer-height) flex-wrap items-center justify-between gap-3 border-t py-6 text-xs text-muted-foreground">
          <p>
            {siteConfig.name} by {siteConfig.brand}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.upstream}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Based on shadcn/ui · MIT
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
