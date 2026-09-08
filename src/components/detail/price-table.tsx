import { Card, CardTitle } from "@/components/ui/card";
import { HOME_LOCATION } from "@/data/verticals";
import { formatVsAvg } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PriceRow } from "@/types/facility";

/** 공개 요금 기준일 — 실데이터 연동 시 API 응답으로 대체 */
const PRICE_AS_OF = "2026년 8월 기준";

export function PriceTable({
  rows,
  source,
  vsAvgPercent,
}: {
  rows: PriceRow[];
  source: string;
  vsAvgPercent: number;
}) {
  return (
    <Card className="p-6">
      <CardTitle>공개 요금표</CardTitle>
      <p className="mt-1 text-[13px] text-text-muted">
        {source} · {PRICE_AS_OF}
      </p>
      <div className="mt-3.5 overflow-hidden rounded-xl border border-hairline">
        {rows.map((row) => (
          <div
            key={row.room}
            className="flex items-center justify-between border-b border-hairline px-[18px] py-3.5"
          >
            <div>
              <div className="text-[15px] font-semibold text-text">{row.room}</div>
              <div className="mt-0.5 text-xs text-text-muted">{row.note}</div>
            </div>
            <span className="tabular text-base font-extrabold text-text">{row.price}</span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-surface-alt px-[18px] py-3">
          <span className="text-[13px] text-text-tertiary">
            {HOME_LOCATION.district} 평균 대비
          </span>
          <span
            className={cn(
              "text-[13px] font-bold",
              vsAvgPercent <= 0 ? "text-positive" : "text-text-secondary",
            )}
          >
            {formatVsAvg(vsAvgPercent)}
          </span>
        </div>
      </div>
    </Card>
  );
}
