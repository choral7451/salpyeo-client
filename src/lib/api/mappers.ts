import type { Facility, VerticalMeta } from "@/types/facility";

import type { FacilityDto, VerticalDto } from "./types";

export function toVerticalMeta(dto: VerticalDto): VerticalMeta {
  return {
    key: dto.key,
    label: dto.label,
    sub: dto.sub,
    priceLabel: dto.priceLabel,
    source: dto.source,
    asOf: dto.asOf ?? null,
    count: dto.count,
    enabled: dto.enabled,
  };
}

/** 백엔드 slug 가 프론트의 URL 식별자(id) */
export function toFacility(dto: FacilityDto): Facility {
  return {
    id: dto.slug,
    vertical: dto.vertical,
    name: dto.name,
    meta: dto.meta,
    // 아래 4개는 공공데이터 연동(artinfo-server PR #15) 이후 추가된 필드 — 구버전 API 응답에도 깨지지 않도록 빈 값 폴백
    region: dto.region ?? { sido: "", sigungu: "" },
    operator: dto.operator ?? "",
    address: dto.address ?? "",
    phone: dto.phone ?? "",
    website: dto.website ?? "",
    images: dto.images,
    distance: dto.distance,
    badges: dto.badges,
    price: dto.price,
    rating: dto.rating,
    reviewCount: dto.reviewCount,
    vsAvgPercent: dto.vsAvgPercent,
    priceRows: dto.priceRows,
    inspections: dto.inspections,
    review: dto.review,
  };
}
