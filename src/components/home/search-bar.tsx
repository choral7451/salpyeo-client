"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DEFAULT_VERTICAL, SERVICE_REGION } from "@/data/verticals";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(routes.list(DEFAULT_VERTICAL, query.trim() || undefined));
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        "flex w-full max-w-[640px] items-center gap-2 rounded-2xl border-2 border-primary bg-surface py-2 pr-2 pl-5 shadow-search max-sm:pl-4",
        className,
      )}
    >
      {/* 지역 선택은 아직 없다 — 누를 수 있는 것처럼 보이면 안 되므로 표시만 한다 */}
      <span className="shrink-0 text-[15px] font-bold text-text max-sm:hidden">
        {SERVICE_REGION.label}
      </span>
      <div aria-hidden className="h-[22px] w-px shrink-0 bg-line max-sm:hidden" />
      <input
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="시설 이름·지역·주소로 검색"
        autoComplete="off"
        aria-label="시설 검색"
        className="min-w-0 flex-1 bg-transparent text-base text-text outline-none placeholder:text-text-muted"
      />
      <Button type="submit" size="md" className="shrink-0 px-[22px] text-base max-sm:px-4">
        검색
      </Button>
    </form>
  );
}
