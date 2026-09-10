"use client";

import { ChevronDown } from "lucide-react";

import type { Facility } from "@/types/facility";

export type SortKey = "priceAsc" | "ratingDesc" | "reviewsDesc" | "distanceAsc";

/** price 0 은 "미공개" — 낮은순에서 맨 뒤로 보낸다 (서버 정렬과 같은 규칙) */
const priceOrUnknown = (f: Facility) => (f.price > 0 ? f.price : Number.MAX_SAFE_INTEGER);

export const SORTS: { key: SortKey; label: string; compare: (a: Facility, b: Facility) => number }[] = [
  { key: "priceAsc", label: "가격 낮은순", compare: (a, b) => priceOrUnknown(a) - priceOrUnknown(b) },
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
    <label className="relative flex h-11 items-center gap-1 text-sm font-semibold text-text-secondary sm:h-9">
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
