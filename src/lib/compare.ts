import { formatPrice, formatRating, formatVsAvg } from "@/lib/format";
import type { Facility, VerticalMeta } from "@/types/facility";

export interface CompareCell {
  text: string;
  best: boolean;
}

export interface CompareRow {
  label: string;
  cells: CompareCell[];
}

export interface CompareReport {
  columns: { id: string; name: string; recommended: boolean }[];
  rows: CompareRow[];
  cheapest: Facility;
  topRated: Facility;
  summary: string;
}

function pick(items: Facility[], better: (a: Facility, b: Facility) => boolean) {
  return items.reduce((a, b) => (better(a, b) ? a : b));
}

/**
 * 선택된 시설들을 비교 리포트 형태로 정리.
 * 가격이 가장 낮은 곳 → "추천", 행별 우세 값 → best 표시.
 * 공공데이터에 없는 값(가격 0 = 미공개, 평점 0, 거리 0)은 우세 판정에서 제외한다.
 */
export function buildCompareReport(
  vertical: VerticalMeta,
  items: Facility[],
): CompareReport | null {
  if (items.length < 2) return null;

  const priced = items.filter((f) => f.price > 0);
  const cheapest = pick(priced.length > 0 ? priced : items, (a, b) => a.price <= b.price);
  const topRated = pick(items, (a, b) => a.rating >= b.rating);
  const hasRating = topRated.rating > 0;
  const located = items.filter((f) => f.distance.minutes > 0);
  const nearest =
    located.length > 0 ? pick(located, (a, b) => a.distance.minutes <= b.distance.minutes) : null;

  const row = (
    label: string,
    text: (f: Facility) => string,
    bestId: string | null,
  ): CompareRow => ({
    label,
    cells: items.map((f) => ({ text: text(f), best: f.id === bestId })),
  });

  const rows: CompareRow[] = [
    row(vertical.priceLabel, (f) => formatPrice(f.price), priced.length > 0 ? cheapest.id : null),
    row("지역", (f) => f.meta, null),
    row("운영주체", (f) => f.operator || "-", null),
    row("집에서", (f) => f.distance.label || "-", nearest?.id ?? null),
    row("점검·평가", (f) => f.badges.inspection || "정보 없음", null),
    row(
      "인증 후기",
      (f) => (f.reviewCount > 0 ? `${formatRating(f.rating)} · ${f.reviewCount}건` : "없음"),
      hasRating ? topRated.id : null,
    ),
    row("평균 대비", (f) => (f.price > 0 ? formatVsAvg(f.vsAvgPercent) : "-"), null),
  ];

  const summary =
    (priced.length > 0
      ? `선택하신 ${items.length}곳 중 ${cheapest.name}의 2주 일반실 요금이 ${formatPrice(cheapest.price)}으로 가장 낮아요. `
      : `선택하신 ${items.length}곳 모두 일반실 요금이 공개되지 않았어요. `) +
    (hasRating
      ? `후기 평점은 ${topRated.name}이 ${formatRating(topRated.rating)}점으로 가장 높아요. `
      : `점검 결과와 인증 후기는 아직 연동 전이라 요금과 운영주체 위주로 비교했어요. `) +
    (priced.length > 0 ? `${cheapest.name} 우선 상담을 추천해요. ` : "") +
    `모든 수치는 보건복지부 공개 자료 기준입니다.`;

  return {
    columns: items.map((f) => ({
      id: f.id,
      name: f.name,
      recommended: f.id === cheapest.id,
    })),
    rows,
    cheapest,
    topRated,
    summary,
  };
}
