import type { Metadata } from "next";

import { InquiryForm } from "@/components/inquiry/inquiry-form";

export const metadata: Metadata = {
  title: "문의하기",
  description: "잘못된 정보 제보, 시설 등록·수정 요청, 그 밖의 문의를 남겨 주세요.",
};

export default function InquiryPage() {
  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page max-w-[720px] pt-10 pb-24">
        <h1 className="text-[28px] font-extrabold tracking-[-0.6px] text-text">문의하기</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
          잘못된 요금·연락처 제보, 시설 정보 수정 요청, 그 밖에 궁금한 점을 남겨 주세요.
          남겨 주신 이메일로 답변드립니다.
        </p>

        <InquiryForm />
      </div>
    </div>
  );
}
