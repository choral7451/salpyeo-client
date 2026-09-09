/**
 * 관리자 시설 편집 API (/salpyeo/admin/*).
 * 공개 응답과 달리 저장된 컬럼을 그대로 주고받는다 — 편집 폼에 그대로 채우기 위해서다.
 * 관리자가 아니면 서버가 403 SALPYEO-ADMIN-001 로 막는다.
 */
import { browserRequest } from "@/lib/api/browser-client";
import type { VerticalKey } from "@/types/facility";

export interface AdminPriceRow {
  room: string;
  note: string;
  /** 표시용 문자열 — "470만원" 처럼 그대로 화면에 나간다 */
  price: string;
}

export interface AdminImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface AdminFacility {
  slug: string;
  vertical: VerticalKey;
  name: string;
  meta: string;
  sido: string;
  sigungu: string;
  operatorType: string;
  address: string;
  phone: string;
  inspectionBadge: string;
  featureBadge: string;
  price: number;
  priceRows: AdminPriceRow[];
  images: AdminImage[];
  isActive: boolean;
  updatedAt: string;
}

/** 보낸 필드만 반영된다 */
export type AdminFacilityPatch = Partial<Omit<AdminFacility, "slug" | "vertical" | "updatedAt">>;

export async function fetchAdminFacilities(vertical: VerticalKey, keyword?: string): Promise<AdminFacility[]> {
  const params = new URLSearchParams({ vertical });
  if (keyword?.trim()) params.set("q", keyword.trim());

  const { facilities } = await browserRequest<{ facilities: AdminFacility[] }>(
    `/salpyeo/admin/facilities?${params.toString()}`,
  );
  return facilities;
}

export function fetchAdminFacility(slug: string): Promise<AdminFacility> {
  return browserRequest<AdminFacility>(`/salpyeo/admin/facilities/${encodeURIComponent(slug)}`);
}

/** 시설 사진 업로드 — S3 공개 URL 을 돌려준다. 시설 반영은 저장(PUT)에서 한다 */
export function uploadAdminFacilityImage(slug: string, file: File): Promise<AdminImage> {
  const form = new FormData();
  form.append("imageFile", file);

  return browserRequest<AdminImage>(`/salpyeo/admin/facilities/${encodeURIComponent(slug)}/images`, {
    method: "POST",
    body: form,
  });
}

export function updateAdminFacility(slug: string, patch: AdminFacilityPatch): Promise<AdminFacility> {
  return browserRequest<AdminFacility>(`/salpyeo/admin/facilities/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
}
