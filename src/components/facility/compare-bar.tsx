"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/hooks/use-compare";
import { routes } from "@/lib/routes";
import { MAX_COMPARE } from "@/stores/compare-store";
import type { Facility, VerticalKey } from "@/types/facility";

export function CompareBar({
  vertical,
  facilities,
}: {
  vertical: VerticalKey;
  facilities: Facility[];
}) {
  const { ids, hydrated, canCompare } = useCompare(vertical);
  if (!hydrated || ids.length === 0) return null;

  const names = facilities
    .filter((f) => ids.includes(f.id))
    .map((f) => f.name)
    .join(" · ");

  return (
    <div
      // 아이폰 홈 인디케이터에 버튼이 가리지 않도록 하단 안전 영역만큼 띄운다
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      className="fixed inset-x-0 bottom-0 z-30 bg-dark/[0.96] backdrop-blur-[8px]"
    >
      <div className="container-page flex items-center gap-x-4 gap-y-2 py-4 max-md:flex-wrap">
        <div className="flex min-w-0 flex-col max-md:w-full">
          <span className="truncate text-[15px] font-semibold text-white">{names}</span>
          <span className="text-[13px] text-text-disabled">
            {canCompare
              ? `최대 ${MAX_COMPARE}곳까지 담을 수 있어요`
              : "2곳 이상 담으면 리포트를 만들 수 있어요"}
          </span>
        </div>
        {canCompare ? (
          <Button asChild className="ml-auto shrink-0 max-md:w-full">
            <Link href={routes.compare(vertical)}>비교 리포트 보기</Link>
          </Button>
        ) : (
          <Button variant="muted" disabled className="ml-auto shrink-0 opacity-100 max-md:w-full">
            비교 리포트 보기
          </Button>
        )}
      </div>
    </div>
  );
}
