/** 서비스가 다루는 5개 버티컬 */
export const VERTICAL_KEYS = [
  "post",
  "nursing",
  "funeral",
  "daycare",
  "academy",
] as const;

export type VerticalKey = (typeof VERTICAL_KEYS)[number];

export function isVerticalKey(value: string): value is VerticalKey {
  return (VERTICAL_KEYS as readonly string[]).includes(value);
}

export interface VerticalMeta {
  key: VerticalKey;
  /** 탭·카드 라벨 (예: 산후조리원) */
  label: string;
  /** 홈 카드 부제 (예: 2주 요금 · 보건소 점검 결과) */
  sub: string;
  /** 가격 기준 문구 — 버티컬마다 다름 (예: 2주 일반실) */
  priceLabel: string;
  /** 데이터 출처 (예: 모자보건법 요금 공개) */
  source: string;
  /** 지역 내 시설 수 */
  count: number;
  /** false면 UI에 노출되지만 진입 불가 (준비 중) */
  enabled: boolean;
}

export interface PriceRow {
  room: string;
  note: string;
  /** 표시용 문자열 — "0원", "무료" 같은 예외 케이스 포함 */
  price: string;
}

export interface Inspection {
  title: string;
  /** 기관 · 날짜 (예: 분당구보건소 · 2026.05) */
  date: string;
  /** 결과 문구 (예: 지적 없음) */
  result: string;
}

export interface Review {
  meta: string;
  text: string;
}

export interface FacilityImage {
  url: string;
  /** 대체 텍스트 겸 갤러리 캡션 (예: 신생아실) */
  alt: string;
  width: number;
  height: number;
}

export interface Facility {
  id: string;
  vertical: VerticalKey;
  name: string;
  /** 위치 요약 (예: 정자역 도보 6분) */
  meta: string;
  /** 시설 사진. 첫 번째가 대표 사진(목록 썸네일) */
  images: FacilityImage[];
  distance: {
    label: string;
    minutes: number;
  };
  badges: {
    /** 점검·평가 배지 (초록) */
    inspection: string;
    /** 특성 배지 (파랑) */
    feature: string;
  };
  /** 대표 가격 (원 단위) — 정렬·비교 계산에 사용 */
  price: number;
  rating: number;
  reviewCount: number;
  /** 지역 평균 대비 %. 음수 = 저렴, 양수 = 비쌈, 0 = 평균 수준 */
  vsAvgPercent: number;
  priceRows: PriceRow[];
  inspections: Inspection[];
  review: Review;
}
