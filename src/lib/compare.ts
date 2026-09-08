import { formatRating, formatVsAvg, formatWon } from "@/lib/format";
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
 */
export function buildCompareReport(
  vertical: VerticalMeta,
  items: Facility[],
): CompareReport | null {
  if (items.length < 2) return null;

  const cheapest = pick(items, (a, b) => a.price <= b.price);
  const topRated = pick(items, (a, b) => a.rating >= b.rating);
  const nearest = pick(items, (a, b) => a.distance.minutes <= b.distance.minutes);

  const row = (
    label: string,
    text: (f: Facility) => string,
    bestId: string | null,
  ): CompareRow => ({
    label,
    cells: items.map((f) => ({ text: text(f), best: f.id === bestId })),
  });

  const rows: CompareRow[] = [
    row(vertical.priceLabel, (f) => formatWon(f.price), cheapest.id),
    row("집에서", (f) => f.distance.label, nearest.id),
    row("점검·평가", (f) => f.badges.inspection, null),
    row(
      "인증 후기",
      (f) => `${formatRating(f.rating)} · ${f.reviewCount}건`,
      topRated.id,
    ),
    row("평균 대비", (f) => formatVsAvg(f.vsAvgPercent), null),
  ];

  const summary =
    `선택하신 ${items.length}곳 중 ${cheapest.name}의 가격이 가장 낮고, ` +
    `후기 평점은 ${topRated.name}이 ${formatRating(topRated.rating)}점으로 가장 높아요. ` +
    `세 항목(가격·점검·후기)을 함께 보면 ${cheapest.name} 우선 상담을 추천해요. ` +
    `모든 수치는 공공기관 공개 자료 기준입니다.`;

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
