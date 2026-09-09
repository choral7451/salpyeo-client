import { Card, CardTitle } from "@/components/ui/card";
import { formatAsOf, formatVsAvg } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PriceRow } from "@/types/facility";

export function PriceTable({
  rows,
  source,
  asOf,
  regionLabel,
  vsAvgPercent,
}: {
  rows: PriceRow[];
  source: string;
  /** 데이터 기준일 (YYYY-MM-DD) */
  asOf: string | null;
  /** 평균 대비 비교 범위 (예: 서울) */
  regionLabel: string;
  vsAvgPercent: number;
}) {
  return (
    <Card className="p-6">
      <CardTitle>공개 요금표</CardTitle>
      <p className="mt-1 text-[13px] text-text-muted">
        {source}
        {asOf ? ` · ${formatAsOf(asOf)} 기준` : null}
      </p>
      <div className="mt-3.5 overflow-hidden rounded-xl border border-hairline">
        {rows.length === 0 ? (
          <p className="px-[18px] py-5 text-sm text-text-tertiary">
            공개된 요금 정보가 아직 없어요.
          </p>
        ) : null}
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
            {regionLabel || "지역"} 일반실 평균 대비
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
