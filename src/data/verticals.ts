import type { VerticalKey, VerticalMeta } from "@/types/facility";

/**
 * 버티컬 메타 정보.
 * `enabled`를 true로 바꾸면 해당 버티컬의 목록/상세/리포트가 활성화됩니다.
 */
export const VERTICALS: readonly VerticalMeta[] = [
  {
    key: "post",
    label: "산후조리원",
    sub: "2주 요금 · 보건소 점검 결과",
    priceLabel: "2주 일반실",
    source: "모자보건법 요금 공개",
    count: 24,
    enabled: true,
  },
  {
    key: "nursing",
    label: "요양원",
    sub: "장기요양 평가등급 · 비급여 식대",
    priceLabel: "월 본인부담 (비급여 포함)",
    source: "건보공단 장기요양기관 평가",
    count: 18,
    enabled: false,
  },
  {
    key: "funeral",
    label: "장례식장",
    sub: "e하늘 공개 가격 · 빈소 규모",
    priceLabel: "빈소 1일 사용료 (중형)",
    source: "e하늘 장사정보 가격 공개",
    count: 9,
    enabled: false,
  },
  {
    key: "daycare",
    label: "어린이집·유치원",
    sub: "평가인증 · 입소 대기 현황",
    priceLabel: "월 부담금 (특별활동 포함)",
    source: "아이사랑 · 유치원알리미",
    count: 31,
    enabled: false,
  },
  {
    key: "academy",
    label: "학원",
    sub: "나이스 교습비 공개 · 정원",
    priceLabel: "월 교습비",
    source: "나이스 교습비 공개",
    count: 57,
    enabled: false,
  },
];

export const VERTICAL_MAP: Record<VerticalKey, VerticalMeta> = Object.fromEntries(
  VERTICALS.map((v) => [v.key, v]),
) as Record<VerticalKey, VerticalMeta>;

/** 현재 서비스 중인 기본 버티컬 */
export const DEFAULT_VERTICAL: VerticalKey = "post";

/** 프로토타입 기준 사용자 위치 (실서비스에서는 사용자 설정값) */
export const HOME_LOCATION = {
  district: "분당구",
  dong: "정자동",
  full: "분당구 정자동",
} as const;
