"use client";

import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { useCompare } from "@/hooks/use-compare";
import { readListParams, toListQuery } from "@/lib/list-params";
import type { Facility, VerticalMeta } from "@/types/facility";

import { CompareBar } from "./compare-bar";
import { FacilityCard } from "./facility-card";
import { matchesRegion, RegionFilter, type RegionSelection } from "./region-filter";
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
  const searchParams = useSearchParams();
  const initial = readListParams(searchParams);
  const [sort, setSort] = useState<SortKey>(
    SORTS.some((s) => s.key === initial.sort) ? (initial.sort as SortKey) : "priceAsc",
  );
  const [region, setRegion] = useState<RegionSelection>({
    sido: initial.sido ?? "",
    sigungu: initial.sigungu ?? "",
  });
  const { hydrated, isSelected, toggle } = useCompare(vertical.key);

  const listQuery = toListQuery({ q: query, sort, sido: region.sido, sigungu: region.sigungu });

  // 서버 재요청 없이 주소만 바꿔 둔다 — 뒤로 오거나 링크를 공유해도 같은 화면이 복원된다
  useEffect(() => {
    const next = listQuery ? `?${listQuery}` : window.location.pathname;
    if (window.location.search.slice(1) !== listQuery) {
      window.history.replaceState(null, "", next);
    }
  }, [listQuery]);

  // 브라우저 뒤로/앞으로 로 주소가 바뀌면 화면 상태도 따라간다
  useEffect(() => {
    const restore = () => {
      const params = readListParams(new URLSearchParams(window.location.search));
      setRegion({ sido: params.sido ?? "", sigungu: params.sigungu ?? "" });
      setSort(SORTS.some((s) => s.key === params.sort) ? (params.sort as SortKey) : "priceAsc");
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  const visible = useMemo(() => {
    const q = query?.trim().toLowerCase();
    const compare = SORTS.find((s) => s.key === sort)?.compare;
    return facilities
      .filter((f) => matchesRegion(f, region))
      .filter(
        (f) =>
          !q ||
          [f.name, f.meta, f.address].some((v) => v.toLowerCase().includes(q)),
      )
      .sort(compare);
  }, [facilities, query, sort, region]);

  return (
    <>
      <div className="mt-[18px] flex flex-wrap items-center gap-2">
        <RegionFilter facilities={facilities} value={region} onChange={setRegion} />
        <span className="text-[13px] font-semibold text-text-tertiary">
          {visible.length}곳
        </span>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {visible.length === 0 ? (
        <EmptyState
          className="mt-5"
          icon={<SearchX size={26} />}
          title="조건에 맞는 시설이 없어요"
          description="지역을 바꾸거나 다른 검색어로 다시 찾아보세요."
        />
      ) : (
        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-3.5 max-sm:grid-cols-1">
          {visible.map((f) => (
            <FacilityCard
              key={f.id}
              facility={f}
              listQuery={listQuery}
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
