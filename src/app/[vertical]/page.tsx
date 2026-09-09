import type { Metadata } from "next";
import { Suspense } from "react";

import { ComingSoon } from "@/components/common/coming-soon";
import { FacilityListView } from "@/components/facility/facility-list-view";
import { SERVICE_REGION } from "@/data/verticals";
import { getFacilities } from "@/lib/api/facilities";
import { formatAsOf } from "@/lib/format";
import { resolveVertical, verticalStaticParams } from "@/lib/vertical-params";

type Props = { params: Promise<{ vertical: string }> };

export function generateStaticParams() {
  return verticalStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = await resolveVertical((await params).vertical);
  return { title: `${SERVICE_REGION.label} ${vertical.label}` };
}

export default async function FacilityListPage({ params }: Props) {
  const { vertical: verticalParam } = await params;
  const vertical = await resolveVertical(verticalParam);

  if (!vertical.enabled) return <ComingSoon vertical={vertical} />;

  // 전체를 한 번에 받아 검색·지역·정렬은 클라이언트에서 처리한다 (지역 옵션과 개수가 검색어에 흔들리지 않도록)
  const facilities = await getFacilities(vertical.key);

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page pt-8 pb-[140px]">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-[28px] font-extrabold tracking-[-0.6px] text-text">
            {SERVICE_REGION.label} {vertical.label}
          </h1>
          <span className="text-[15px] text-text-tertiary">
            {vertical.count}곳 · {vertical.source}
            {vertical.asOf ? ` · ${formatAsOf(vertical.asOf)} 기준` : null}
          </span>
        </div>
        {/* 목록 뷰가 검색·정렬 상태를 쿼리에서 읽는다(useSearchParams) — 정적 프리렌더가 막히지 않도록 감싼다 */}
        <Suspense fallback={null}>
          <FacilityListView vertical={vertical} facilities={facilities} />
        </Suspense>
      </div>
    </div>
  );
}
