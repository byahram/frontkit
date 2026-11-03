# Frontkit

Next.js app with the shadcn/ui documentation site migrated into the project root.
The documentation home page is served at `/`; old `/docs/...` links redirect to their new paths.

## Development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The MDX index is generated automatically during
installation. Component styles are included; regenerate them after changing the
registry with `npm run registry:build`.

## Where to edit

- `app/(app)/(docs)`: documentation routes and layouts.
- `content/docs`: MDX pages and navigation metadata, following the upstream structure.
- `components`: navigation, search, code previews, and shared documentation UI.
- `registry`, `examples`, `styles`: component demos and their source/style variants.
- `app/(view)`: iframe preview routes used by documentation examples.
- `lib/config.ts`: site name, URL, and navigation.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin before publishing.
Upstream documentation content and external links are retained as starter content;
replace them with your own documentation as needed. Upstream marketing pages are
not exposed. Designer/type specimen modules retained under `app/(app)` support
embedded previews.

## Checks

```sh
npm run typecheck
npm run build
```

## Attribution

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and
[LICENSE.shadcn.md](LICENSE.shadcn.md). Preserve these notices when distributing
substantial portions of the upstream code or documentation.
