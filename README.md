# FrontKit

ARKD3X가 운영하는 프론트엔드 개발 레퍼런스와 재사용 가능한 UI Kit입니다.

## Phase 3A — Components

- `/components`: 공개 컴포넌트 Gallery. 이름·설명·태그 검색과 Atomic 분류를 제공합니다.
- 필터는 nuqs로 `q`, `level` 쿼리에 유지합니다. 현재 공개 항목은 Atoms 5개입니다.
- 상세 URL: `/components/button`, `/components/input`, `/components/badge`, `/components/checkbox`, `/components/radio-group`.
- `registry/frontkit/components.ts`는 분류와 문서·기존 Registry·Preview 참조만 관리합니다.
- 기존 `new-york-v4` UI·데모와 Preview / Source / Copy / Tabs를 재사용합니다.
- Code 탭은 사용 예제와 구현을 구분하고, Props는 새 MDX의 표로 관리합니다.
- 5개 상세 페이지의 Playground는 `components/frontkit/playground/shared.tsx`의 Preview·Controls·JSX·Copy·Reset 화면을 공유합니다.
- 각 컴포넌트 파일이 자신의 상태·실제 Props·디자인 className·코드 생성을 관리합니다. 자동 Props 추출 엔진은 없습니다.
- Playground 코드는 현재 상태에서 생성하며, 기존 Shiki의 TSX 문법과 Light/Dark 테마만 지연 로딩합니다.
- Radio Group의 기본·카드·세그먼트·버튼 디자인은 기존 Radix Radio Group 조합입니다. Default Value는 제어 예제의 초기·복원 기준입니다.
- 의존성은 기존 Registry의 컴포넌트·공통 스타일 메타데이터에서 읽습니다.
- 기존 계열별 문서·Preview URL은 유지하며, 위 5개 짧은 경로만 기존 자동 리다이렉트에서 제외합니다.
- Foundations·Molecules·Organisms는 필터만 제공하며 콘텐츠는 이번 범위에 포함하지 않습니다.

### 기본 화면과 Guide

- `/`: FrontKit 시작 화면
- `/guide`: FrontKit Guide 8개 문서 목록
- `/components`: 공개 Atoms 5개의 Gallery와 검색·분류 필터
- `/interactions`: 인터랙션 카테고리 안내
- `/templates`: 준비 중 안내 (Preview·다운로드 미제공)

Guide / Components / Interactions / Templates 메뉴는 `lib/navigation.ts`에서
관리하며 Header, Sidebar, Mobile Navigation이 같은 정의를 사용합니다.
개요 화면은 기존 catch-all 라우트와 `components/frontkit/section-overview.tsx`에서
렌더링합니다. Guide 상세는 기존 Fumadocs + MDX로 렌더링하며 목차·이전/다음·
코드 하이라이팅·복사를 재사용합니다. 추가 Atomic 분류 콘텐츠, 인터랙션 설정, 템플릿 구현은
후속 단계의 범위입니다.

공개 Guide는 `content/docs/guide/`의 Getting Started, Coding Convention,
Project Structure, Git, TypeScript, Next.js, Tailwind CSS, Lint / Format입니다.
브랜치 전략·import 순서·타입 작성 기준 등 미확정 정책은 문서에서 권장안으로 구분합니다.

### 공개 콘텐츠 정책

- `lib/navigation.ts`의 Guide 목록과 FrontKit 컴포넌트 카탈로그가 공개 문서 허용 목록입니다.
- `lib/source.ts`의 `source`는 모든 기존 문서를 보존하고 직접 접근에 사용합니다.
- `publicSource`는 허용 목록의 문서만 탐색·검색·사이트맵에 사용합니다.
- Header·Sidebar·모바일 메뉴는 FrontKit의 4개 섹션과 공개 Guide·컴포넌트만 표시합니다.
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
