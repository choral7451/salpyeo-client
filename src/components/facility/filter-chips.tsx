"use client";

import { cn } from "@/lib/utils";
import type { Facility } from "@/types/facility";

export type FilterKey = "priceDisclosed" | "noIssue" | "reviews10" | "within15";

export interface FilterDef {
  key: FilterKey;
  label: string;
  predicate: (f: Facility) => boolean;
}

export const FILTERS: FilterDef[] = [
  { key: "priceDisclosed", label: "가격 공개 시설만", predicate: () => true },
  {
    key: "noIssue",
    label: "점검 지적 없음",
    predicate: (f) => f.inspections.every((i) => i.result === "지적 없음"),
  },
  { key: "reviews10", label: "인증 후기 10건 이상", predicate: (f) => f.reviewCount >= 10 },
  { key: "within15", label: "집에서 15분 이내", predicate: (f) => f.distance.minutes <= 15 },
];

export function FilterChips({
  active,
  onToggle,
}: {
  active: ReadonlySet<FilterKey>;
  onToggle: (key: FilterKey) => void;
}) {
  return (
    <div role="group" aria-label="필터" className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const isOn = active.has(f.key);
        return (
          <button
            key={f.key}
            type="button"
            aria-pressed={isOn}
            onClick={() => onToggle(f.key)}
            className={cn(
              "rounded-full border px-3.5 py-2 text-sm transition-colors duration-150",
              isOn
                ? "border-primary-tint-border bg-primary-tint font-bold text-primary"
                : "border-line bg-surface font-semibold text-text-secondary hover:bg-surface-alt",
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
