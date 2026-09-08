import "server-only";

import { FACILITIES_BY_VERTICAL } from "@/data/facilities";
import { VERTICAL_MAP } from "@/data/verticals";
import type { Facility, VerticalKey, VerticalMeta } from "@/types/facility";

/**
 * 데이터 접근 계층.
 * 지금은 목데이터를 반환하지만, 시그니처를 유지한 채 fetch/DB 호출로 교체하면 됩니다.
 */

export async function getVertical(key: VerticalKey): Promise<VerticalMeta> {
  return VERTICAL_MAP[key];
}

export async function getFacilities(vertical: VerticalKey): Promise<Facility[]> {
  return FACILITIES_BY_VERTICAL[vertical];
}

export async function getFacility(
  vertical: VerticalKey,
  id: string,
): Promise<Facility | null> {
  return FACILITIES_BY_VERTICAL[vertical].find((f) => f.id === id) ?? null;
}
