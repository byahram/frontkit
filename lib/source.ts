import { docs } from "@/.source/server"
import { loader } from "fumadocs-core/source"
import { isPublicContentUrl } from "@/lib/navigation"

const allDocs = docs.toFumadocsSource()

export const source = loader({
  baseUrl: "/",
  source: allDocs,
})

// Reuse Fumadocs for public navigation/search while preserving the complete source.
export const publicSource = loader({
  baseUrl: "/",
  source: {
    files: allDocs.files.filter((file) =>
      file.type === "meta"
        ? file.path === "guide/meta.json"
        : isPublicContentUrl(`/${file.path.replace(/\.mdx?$/, "")}`)
    ),
  },
})
