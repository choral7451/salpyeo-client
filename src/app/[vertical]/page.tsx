import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { FacilityListView } from "@/components/facility/facility-list-view";
import { HOME_LOCATION } from "@/data/verticals";
import { getFacilities } from "@/lib/api/facilities";
import { resolveVertical, verticalStaticParams } from "@/lib/vertical-params";

type Props = {
  params: Promise<{ vertical: string }>;
  searchParams: Promise<{ q?: string }>;
};

export function generateStaticParams() {
  return verticalStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = resolveVertical((await params).vertical);
  return { title: `${HOME_LOCATION.district} ${vertical.label}` };
}

export default async function FacilityListPage({ params, searchParams }: Props) {
  const [{ vertical: verticalParam }, { q }] = await Promise.all([params, searchParams]);
  const vertical = resolveVertical(verticalParam);

  if (!vertical.enabled) return <ComingSoon vertical={vertical} />;

  const facilities = await getFacilities(vertical.key);

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page pt-8 pb-[140px]">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-[28px] font-extrabold tracking-[-0.6px] text-text">
            {HOME_LOCATION.district} {vertical.label}
          </h1>
          <span className="text-[15px] text-text-tertiary">
            {vertical.count}곳 · {vertical.source}
          </span>
          {q ? (
            <span className="text-[15px] text-text-muted">
              “{q}” 검색 결과
            </span>
          ) : null}
        </div>
        <FacilityListView vertical={vertical} facilities={facilities} query={q} />
      </div>
    </div>
  );
}
