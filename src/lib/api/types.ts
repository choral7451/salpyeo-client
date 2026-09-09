import type { VerticalKey } from "@/types/facility";

/** 백엔드 응답 DTO — artinfo-server `src/salpyeo/facility/presentation/dto/response` 와 1:1 */

export interface VerticalDto {
  key: VerticalKey;
  label: string;
  sub: string;
  priceLabel: string;
  source: string;
  asOf: string | null;
  count: number;
  enabled: boolean;
}

export interface FacilityDto {
  slug: string;
  vertical: VerticalKey;
  name: string;
  meta: string;
  region: { sido: string; sigungu: string };
  operator: string;
  address: string;
  phone: string;
  website: string;
  distance: { label: string; minutes: number };
  badges: { inspection: string; feature: string };
  price: number;
  rating: number;
  reviewCount: number;
  vsAvgPercent: number;
  images: { url: string; alt: string; width: number; height: number }[];
  priceRows: { room: string; note: string; price: string }[];
  inspections: { title: string; date: string; result: string }[];
  review: { meta: string; text: string } | null;
}

export type FacilitySort = "priceAsc" | "ratingDesc" | "reviewsDesc" | "distanceAsc";
