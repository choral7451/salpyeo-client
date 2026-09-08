import { notFound } from "next/navigation";

import { VERTICAL_MAP, VERTICALS } from "@/data/verticals";
import { isVerticalKey, type VerticalMeta } from "@/types/facility";

/** 라우트 파라미터를 검증해 버티컬 메타로 변환. 알 수 없는 값이면 404 */
export function resolveVertical(param: string): VerticalMeta {
  if (!isVerticalKey(param)) notFound();
  return VERTICAL_MAP[param];
}

/** 모든 버티컬 라우트를 정적으로 생성 */
export function verticalStaticParams() {
  return VERTICALS.map((v) => ({ vertical: v.key }));
}
