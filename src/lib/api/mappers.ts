import type { Facility, VerticalMeta } from "@/types/facility";

import type { FacilityDto, VerticalDto } from "./types";

export function toVerticalMeta(dto: VerticalDto): VerticalMeta {
  return {
    key: dto.key,
    label: dto.label,
    sub: dto.sub,
    priceLabel: dto.priceLabel,
    source: dto.source,
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
    images: dto.images,
    distance: dto.distance,
    badges: dto.badges,
    price: dto.price,
    rating: dto.rating,
    reviewCount: dto.reviewCount,
    vsAvgPercent: dto.vsAvgPercent,
    priceRows: dto.priceRows,
    inspections: dto.inspections,
    review: dto.review ?? { meta: "", text: "" },
  };
}
