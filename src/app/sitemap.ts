import type { MetadataRoute } from "next";

import { getFacilities, getVerticals } from "@/lib/api/facilities";
import { routes } from "@/lib/routes";
import { isIndexableVertical, SITE_URL } from "@/lib/site";

/**
 * 데이터가 있는 버티컬(현재 산후조리원)과 그 시설 상세만 넣는다.
 * 준비 중인 버티컬은 목록이 비어 있어 색인시켜 봐야 손해다.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const verticals = (await getVerticals()).filter((v) => v.enabled && isIndexableVertical(v.key));

  const listPages: MetadataRoute.Sitemap = verticals.map((v) => ({
    url: `${SITE_URL}${routes.list(v.key)}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const detailPages = await Promise.all(
    verticals.map(async (v) => {
      const facilities = await getFacilities(v.key);
      return facilities.map((f) => ({
        url: `${SITE_URL}${routes.detail(v.key, f.id)}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }),
  );

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...listPages,
    ...detailPages.flat(),
  ];
}
