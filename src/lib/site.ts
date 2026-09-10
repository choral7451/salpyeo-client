/** 사이트 전역 SEO 값 — 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 로 넘긴다 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://salpyeo.com").replace(/\/$/, "");

export const SITE_NAME = "살펴";

/**
 * 지금 데이터가 있는 건 산후조리원뿐이다.
 * 준비 중인 버티컬은 색인에서 빼고(noindex) sitemap 에도 넣지 않는다 —
 * 빈 목록이 검색에 걸리면 첫인상이 나빠지고 크롤링 예산도 버린다.
 */
export const INDEXABLE_VERTICALS = ["post"] as const;

export function isIndexableVertical(key: string): boolean {
  return (INDEXABLE_VERTICALS as readonly string[]).includes(key);
}
