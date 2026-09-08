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
    <div className="fixed inset-x-0 bottom-0 z-30 bg-dark/[0.96] backdrop-blur-[8px]">
      <div className="container-page flex items-center gap-4 py-4 max-md:flex-wrap">
        <span className="text-[15px] font-semibold text-white">{names}</span>
        <span className="text-[13px] text-text-disabled">
          {canCompare
            ? `최대 ${MAX_COMPARE}곳까지 담을 수 있어요`
            : "2곳 이상 담으면 리포트를 만들 수 있어요"}
        </span>
        {canCompare ? (
          <Button asChild className="ml-auto">
            <Link href={routes.compare(vertical)}>비교 리포트 보기</Link>
          </Button>
        ) : (
          <Button variant="muted" disabled className="ml-auto opacity-100">
            비교 리포트 보기
          </Button>
        )}
      </div>
    </div>
  );
}
