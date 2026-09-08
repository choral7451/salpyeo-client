import type { Facility, VerticalKey } from "@/types/facility";
import { ACADEMY_FACILITIES } from "./academy";
import { DAYCARE_FACILITIES } from "./daycare";
import { FUNERAL_FACILITIES } from "./funeral";
import { NURSING_FACILITIES } from "./nursing";
import { POST_FACILITIES } from "./post";

/** 버티컬별 목데이터 — 실서비스에서는 API 응답으로 대체 */
export const FACILITIES_BY_VERTICAL: Record<VerticalKey, Facility[]> = {
  post: POST_FACILITIES,
  nursing: NURSING_FACILITIES,
  funeral: FUNERAL_FACILITIES,
  daycare: DAYCARE_FACILITIES,
  academy: ACADEMY_FACILITIES,
};
