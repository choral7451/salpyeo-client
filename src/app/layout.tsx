import type { Metadata } from "next";
import { Toaster } from "sonner";

import { StoreHydrator } from "@/components/common/store-hydrator";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "살펴 — 인생의 큰 결정, 가격부터 살펴보세요",
    template: "%s | 살펴",
  },
  description:
    "산후조리원부터 요양원까지, 법으로 공개된 가격·평가 공공데이터를 한 곳에서 비교하세요.",
};

const PRETENDARD_CSS =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href={PRETENDARD_CSS} />
      </head>
      <body className="flex min-h-full flex-col">
        <StoreHydrator />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
