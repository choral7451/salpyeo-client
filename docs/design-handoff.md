# Handoff: 살펴 (Salpyeo) — 생애 결정 시설 비교 서비스

## Overview
'살펴'는 법으로 가격·평가 공개가 의무화된 시설(산후조리원, 요양원, 장례식장, 어린이집·유치원, 학원)의 공공데이터를 한 곳에서 검색·비교하는 서비스입니다. 이 핸드오프는 **데스크톱 웹 프로토타입**(주 산출물)과 **모바일 앱 목업**(보조)을 담고 있습니다.

## About the Design Files
이 번들의 파일은 **HTML로 제작된 디자인 레퍼런스**입니다 — 의도된 룩과 동작을 보여주는 프로토타입이며, 그대로 복사해 쓸 프로덕션 코드가 아닙니다. 과제는 이 HTML 디자인을 **타깃 코드베이스의 기존 환경**(React, Vue, Next.js 등)에서 그 환경의 패턴·라이브러리로 **재구현**하는 것입니다. 아직 환경이 없다면 프로젝트에 가장 적합한 프레임워크를 선택해 구현하세요. (React + Next.js 권장 — 프로토타입 자체가 React 기반 상태 관리 구조로 설계됨.)

파일 형식 참고: `.dc.html` 파일은 `<x-dc>` 태그 안에 마크업(인라인 스타일), `<script data-dc-script>` 안에 `Component` 클래스(상태·데이터·핸들러)가 들어 있는 구조입니다. 마크업의 `{{ path }}`는 `renderVals()`가 반환하는 값에 바인딩됩니다. 로직 클래스의 `data()` 메서드에 5개 버티컬 전체의 샘플 데이터 스키마가 들어 있으니 API/모델 설계 시 참조하세요.

## Fidelity
**High-fidelity (hifi)** — 색상, 타이포, 간격, 상태까지 최종 의도입니다. 코드베이스의 컴포넌트 라이브러리를 사용하되 픽셀 수준으로 재현하세요. 단, 시설 사진·데이터는 전부 플레이스홀더/샘플입니다.

## Screens / Views (Desktop — `살펴 Desktop.dc.html`)

상태 기반 SPA: `state.view ∈ {home, list, detail, report}`, `state.vertical ∈ {post, nursing, funeral, daycare, academy}`, `state.selected` (버티컬별 비교함, 최대 3개), `state.detailId`.

### 공통: 상단 네비게이션 (sticky)
- 높이 60px, `rgba(255,255,255,0.94)` + `backdrop-filter: blur(10px)`, 하단 보더 `1px #f2f4f6`
- 콘텐츠 최대폭 1120px, 좌우 패딩 24px
- 로고 "살펴": 22px / 800 / #3182f6 / letter-spacing -0.5px → 클릭 시 홈
- 버티컬 탭 5개: 15px, 기본 500 #4e5968, 활성 700 #3182f6 배경 #e8f3ff, radius 10px, padding 8px 14px, hover 배경 #f2f4f6
- 우측: "시설 파트너" 텍스트 버튼, "로그인" 채움 버튼(#3182f6, radius 10px, 9px 16px, hover #1b64da)

### ① 홈 (view=home)
- 히어로(중앙 정렬, 상단 패딩 72px): 신뢰 배지 필(#e8f3ff 배경, shield 아이콘, "법으로 공개된 가격·평가 데이터 기반" 14px/700/#1b64da) → H1 46px/800/-1.2px/1.25 "인생의 큰 결정, 가격부터 살펴보세요" → 서브 18px #6d7684
- 검색 바 (max-width 640px): 흰 배경, `2px solid #3182f6`, radius 16px, `box-shadow 0 8px 28px rgba(49,130,246,0.12)`. 내부: 지역 선택("분당구 정자동" + chevron) | 세로 디바이더 | 플레이스홀더 "시설 이름이나 종류로 검색" | 검색 버튼(#3182f6, radius 12px)
- 버티컬 카드 그리드: `repeat(auto-fit, minmax(196px, 1fr))`, gap 14px. 카드: #f9fafb 배경, 1px #f2f4f6 보더, radius 20px, padding 24px 20px. 아이콘 타일 46px(#e8f3ff, radius 14px, Lucide 계열 stroke 아이콘 #3182f6), 라벨 17px/700, 설명 13px #6d7684, 하단 "N곳 살펴보기" 13px/700/#3182f6 + chevron. hover: 보더 #c9dffc, 배경 #f5faff. 클릭 → 해당 버티컬 목록
- 신뢰 포인트 3열: 상단 `2px solid #191f28` 룰 + 제목 16px/700 + 본문 14px #6d7684/1.6 ("숨은 가격이 없어요" / "점검·평가 결과로 거릅니다" / "후기는 인증된 것만")

### ② 검색 결과 목록 (view=list) — 배경 #f9fafb
- 타이틀 "분당구 {버티컬}" 28px/800/-0.6px + 곁텍스트 "{N}곳 · {데이터 출처}" 15px #6d7684
- 필터 칩 행: 활성(가격 공개 시설만) 700/#3182f6/배경 #e8f3ff/보더 #c9dffc, 비활성 600/#4e5968/흰 배경/보더 #e5e8eb. 모두 pill(999px), padding 8px 14px. 우측 끝 "가격 낮은순" 정렬 드롭다운
- 시설 카드 그리드 `repeat(auto-fill, minmax(340px, 1fr))`, gap 14px. 카드: 흰 배경, 1px #f2f4f6, radius 20px, padding 20px, hover 보더 #c9dffc + `0 6px 20px rgba(0,0,0,0.05)`. 구성:
  - 썸네일 64px(radius 14px, 플레이스홀더 #e8ebef) + 이름 17px/700 + 메타 13px #6d7684
  - 배지 2종: 점검(12px/700/#059c62/배경 #e7f6ee), 특성(#3182f6/배경 #e8f3ff), radius 6px
  - 비교 체크박스 26px(radius 8px): 미선택 보더 #d1d6db, 선택 시 #3182f6 채움 + 흰 체크. **카드 클릭과 분리(stopPropagation)** — 체크는 비교함 토글, 카드 클릭은 상세 이동
  - 가격 스트립: #f9fafb, radius 12px — 좌측 가격 기준 라벨 13px, 우측 가격 18px/800/tabular-nums
  - 하단: "인증 후기 {평점} · {건수}건" / "집에서 {거리}"
- **비교 바 (fixed bottom)**: 선택 ≥1일 때 표시. `rgba(25,31,40,0.96)` + blur. 선택 시설명(흰색 15px/600) + 힌트 13px #b0b8c1 ("2곳 이상 담으면 리포트를 만들 수 있어요" / "최대 3곳까지 담을 수 있어요") + "비교 리포트 보기" 버튼(선택 ≥2: #3182f6 활성, 1개: #4e5968 비활성)

### ③ 시설 상세 (view=detail) — 배경 #f9fafb
- "목록으로" 백링크(14px/600 #6d7684, hover #191f28)
- 2컬럼 그리드 `minmax(0,1fr) 340px`, gap 20px:
- **좌측 본문** (흰 카드들, radius 20px, 1px #f2f4f6):
  1. 헤더 카드: 사진 영역 260px(플레이스홀더) + 배지 2종 + 이름 26px/800 + 메타/거리 15px #6d7684 + "인증 후기 {평점} · 실제 이용자 {N}건"
  2. 공개 요금표: 제목 18px/700 + 출처·기준일 13px #8b95a1 + 행 테이블(항목 15px/600 + 부가설명 12px, 가격 16px/800 tabular). 푸터 행(#f9fafb): "분당구 평균 대비" + "{X}% 저렴"(#059c62/700)
  3. 공식 점검·평가: 행 카드(radius 14px) — 체크서클 아이콘(#059c62) + 점검명/기관·날짜 + 결과(13px/700/#059c62)
  4. 인증 후기: "이용 인증 완료" 라벨 + 날짜 + 본문 14px #333d4b/1.65, 배경 #f9fafb 카드
- **우측 사이드바 (sticky top 80px)**:
  - CTA 카드: 가격 기준 라벨 13px + 가격 28px/800 + "방문 상담 문의하기"(주 CTA, #3182f6 채움, radius 12px) + "비교함에 담기/빼기"(아웃라인, 보더 #e5e8eb) + 면책 문구 12px #8b95a1 ("문의는 시설에 바로 전달되며, 살펴는 상담 과정에 개입하지 않아요.")
  - 출처 안내 박스: #e8f3ff, info 아이콘, 13px #1b64da

### ④ AI 비교 리포트 (view=report) — 배경 #f9fafb, max-width 880px
- 헤더 카드: 킥커 "우리 집 기준 비교 리포트" 13px/700/#3182f6 + 타이틀 "분당구 정자동 자택 기준 · {버티컬} {N}곳" 24px/800 + 설명
- 비교 테이블 카드: 그리드 `120px + 1fr×N`. 열 머리: 시설명 15px/700, 최저가 시설에 "추천" 배지(11px/700/#3182f6/배경 #e8f3ff). 행: 가격 / 집에서 / 점검·평가 / 인증 후기 / 평균 대비 — 행 라벨 13px/600/#8b95a1, 셀 14px tabular, **각 행의 우세 값은 800/#059c62로 강조**
- AI 요약 카드: 배경 #191f28, radius 20px. sparkle 아이콘 + "AI 요약" 14px/700/#8fb8ff, 본문 15px #e5e8eb/1.75. 요약은 선택 시설의 최저가·최고평점을 근거로 동적 생성
- 하단 액션: "리포트 공유"(아웃라인) + "선택한 곳 모두 문의"(#3182f6 채움), 반반

### 공통 푸터
1px #f2f4f6 상단 보더. "살펴" 워드마크(#8b95a1) + 출처 고지 13px #b0b8c1: "가격·평가 정보 출처: 보건복지부, 건보공단, e하늘, 아이사랑, 나이스 (법정 공개 데이터)" + "요양병원 정보는 안내만 제공하며 중개하지 않습니다."

## Screens / Views (Mobile — `살펴 Mobile.dc.html`)
iPhone 프레임(390×844) 안의 4개 정적 목업: ① 홈(지역 선택 + 검색 + 버티컬 그리드 + 인기 시설 리스트 + 하단 탭바 4개: 홈/검색/비교함/마이), ② 검색 결과(필터 칩 + 카드 리스트 + 플로팅 "2곳 비교 리포트 만들기" 버튼), ③ 시설 상세(사진 + 요금표 + 점검 결과 + 인증 후기 + 하단 고정 CTA), ④ AI 비교 리포트(기준 카드 + 3열 비교 테이블 + 다크 AI 요약 + 액션 2개). 스타일 토큰은 데스크톱과 동일.

## Interactions & Behavior
- 네비: 로고 → home / 탭 클릭 → 해당 버티컬 list / 홈 버티컬 카드 → list / 시설 카드 → detail / 백링크 → list
- 비교함: 카드 체크박스 또는 상세의 "비교함에 담기" 토글. 버티컬별 독립 저장, 최대 3개(초과 시 가장 오래된 것 제거 — 프로토타입은 `slice(-3)`; 실서비스에선 안내 토스트 권장)
- 비교 바: list에서 선택 ≥1 표시, ≥2일 때만 리포트 진입 가능
- 리포트: 열 수는 선택 개수(2~3)에 맞춰 그리드 동적 생성. 최저가 → "추천" 배지, 행별 우세값 초록 강조
- hover 상태: 카드(보더 틴트+그림자), 버튼(#1b64da), 탭(#f2f4f6). 프로토타입에는 transition 미지정 — 구현 시 `150ms ease` 권장
- 로딩/에러/빈 상태는 프로토타입에 없음 — 구현 필요 (특히 비교함 0~1개 상태의 리포트 접근 차단)

## State Management
- `view`: "home" | "list" | "detail" | "report" (실서비스는 라우트로: `/`, `/:vertical`, `/:vertical/:id`, `/:vertical/compare`)
- `vertical`: "post" | "nursing" | "funeral" | "daycare" | "academy"
- `selected`: Record<vertical, facilityId[]> (max 3) — 세션 간 유지 권장(localStorage)
- 시설 데이터 스키마(로직 클래스 `data()` 참조): `id, name, meta, dist, b1(점검 배지), b2(특성 배지), price, rating, reviews, vsAvg, priceRows[{room,note,price}], inspects[{title,date,result}], review{meta,text}`
- 버티컬 메타: `label, sub, priceLabel(가격 기준 문구 — 버티컬마다 다름), source(데이터 출처), count`
- 데이터 소스(실연동 대상): 모자보건법 요금 공개, 건보공단 장기요양기관 평가, e하늘 장사정보, 아이사랑/유치원알리미, 나이스 교습비 공개

## Design Tokens
톤은 밝고 신뢰감 있는 핀테크 스타일(파랑 계열 모던 UI).
- **Colors**: Primary #3182f6 / Primary-hover #1b64da / Primary-tint #e8f3ff / Primary-tint-border #c9dffc · Text #191f28 / Secondary #4e5968 / Tertiary #6d7684 / Muted #8b95a1 / Disabled #b0b8c1 · Border #e5e8eb / Hairline #f2f4f6 / Surface-alt #f9fafb / Placeholder #e8ebef · Positive #059c62 / Positive-tint #e7f6ee · Dark surface #191f28 / Dark-on-blue #8fb8ff / Dark-body #e5e8eb
- **Typography**: Pretendard Variable (CDN: `cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/...`), fallback -apple-system. 스케일: 46/800 (H1), 28/800, 26/800, 24/800 (섹션), 18/700, 17/700 (카드 제목), 15~16/600-700 (본문·버튼), 13~14 (메타), 11~12/700 (배지). 큰 제목 letter-spacing -0.5 ~ -1.2px. 숫자·가격은 `font-variant-numeric: tabular-nums`
- **Radius**: 6px (배지) / 10px (탭·소버튼) / 12px (버튼·스트립) / 14px (아이콘 타일·행 카드) / 16px (검색바) / 20px (카드) / 999px (칩)
- **Spacing**: 4의 배수. 카드 패딩 20~24px, 그리드 gap 14px, 섹션 간 24~64px
- **Shadows**: 검색바 `0 8px 28px rgba(49,130,246,0.12)` / 카드 hover `0 6px 20px rgba(0,0,0,0.05)`

## Assets
- 폰트: Pretendard Variable (jsDelivr CDN)
- 아이콘: 전부 인라인 SVG stroke 아이콘 (Lucide 스타일, stroke-width 1.8~2.5) — 구현 시 `lucide-react` 대체 가능 (bell, search, chevron, shield, check-circle, sparkles, map-pin, user, home, arrows 등)
- 시설 사진: 전부 회색 플레이스홀더(#e8ebef) — 실제 이미지로 교체 필요
- 로고: 텍스트 워드마크 "살펴"만 사용 — 정식 로고 별도 제작 필요

## Files
- `살펴 Desktop.dc.html` — 데스크톱 인터랙티브 프로토타입 (주 레퍼런스; 4개 뷰 + 5개 버티컬 전체 데이터)
- `살펴 Mobile.dc.html` — 모바일 목업 4화면 (정적)
- `ios-frame.jsx` — 모바일 목업용 iPhone 프레임 컴포넌트 (디자인 아님, 구현 대상 아님)
