"use client";

import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

import type { Facility } from "@/types/facility";

export interface RegionSelection {
  sido: string;
  sigungu: string;
}

export const ALL_REGIONS: RegionSelection = { sido: "", sigungu: "" };

/** 시설 목록에서 시도 → 시군구 옵션을 만든다 (데이터에 실제로 있는 지역만 노출) */
export function useRegionOptions(facilities: Facility[], sido: string) {
  return useMemo(() => {
    const sidoCounts = new Map<string, number>();
    const sigunguCounts = new Map<string, number>();
    for (const f of facilities) {
      if (!f.region.sido) continue;
      sidoCounts.set(f.region.sido, (sidoCounts.get(f.region.sido) ?? 0) + 1);
      if (f.region.sido === sido && f.region.sigungu) {
        sigunguCounts.set(f.region.sigungu, (sigunguCounts.get(f.region.sigungu) ?? 0) + 1);
      }
    }
    const byCount = (a: [string, number], b: [string, number]) =>
      b[1] - a[1] || a[0].localeCompare(b[0], "ko");
    return {
      sidos: [...sidoCounts.entries()].sort(byCount),
      sigungus: [...sigunguCounts.entries()].sort(byCount),
    };
  }, [facilities, sido]);
}

export function matchesRegion(facility: Facility, region: RegionSelection): boolean {
  if (region.sido && facility.region.sido !== region.sido) return false;
  if (region.sigungu && facility.region.sigungu !== region.sigungu) return false;
  return true;
}

function Select({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: [string, number][];
}) {
  return (
    <label className="relative flex h-11 min-w-0 flex-1 items-center gap-1 rounded-full border border-line bg-surface pr-7 pl-4 text-sm font-semibold text-text-secondary sm:h-9 sm:flex-none">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none truncate bg-transparent outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map(([name, count]) => (
          <option key={name} value={name}>
            {name} ({count})
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        strokeWidth={2.5}
        aria-hidden
        className="pointer-events-none absolute right-3 text-text-muted"
      />
    </label>
  );
}

/** 시도·시군구 2단 지역 선택. 시도를 바꾸면 시군구는 초기화된다. */
export function RegionFilter({
  facilities,
  value,
  onChange,
}: {
  facilities: Facility[];
  value: RegionSelection;
  onChange: (region: RegionSelection) => void;
}) {
  const { sidos, sigungus } = useRegionOptions(facilities, value.sido);

  return (
    // 모바일에서는 두 칸이 화면을 반씩 나눠 쓴다 (시도만 있으면 전체 너비)
    <div role="group" aria-label="지역 선택" className="flex flex-1 gap-2 sm:flex-none">
      <Select
        label="시도"
        value={value.sido}
        placeholder="전국"
        options={sidos}
        onChange={(sido) => onChange({ sido, sigungu: "" })}
      />
      {/* 시군구는 시도를 고른 뒤에만 — 비활성 상태로 자리만 차지하지 않게 */}
      {value.sido ? (
        <Select
          label="시군구"
          value={value.sigungu}
          placeholder="전체 시군구"
          options={sigungus}
          onChange={(sigungu) => onChange({ ...value, sigungu })}
        />
      ) : null}
    </div>
  );
}
