import type { Metadata } from "next";
import { Suspense } from "react";

import { ComingSoon } from "@/components/common/coming-soon";
import { FacilityListView } from "@/components/facility/facility-list-view";
import { SERVICE_REGION } from "@/data/verticals";
import { getFacilities, toListFacility } from "@/lib/api/facilities";
import { routes } from "@/lib/routes";
import { isIndexableVertical } from "@/lib/site";
import { resolveVertical, verticalStaticParams } from "@/lib/vertical-params";

type Props = { params: Promise<{ vertical: string }> };

export function generateStaticParams() {
  return verticalStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = await resolveVertical((await params).vertical);
  const title = `${SERVICE_REGION.label} ${vertical.label} 요금 비교`;
  const description = vertical.enabled
    ? `${SERVICE_REGION.label} ${vertical.label} ${vertical.count}곳의 ${vertical.priceLabel} 요금을 한 화면에서 비교하세요. ${vertical.source} 공개 자료 기준.`
    : `${vertical.label} 정보는 준비 중입니다.`;
  const path = routes.list(vertical.key);

  return {
    title,
    description,
    alternates: { canonical: path },
    // 데이터가 없는 버티컬은 색인시키지 않는다 (빈 목록이 검색에 걸리면 손해)
    robots: isIndexableVertical(vertical.key) && vertical.enabled ? undefined : { index: false, follow: true },
    openGraph: { type: "website", url: path, title, description },
  };
}

export default async function FacilityListPage({ params }: Props) {
  const { vertical: verticalParam } = await params;
  const vertical = await resolveVertical(verticalParam);

  if (!vertical.enabled) return <ComingSoon vertical={vertical} />;

  // 전체를 한 번에 받아 검색·지역·정렬은 클라이언트에서 처리한다 (지역 옵션과 개수가 검색어에 흔들리지 않도록)
  // 카드에 안 쓰는 필드(요금표·점검·후기·대표 외 사진)는 덜어 내고 넘긴다 — 페이지 용량 절반 이상 차이
  const facilities = (await getFacilities(vertical.key)).map(toListFacility);

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page pt-8 pb-[140px]">
        {/*
          제목만 둔다. 시설 수는 필터 줄에 있고(중복), 출처·기준일은 상세의 요금표에서 밝힌다 —
          목록 상단에서는 검색·필터로 바로 넘어가는 게 낫다.
        */}
        <h1 className="text-[28px] font-extrabold tracking-[-0.6px] text-text max-sm:text-[24px]">
          {SERVICE_REGION.label} {vertical.label}
        </h1>
        {/* 목록 뷰가 검색·정렬 상태를 쿼리에서 읽는다(useSearchParams) — 정적 프리렌더가 막히지 않도록 감싼다 */}
        <Suspense fallback={null}>
          <FacilityListView vertical={vertical} facilities={facilities} />
        </Suspense>
      </div>
    </div>
  );
}
