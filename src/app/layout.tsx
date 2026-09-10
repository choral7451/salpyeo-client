import type { Metadata } from "next";
import { Toaster } from "sonner";

import { StoreHydrator } from "@/components/common/store-hydrator";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getVerticals } from "@/lib/api/facilities";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "살펴 — 인생의 큰 결정, 가격부터 살펴보세요",
    template: "%s | 살펴",
  },
  description:
    "전국 산후조리원의 공개된 2주 요금을 한 화면에서 비교하세요. 보건복지부 공개 자료 기반.",
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
        <Header verticals={verticals} />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
