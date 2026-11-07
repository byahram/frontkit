import { createHighlighterCore } from "shiki/core"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"
import tsx from "shiki/langs/tsx.mjs"
import githubDark from "shiki/themes/github-dark.mjs"
import githubLight from "shiki/themes/github-light.mjs"

// Loaded on demand by the client Playground, with only its TSX grammar/themes.
const highlighter = createHighlighterCore({
  langs: [tsx],
  themes: [githubLight, githubDark],
  engine: createOnigurumaEngine(import("shiki/wasm")),
})

export async function highlightPlaygroundCode(code: string) {
  return (await highlighter).codeToHtml(code, {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
    transformers: [
      {
        line(node) {
          node.properties["data-line"] = ""
        },
      },
    ],
  })
}
