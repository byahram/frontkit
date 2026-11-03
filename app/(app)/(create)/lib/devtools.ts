import { type BaseName } from "@/registry/config"

export function getDocsPathForItem(base: BaseName, item: string) {
  if (item.endsWith("-example")) {
    const component = item.slice(0, -"-example".length)
    return `/components/${base}/${component}`
  }

  return "/components"
}
