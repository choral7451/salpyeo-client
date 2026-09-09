import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BackLink } from "@/components/common/back-link";
import { DetailSidebar } from "@/components/detail/detail-sidebar";
import { FacilityHeaderCard } from "@/components/detail/facility-header-card";
import { InspectionList } from "@/components/detail/inspection-list";
import { PriceTable } from "@/components/detail/price-table";
import { ReviewCard } from "@/components/detail/review-card";
import { getFacilities, getFacility, getVerticals } from "@/lib/api/facilities";
import { routes } from "@/lib/routes";
import { resolveVertical } from "@/lib/vertical-params";

type Props = { params: Promise<{ vertical: string; id: string }> };

export async function generateStaticParams() {
  // 빌드 시 API 가 꺼져 있어도 빌드가 깨지지 않도록 — 실패하면 요청 시 렌더링으로 대체
  try {
    const verticals = (await getVerticals()).filter((v) => v.enabled);
    const lists = await Promise.all(verticals.map((v) => getFacilities(v.key)));
    return lists.flat().map((f) => ({ vertical: f.vertical, id: f.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vertical: verticalParam, id } = await params;
  const vertical = await resolveVertical(verticalParam);
  const facility = vertical.enabled ? await getFacility(vertical.key, id) : null;
  return { title: facility?.name ?? vertical.label };
}

export default async function FacilityDetailPage({ params }: Props) {
  const { vertical: verticalParam, id } = await params;
  const vertical = await resolveVertical(verticalParam);

  if (!vertical.enabled) redirect(routes.list(vertical.key));

  const facility = await getFacility(vertical.key, id);
  if (!facility) notFound();

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page pt-7 pb-24">
        <BackLink href={routes.list(vertical.key)}>목록으로</BackLink>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_340px] items-start gap-5 max-lg:grid-cols-1">
          <div className="flex flex-col gap-4">
            <FacilityHeaderCard facility={facility} />
            <PriceTable
              rows={facility.priceRows}
              source={vertical.source}
              asOf={vertical.asOf}
              regionLabel={facility.region.sido}
              vsAvgPercent={facility.vsAvgPercent}
            />
            <InspectionList inspections={facility.inspections} />
            <ReviewCard review={facility.review} total={facility.reviewCount} />
          </div>
          <DetailSidebar facility={facility} priceLabel={vertical.priceLabel} />
        </div>
      </div>
    </div>
  );
}
