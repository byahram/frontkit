# FrontKit

ARKD3X가 운영하는 프론트엔드 개발 레퍼런스와 재사용 가능한 UI Kit입니다.

## Phase 2 — Guide

- `/`: FrontKit 시작 화면
- `/guide`: FrontKit Guide 8개 문서 목록
- `/components`: 컴포넌트 개요 (기능 준비 중)
- `/interactions`: 인터랙션 카테고리 안내
- `/templates`: 준비 중 안내 (Preview·다운로드 미제공)

Guide / Components / Interactions / Templates 메뉴는 `lib/navigation.ts`에서
관리하며 Header, Sidebar, Mobile Navigation이 같은 정의를 사용합니다.
개요 화면은 기존 catch-all 라우트와 `components/frontkit/section-overview.tsx`에서
렌더링합니다. Guide 상세는 기존 Fumadocs + MDX로 렌더링하며 목차·이전/다음·
코드 하이라이팅·복사를 재사용합니다. Atomic Gallery, 인터랙션 설정, 템플릿 구현은
후속 단계의 범위입니다.

공개 Guide는 `content/docs/guide/`의 Getting Started, Coding Convention,
Project Structure, Git, TypeScript, Next.js, Tailwind CSS, Lint / Format입니다.
브랜치 전략·import 순서·타입 작성 기준 등 미확정 정책은 문서에서 권장안으로 구분합니다.

### 공개 콘텐츠 정책

- `lib/navigation.ts`의 `guideNavigation`이 현재 공개 문서 허용 목록입니다.
- `lib/source.ts`의 `source`는 모든 기존 문서를 보존하고 직접 접근에 사용합니다.
- `publicSource`는 허용 목록의 문서만 탐색·검색·사이트맵에 사용합니다.
- Header·Sidebar·모바일 메뉴는 FrontKit의 4개 섹션과 공개 Guide만 표시합니다.
- 원본 문서·예제·Registry·Preview URL과 리다이렉트는 보존합니다.
- 새 공개 Guide를 추가할 때 MDX, `guide/meta.json`의 순서와 허용 목록을 함께 갱신합니다.
- 문서의 코드 예제는 앱 소스의 타입 검사 대상이 아니므로 별도로 확인합니다.

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
