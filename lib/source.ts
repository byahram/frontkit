import { docs } from "@/.source/server"
import { loader } from "fumadocs-core/source"
import { isPublicContentUrl } from "@/lib/navigation"
import { componentCatalog } from "@/registry/frontkit/components"

const allDocs = docs.toFumadocsSource()

export const source = loader({
  baseUrl: "/",
  source: allDocs,
})

// Reuse Fumadocs for public navigation/search while preserving the complete source.
export const publicSource = loader({
  baseUrl: "/",
  source: {
    files: allDocs.files
      .filter((file) =>
        file.type === "meta"
          ? ["guide/meta.json", "components/meta.json"].includes(file.path)
          : isPublicContentUrl(`/${file.path.replace(/\.mdx?$/, "")}`)
      )
      .map((file) =>
        file.type === "meta" && file.path === "components/meta.json"
          ? {
              ...file,
              data: {
                ...file.data,
                pages: componentCatalog.map((item) => item.slug),
              },
            }
          : file
      ),
  },
})
