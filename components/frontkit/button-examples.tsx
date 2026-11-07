import {
  BasicButtonPreview,
  ButtonDesignPreview,
  buttonDesigns,
  getBasicButtonCode,
  getButtonDesignCode,
} from "@/examples/frontkit/button-designs"
import { highlightCode } from "@/lib/highlight-code"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { CopyButton } from "@/components/copy-button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/new-york-v4/ui/tabs"

export async function ButtonExamples({ group }: { group: "basic" | "design" }) {
  const examples =
    group === "basic"
      ? [
          {
            id: "basic",
            title: "Basic Variants",
            description:
              "기존 Button의 6개 Variant입니다. Size와 Props는 기존 API를 그대로 사용합니다.",
            preview: <BasicButtonPreview />,
            code: getBasicButtonCode(),
          },
        ]
      : buttonDesigns.map((design) => ({
          id: design.id,
          title: design.title,
          description: design.description,
          preview: <ButtonDesignPreview design={design} />,
          code: getButtonDesignCode(design),
        }))

  return (
    <div className="not-typeset space-y-6" data-button-examples={group}>
      {await Promise.all(
        examples.map(async (example) => {
          const html = await highlightCode(example.code, "tsx")
          return (
            <article
              key={example.id}
              data-button-example={example.id}
              className="min-w-0 space-y-4 rounded-xl border bg-card p-4 text-card-foreground sm:p-6"
            >
              <header className="space-y-2">
                <h3 className="font-semibold">{example.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {example.description}
                </p>
              </header>
              <Tabs defaultValue="preview" className="min-w-0 w-full">
                <TabsList aria-label={`${example.title} 보기`}>
                  <TabsTrigger value="preview">Live Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent
                  forceMount
                  value="preview"
                  className="min-w-0 data-[state=inactive]:hidden"
                >
                  <ComponentPreviewTabs
                    component={example.preview}
                    source={null}
                    hideCode
                    styleName="new-york-v4"
                    className="my-0"
                    previewClassName="min-h-40 w-full px-3 py-6 sm:px-6"
                  />
                </TabsContent>
                <TabsContent
                  forceMount
                  value="code"
                  className="min-w-0 data-[state=inactive]:hidden"
                >
                  <figure
                    className="relative m-0 overflow-hidden rounded-lg bg-code"
                    data-rehype-pretty-code-figure=""
                  >
                    <CopyButton
                      value={example.code}
                      aria-label={`${example.title} 코드 복사`}
                    />
                    <div
                      className="[&>pre]:max-h-96"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </figure>
                </TabsContent>
              </Tabs>
            </article>
          )
        })
      )}
    </div>
  )
}
