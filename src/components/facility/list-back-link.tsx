"use client";

import { useSearchParams } from "next/navigation";

import { BackLink } from "@/components/common/back-link";
import { listHref, sanitizeListQuery } from "@/lib/list-params";
import type { VerticalKey } from "@/types/facility";

/**
 * 상세의 "목록으로" — 목록에서 들어왔다면 그때의 지역·정렬·검색 상태로 되돌아간다.
 * 쿼리를 클라이언트에서만 읽어 상세 페이지의 정적 생성을 유지한다.
 */
export function ListBackLink({ vertical }: { vertical: VerticalKey }) {
  const from = sanitizeListQuery(useSearchParams().get("from") ?? undefined);
  return <BackLink href={listHref(vertical, from)}>목록으로</BackLink>;
}
