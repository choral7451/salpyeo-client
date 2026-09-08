"use client";

import { ChevronDown } from "lucide-react";

import type { Facility } from "@/types/facility";

export type SortKey = "priceAsc" | "ratingDesc" | "reviewsDesc" | "distanceAsc";

export const SORTS: { key: SortKey; label: string; compare: (a: Facility, b: Facility) => number }[] = [
  { key: "priceAsc", label: "가격 낮은순", compare: (a, b) => a.price - b.price },
  { key: "ratingDesc", label: "평점 높은순", compare: (a, b) => b.rating - a.rating },
  { key: "reviewsDesc", label: "후기 많은순", compare: (a, b) => b.reviewCount - a.reviewCount },
  { key: "distanceAsc", label: "가까운순", compare: (a, b) => a.distance.minutes - b.distance.minutes },
];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  return (
    <label className="relative ml-auto flex items-center gap-1 py-2 text-sm font-semibold text-text-secondary">
      <span className="sr-only">정렬</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="cursor-pointer appearance-none bg-transparent pr-5 outline-none"
      >
        {SORTS.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        strokeWidth={2.5}
        aria-hidden
        className="pointer-events-none absolute right-0 text-text-muted"
      />
    </label>
  );
}
