# FrontKit

ARKD3X가 운영하는 프론트엔드 개발 레퍼런스와 재사용 가능한 UI Kit입니다.

## Phase 1

- `/`: FrontKit 시작 화면
- `/guide`: 가이드 개요와 기존 설치·테마 문서 연결
- `/components`: 컴포넌트 개요와 기존 문서 목록
- `/interactions`: 인터랙션 카테고리 안내
- `/templates`: 준비 중 안내 (Preview·다운로드 미제공)

Guide / Components / Interactions / Templates 메뉴는 `lib/navigation.ts`에서
관리하며 Header, Sidebar, Mobile Navigation이 같은 정의를 사용합니다.
개요 화면은 기존 catch-all 라우트와 `components/frontkit/section-overview.tsx`에서
렌더링합니다. Guide 콘텐츠, Atomic Gallery, 인터랙션 설정, 템플릿 구현은
후속 단계의 범위입니다. 기존 MDX, 검색, Registry, Preview URL은 유지합니다.

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

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin before publishing. Metadata,
sitemap, and documentation copy links use this same URL setting.
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
