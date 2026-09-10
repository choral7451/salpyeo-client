import { ShieldCheck } from "lucide-react";

import { SearchBar } from "./search-bar";

/**
 * 배지·부제는 지금 실제로 들어와 있는 데이터만 말한다.
 * 요양원·장례식장 등은 아직 준비 중이라 "곧 더합니다"로 두고, 카드의 "데이터 연동 준비 중"과 앞뒤를 맞춘다.
 */
export function Hero({ facilityCount }: { facilityCount: number }) {
  return (
    <section className="container-page pt-[72px] pb-10 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-tint px-4 py-2">
        <ShieldCheck size={15} strokeWidth={2} className="text-primary" aria-hidden />
        <span className="text-sm font-bold text-primary-hover">
          보건복지부 공개 자료
          {facilityCount > 0 ? ` · 전국 ${facilityCount.toLocaleString("ko-KR")}곳` : null}
        </span>
      </div>
      <h1 className="mt-6 text-[46px] leading-[1.25] font-extrabold tracking-[-1.2px] text-text max-md:text-[34px]">
        전화 열 번 대신,
        <br />
        한 화면에서
      </h1>
      <p className="mt-4 text-lg text-text-tertiary max-md:text-base">
        흩어진 공개 자료를 모아 같은 기준으로 정리했어요. 요양원·장례식장도 곧 더합니다.
      </p>
      <SearchBar className="mx-auto mt-9" />
    </section>
  );
}
