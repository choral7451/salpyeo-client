"use client";

import { toast } from "sonner";

import { Card, CardTitle } from "@/components/ui/card";
import type { Review } from "@/types/facility";

export function ReviewCard({ review, total }: { review: Review | null; total: number }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <CardTitle>인증 후기</CardTitle>
        {total > 0 ? (
          <button
            type="button"
            onClick={() => toast("후기 전체보기는 준비 중이에요")}
            className="text-[13px] font-semibold text-text-muted hover:text-text"
          >
            {total}건 전체보기
          </button>
        ) : null}
      </div>
      {review ? (
        <div className="mt-3.5 rounded-xl bg-surface-alt p-[18px]">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-text">이용 인증 완료</span>
            <span className="text-xs text-text-muted">{review.meta}</span>
          </div>
          <p className="mt-2 text-sm leading-[1.65] text-text-body">{review.text}</p>
        </div>
      ) : (
        <p className="mt-3.5 rounded-xl bg-surface-alt px-[18px] py-4 text-sm text-text-tertiary">
          아직 인증 후기가 없어요. 실제 이용을 인증한 후기만 받을 예정이에요.
        </p>
      )}
    </Card>
  );
}
