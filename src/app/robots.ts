import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 관리자 화면과 문의 접수는 검색에 걸릴 이유가 없다
      disallow: ["/admin", "/admin/", "/inquiry"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
