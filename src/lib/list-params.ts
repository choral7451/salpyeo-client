import type { SortKey } from "@/components/facility/sort-select";
import type { VerticalKey } from "@/types/facility";

/**
 * 목록 화면의 상태(지역·정렬·검색어)를 URL 쿼리로 관리한다.
 * URL 에 담아 두면 상세로 갔다가 뒤로 와도, 링크를 공유해도 그대로 복원된다.
 */
export interface ListParams {
  q?: string;
  sido?: string;
  sigungu?: string;
  sort?: SortKey;
}

const KEYS = ["q", "sido", "sigungu", "sort"] as const;

/** URLSearchParams / 서버 searchParams → 목록 상태 */
export function readListParams(source: {
  get(key: string): string | null | undefined;
}): ListParams {
  const value = (key: string) => source.get(key)?.trim() || undefined;
  return {
    q: value("q"),
    sido: value("sido"),
    sigungu: value("sigungu"),
    sort: value("sort") as SortKey | undefined,
  };
}

/** 목록 상태 → "sido=서울&sort=priceAsc" (빈 값은 생략) */
export function toListQuery(params: ListParams): string {
  const search = new URLSearchParams();
  for (const key of KEYS) {
    const value = params[key];
    if (value) search.set(key, value);
  }
  return search.toString();
}

/** 목록 경로 (상태가 있으면 쿼리를 붙인다) */
export function listHref(vertical: VerticalKey, params: ListParams | string): string {
  const query = typeof params === "string" ? params : toListQuery(params);
  return query ? `/${vertical}?${query}` : `/${vertical}`;
}

/**
 * 상세 경로. 목록에서 들어왔다면 그때의 목록 상태를 `from` 에 실어 두고,
 * 상세의 "목록으로" 가 같은 화면으로 되돌아가게 한다.
 */
export function detailHref(vertical: VerticalKey, id: string, listQuery?: string): string {
  const base = `/${vertical}/${encodeURIComponent(id)}`;
  return listQuery ? `${base}?from=${encodeURIComponent(listQuery)}` : base;
}

/** `from` 값은 URL 에서 오므로 우리가 쓰는 키만 남겨 되돌린다 (열린 리다이렉트 방지) */
export function sanitizeListQuery(from: string | undefined): string {
  if (!from) return "";
  const allowed = new URLSearchParams();
  const incoming = new URLSearchParams(from);
  for (const key of KEYS) {
    const value = incoming.get(key)?.trim();
    if (value) allowed.set(key, value.slice(0, 40));
  }
  return allowed.toString();
}
