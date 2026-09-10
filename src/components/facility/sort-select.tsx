"use client";

import { ChevronDown } from "lucide-react";

import type { Facility } from "@/types/facility";

export type SortKey = "priceAsc" | "priceDesc";

/** price 0 은 "미공개" — 어느 방향으로 정렬하든 맨 뒤로 보낸다 (서버 정렬과 같은 규칙) */
const known = (f: Facility) => f.price > 0;

/**
 * 평점·후기·거리 정렬은 데이터가 들어오면 다시 넣는다.
 * 지금은 rating·reviewCount 가 전부 0, distance 가 비어 있어 정렬해도 순서가 바뀌지 않는다.
 */
export const SORTS: { key: SortKey; label: string; compare: (a: Facility, b: Facility) => number }[] = [
  {
    key: "priceAsc",
    label: "가격 낮은순",
    compare: (a, b) => Number(known(b)) - Number(known(a)) || a.price - b.price,
  },
  {
    key: "priceDesc",
    label: "가격 높은순",
    compare: (a, b) => Number(known(b)) - Number(known(a)) || b.price - a.price,
  },
];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  return (
    <label className="relative flex h-11 shrink-0 items-center gap-1 text-sm font-semibold text-text-secondary lg:h-9">
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
