import { Clock } from "lucide-react";

import { SearchBar } from "./search-bar";

export function Hero() {
  return (
    <section className="container-page pt-[72px] pb-10 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-tint px-4 py-2">
        <Clock size={15} strokeWidth={2.2} className="text-primary" aria-hidden />
        <span className="text-sm font-bold text-primary-hover">
          전화 열 번 대신, 한 화면에서
        </span>
      </div>
      <h1 className="mt-6 text-[46px] leading-[1.25] font-extrabold tracking-[-1.2px] text-text max-md:text-[34px]">
        인생의 큰 결정,
        <br />
        가격부터 살펴보세요
      </h1>
      <p className="mt-4 text-lg text-text-tertiary max-md:text-base">
        산후조리원부터 요양원까지, 흩어진 공공데이터를 한 곳에서 비교해요.
      </p>
      <SearchBar className="mx-auto mt-9" />
    </section>
  );
}
