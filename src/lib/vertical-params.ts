import { notFound } from "next/navigation";

import { getVertical } from "@/lib/api/facilities";
import { VERTICAL_KEYS, type VerticalMeta } from "@/types/facility";

/** 라우트 파라미터를 검증해 버티컬 메타로 변환. 알 수 없는 값이면 404 */
export async function resolveVertical(param: string): Promise<VerticalMeta> {
  const vertical = await getVertical(param);
  if (!vertical) notFound();
  return vertical;
}

/** 모든 버티컬 라우트를 정적으로 생성 (키는 코드 상수라 API 없이 결정 가능) */
export function verticalStaticParams() {
  return VERTICAL_KEYS.map((vertical) => ({ vertical }));
}
