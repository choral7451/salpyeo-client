import "server-only";

import { VERTICAL_MAP, VERTICALS } from "@/data/verticals";
import type { Facility, VerticalKey, VerticalMeta } from "@/types/facility";
import { isVerticalKey } from "@/types/facility";

import { ApiError, apiGet, isApiEnabled } from "./client";
import { toFacility, toVerticalMeta } from "./mappers";
import type { FacilityDto, FacilitySort, VerticalDto } from "./types";

/**
 * 데이터 접근 계층.
 * - `SALPYEO_API_URL` 이 설정되면 artinfo-server `/salpyeo/*` 를 호출
 * - 없으면 버티컬 메타(코드 상수)만 있고 시설 목록은 비어 있다 — 시설 데이터는 백엔드(공공데이터 시드)가 유일한 원천
 * 화면 코드는 이 파일의 함수만 알고, 어디서 오는지는 몰라도 된다.
 */

export async function getVerticals(): Promise<VerticalMeta[]> {
  if (!isApiEnabled) return [...VERTICALS];
  const { verticals } = await apiGet<{ verticals: VerticalDto[] }>("/salpyeo/verticals");
  return verticals.map(toVerticalMeta);
}

/** 알 수 없는 키면 null */
export async function getVertical(key: string): Promise<VerticalMeta | null> {
  if (!isVerticalKey(key)) return null;
  if (!isApiEnabled) return VERTICAL_MAP[key];
  try {
    return toVerticalMeta(await apiGet<VerticalDto>(`/salpyeo/verticals/${key}`));
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export interface FacilityListOptions {
  q?: string;
  sort?: FacilitySort;
  /** 비교 리포트용 — 지정 시 해당 시설만 */
  ids?: string[];
}

export async function getFacilities(
  vertical: VerticalKey,
  options: FacilityListOptions = {},
): Promise<Facility[]> {
  if (!isApiEnabled) return [];
  const { facilities } = await apiGet<{ facilities: FacilityDto[] }>("/salpyeo/facilities", {
    vertical,
    q: options.q,
    sort: options.sort,
    slugs: options.ids?.join(","),
  });
  return facilities.map(toFacility);
}

export async function getFacility(vertical: VerticalKey, id: string): Promise<Facility | null> {
  if (!isApiEnabled) return null;
  try {
    const facility = toFacility(await apiGet<FacilityDto>(`/salpyeo/facilities/${encodeURIComponent(id)}`));
    // 다른 버티컬의 slug 로 들어오면 없는 것으로 처리 (URL 과 데이터 불일치 방지)
    return facility.vertical === vertical ? facility : null;
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}
