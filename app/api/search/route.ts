import { createFromSource } from "fumadocs-core/search/server"

import { publicSource } from "@/lib/source"

export const { GET } = createFromSource(publicSource)
