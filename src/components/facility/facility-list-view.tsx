"use client";

import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { useCompare } from "@/hooks/use-compare";
import { readListParams, toListQuery } from "@/lib/list-params";
import type { Facility, VerticalMeta } from "@/types/facility";

import { CompareBar } from "./compare-bar";
import { FacilityCard } from "./facility-card";
import { FacilitySearch } from "./facility-search";
import { matchesRegion, RegionFilter, type RegionSelection } from "./region-filter";
import { SORTS, SortSelect, type SortKey } from "./sort-select";

/**
 * 한 번에 그리는 카드 수. 전국 456곳을 통째로 그리면 카드마다 이미지가 붙어
 * 모바일에서 첫 렌더가 눈에 띄게 느려진다. 스크롤이 끝에 닿으면 이어서 붙인다.
 */
const PAGE_SIZE = 24;

export function FacilityListView({
  vertical,
  facilities,
}: {
  vertical: VerticalMeta;
  facilities: Facility[];
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
  const [keyword, setKeyword] = useState(initial.q ?? "");
  const { hydrated, isSelected, toggle } = useCompare(vertical.key);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinel = useRef<HTMLDivElement>(null);

  const listQuery = toListQuery({ q: keyword, sort, sido: region.sido, sigungu: region.sigungu });

  // 조건이 바뀌면 다시 처음부터 보여 준다
  const changeKeyword = (value: string) => {
    setKeyword(value);
    setVisibleCount(PAGE_SIZE);
  };
  const changeRegion = (value: RegionSelection) => {
    setRegion(value);
    setVisibleCount(PAGE_SIZE);
  };
  const changeSort = (value: SortKey) => {
    setSort(value);
    setVisibleCount(PAGE_SIZE);
  };

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
      setKeyword(params.q ?? "");
      setSort(SORTS.some((s) => s.key === params.sort) ? (params.sort as SortKey) : "priceAsc");
      setVisibleCount(PAGE_SIZE);
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  const showMore = useCallback(() => setVisibleCount((n) => n + PAGE_SIZE), []);

  const matched = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    const compare = SORTS.find((s) => s.key === sort)?.compare;
    return facilities
      .filter((f) => matchesRegion(f, region))
      .filter(
        (f) =>
          !q ||
          [f.name, f.meta, f.address].some((v) => v.toLowerCase().includes(q)),
      )
      .sort(compare);
  }, [facilities, keyword, sort, region]);

  const visible = matched.slice(0, visibleCount);
  const hasMore = matched.length > visible.length;

  // 목록 끝이 보이면 다음 묶음을 붙인다
  useEffect(() => {
    const target = sentinel.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) showMore();
      },
      { rootMargin: "600px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, showMore]);

  return (
    <>
      <div className="mt-[18px] flex flex-wrap items-center gap-2">
        <FacilitySearch value={keyword} onChange={changeKeyword} />
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <RegionFilter facilities={facilities} value={region} onChange={changeRegion} />
        <span className="text-[13px] font-semibold text-text-tertiary">
          {matched.length}곳
        </span>
        <SortSelect value={sort} onChange={changeSort} />
      </div>

      {matched.length === 0 ? (
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

      {hasMore ? (
        <>
          <div ref={sentinel} aria-hidden className="h-px" />
          <button
            type="button"
            onClick={showMore}
            className="mt-4 w-full rounded-xl border border-line bg-surface py-3.5 text-sm font-bold text-text-secondary transition-colors hover:bg-surface-alt"
          >
            {matched.length - visible.length}곳 더 보기
          </button>
        </>
      ) : null}

      <CompareBar vertical={vertical.key} facilities={facilities} />
    </>
  );
}
