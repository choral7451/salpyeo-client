"use client";

import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { useCompare } from "@/hooks/use-compare";
import type { Facility, VerticalMeta } from "@/types/facility";

import { CompareBar } from "./compare-bar";
import { FacilityCard } from "./facility-card";
import { FILTERS, FilterChips, type FilterKey } from "./filter-chips";
import { SORTS, SortSelect, type SortKey } from "./sort-select";

export function FacilityListView({
  vertical,
  facilities,
  query,
}: {
  vertical: VerticalMeta;
  facilities: Facility[];
  query?: string;
}) {
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(
    () => new Set(["priceDisclosed"]),
  );
  const [sort, setSort] = useState<SortKey>("priceAsc");
  const { hydrated, isSelected, toggle } = useCompare(vertical.key);

  const toggleFilter = (key: FilterKey) =>
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const visible = useMemo(() => {
    const predicates = FILTERS.filter((f) => activeFilters.has(f.key)).map((f) => f.predicate);
    const q = query?.trim().toLowerCase();
    const compare = SORTS.find((s) => s.key === sort)?.compare;
    return facilities
      .filter((f) => predicates.every((p) => p(f)))
      .filter((f) => !q || f.name.toLowerCase().includes(q) || f.meta.toLowerCase().includes(q))
      .sort(compare);
  }, [facilities, activeFilters, query, sort]);

  return (
    <>
      <div className="mt-[18px] flex flex-wrap items-center gap-2">
        <FilterChips active={activeFilters} onToggle={toggleFilter} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {visible.length === 0 ? (
        <EmptyState
          className="mt-5"
          icon={<SearchX size={26} />}
          title="조건에 맞는 시설이 없어요"
          description="필터를 줄이거나 다른 검색어로 다시 찾아보세요."
        />
      ) : (
        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-3.5 max-sm:grid-cols-1">
          {visible.map((f) => (
            <FacilityCard
              key={f.id}
              facility={f}
              priceLabel={vertical.priceLabel}
              checked={hydrated && isSelected(f.id)}
              onToggleCompare={() => toggle(f.id)}
            />
          ))}
        </div>
      )}

      <CompareBar vertical={vertical.key} facilities={facilities} />
    </>
  );
}
