import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import { StoreHydrator } from "@/components/common/store-hydrator";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getVerticals } from "@/lib/api/facilities";
import { SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  // 상대 경로 og:image·canonical 을 절대 주소로 만들어 준다
  metadataBase: new URL(SITE_URL),
  title: {
    default: "살펴 — 전국 산후조리원 요금 비교",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "전국 산후조리원의 공개된 2주 요금을 한 화면에서 비교하세요. 보건복지부 공개 자료 기반, 광고 없이 그대로 보여드립니다.",
  applicationName: SITE_NAME,
  keywords: ["산후조리원", "산후조리원 비용", "산후조리원 가격", "산후조리원 비교", "산후조리원 추천"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ko_KR",
    url: "/",
    title: "살펴 — 전국 산후조리원 요금 비교",
    description: "공개된 2주 요금을 한 화면에서. 전화 열 번 대신 여기서 먼저 비교하세요.",
  },
  // og:image·twitter:image 는 app/opengraph-image.png · twitter-image.png 파일이 자동으로 채운다
  twitter: {
    card: "summary_large_image",
    title: "살펴 — 전국 산후조리원 요금 비교",
    description: "공개된 2주 요금을 한 화면에서.",
  },
  // Search Console 소유권 확인 (URL 접두어 속성용).
  // 도메인 속성(salpyeo.com 전체)은 DNS TXT 레코드로만 인증된다 — 이 태그로는 안 된다.
  verification: { google: "XAfqiljHDedxhHJN6Qdript-6OZsPtEiZSanFfj0n7U" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/** 주소창 색을 페이지 배경과 맞추고, 확대는 막지 않는다 (접근성) */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const PRETENDARD_CSS =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const verticals = await getVerticals();
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href={PRETENDARD_CSS} />
      </head>
      <body className="flex min-h-full flex-col">
        <StoreHydrator />
        {/* 키보드 사용자가 헤더 탭을 건너뛰고 본문으로 */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          본문으로 건너뛰기
        </a>
        <Header verticals={verticals} />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
