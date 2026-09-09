"use client";

import { Search, X } from "lucide-react";

/** 목록 안에서 이름·지역·주소로 좁히는 검색창 */
export function FacilitySearch({
  value,
  onChange,
  placeholder = "시설 이름·지역·주소로 검색",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative flex min-w-[240px] flex-1 items-center">
      <Search
        size={15}
        strokeWidth={2.5}
        aria-hidden
        className="pointer-events-none absolute left-3.5 text-text-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="시설 검색"
        className="w-full rounded-full border border-line bg-surface py-2 pr-9 pl-9 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="검색어 지우기"
          className="absolute right-2.5 flex size-6 items-center justify-center rounded-full text-text-muted hover:bg-surface-alt hover:text-text"
        >
          <X size={14} strokeWidth={2.5} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
