# 살펴 (Salpyeo)

법으로 가격·평가 공개가 의무화된 시설(산후조리원, 요양원, 장례식장, 어린이집·유치원, 학원)의 공공데이터를 한 곳에서 검색·비교하는 서비스의 웹 프론트엔드입니다.

현재 **산후조리원(post)** 버티컬만 활성화되어 있고, 나머지 4개는 UI에 노출되지만 "준비 중" 상태입니다. 데이터는 전부 목데이터입니다.

## 실행

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## 기술 스택

| 영역 | 선택 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| 스타일 | Tailwind CSS v4 + 디자인 토큰(`src/app/globals.css`) |
| UI 프리미티브 | shadcn/ui 스타일 (`class-variance-authority`, `radix-ui` Slot) |
| 아이콘 | lucide-react |
| 상태 | zustand (+ `persist`, 비교함을 localStorage에 유지) |
| 토스트 | sonner |
| 폰트 | Pretendard Variable (jsDelivr CDN) |

## 라우트

| 경로 | 화면 |
| --- | --- |
| `/` | 홈 (히어로, 검색, 버티컬 카드, 신뢰 포인트) |
| `/[vertical]` | 시설 목록 (필터 칩, 정렬, 비교 체크, 하단 비교 바) · `?q=` 검색어 |
| `/[vertical]/[id]` | 시설 상세 (요금표, 점검·평가, 인증 후기, CTA 사이드바) |
| `/[vertical]/compare` | AI 비교 리포트 (비교함 2~3곳) |

비활성 버티컬은 목록 경로에서 "준비 중" 안내를, 상세/리포트 경로에서는 목록으로 리다이렉트합니다.

## 디렉터리 구조

```
src/
├─ app/                     # 라우트 (App Router)
│  ├─ layout.tsx            # 공통 레이아웃: 헤더·푸터·토스트·스토어 복원
│  ├─ page.tsx              # 홈
│  ├─ not-found.tsx
│  └─ [vertical]/
│     ├─ page.tsx           # 목록
│     ├─ [id]/page.tsx      # 상세
│     └─ compare/page.tsx   # 비교 리포트
├─ components/
│  ├─ ui/                   # Button, Badge, Card (shadcn 스타일 프리미티브)
│  ├─ layout/               # Header, Footer
│  ├─ common/               # BackLink, EmptyState, ComingSoon, Thumbnail, VerticalIcon …
│  ├─ home/                 # Hero, SearchBar, VerticalGrid, TrustPoints
│  ├─ facility/             # 목록: FacilityCard, FilterChips, SortSelect, CompareBar, FacilityListView
│  ├─ detail/               # 상세: FacilityHeaderCard, PriceTable, InspectionList, ReviewCard, DetailSidebar
│  └─ report/               # 리포트: CompareTable, AiSummary, CompareReportView
├─ data/
│  ├─ verticals.ts          # 버티컬 메타 + enabled 플래그, 기본 지역
│  └─ facilities/           # 버티컬별 목데이터 (post.ts, nursing.ts …)
├─ lib/
│  ├─ api/facilities.ts     # 데이터 접근 계층 (server-only) — 실 API로 교체 지점
│  ├─ compare.ts            # 비교 리포트 계산 (추천·우세값·요약)
│  ├─ format.ts             # 금액·평점·평균 대비 포맷
│  ├─ routes.ts             # 라우트 헬퍼
│  ├─ vertical-params.ts    # 라우트 파라미터 검증
│  └─ utils.ts              # cn()
├─ stores/compare-store.ts  # 비교함 zustand 스토어 (버티컬별, 최대 3개)
├─ hooks/use-compare.ts     # 비교함 훅 (초과 시 토스트)
└─ types/facility.ts        # 도메인 타입
```

## 자주 하는 작업

- **버티컬 활성화**: `src/data/verticals.ts`에서 `enabled: true`로 변경. 목데이터는 이미 `src/data/facilities/`에 있습니다.
- **실 API 연동**: `src/lib/api/facilities.ts`의 세 함수(`getVertical`, `getFacilities`, `getFacility`) 본문만 교체하면 됩니다. 응답 타입은 `src/types/facility.ts`를 따릅니다.
- **디자인 토큰 수정**: `src/app/globals.css`의 `:root` 변수. Tailwind 클래스(`bg-primary`, `text-text-tertiary`, `border-hairline`, `rounded-3xl` 등)로 바로 사용됩니다.
- **준비 중 기능**: 로그인, 시설 파트너, 문의, 후기 전체보기는 클릭 시 토스트로 안내합니다.

## 디자인 레퍼런스

원본 핸드오프 문서는 `docs/design-handoff.md`에 있습니다 (색상·타이포·간격·상태 스펙).
