import type { VerticalKey } from "@/types/facility";

/** 앱 내 라우트를 한 곳에서 관리 */
export const routes = {
  home: () => "/",
  list: (vertical: VerticalKey, query?: string) =>
    query ? `/${vertical}?q=${encodeURIComponent(query)}` : `/${vertical}`,
  detail: (vertical: VerticalKey, id: string) => `/${vertical}/${id}`,
  compare: (vertical: VerticalKey) => `/${vertical}/compare`,
  inquiry: () => "/inquiry",
  admin: () => "/admin",
  adminFacility: (slug: string) => `/admin/${slug}`,
  adminInquiries: () => "/admin/inquiries",
} as const;
