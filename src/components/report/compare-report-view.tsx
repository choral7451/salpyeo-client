"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompare } from "@/hooks/use-compare";
import { buildCompareReport } from "@/lib/compare";
import { routes } from "@/lib/routes";
import type { Facility, VerticalMeta } from "@/types/facility";

import { AiSummary } from "./ai-summary";
import { CompareTable } from "./compare-table";

export function CompareReportView({
  vertical,
  facilities,
}: {
  vertical: VerticalMeta;
  facilities: Facility[];
}) {
  const { ids, hydrated } = useCompare(vertical.key);

  // localStorage 복원 전에는 잘못된 빈 상태가 깜빡이지 않도록 자리만 잡아둠
  if (!hydrated) return <div className="mt-4 min-h-[420px]" aria-busy="true" />;

  const selected = ids
    .map((id) => facilities.find((f) => f.id === id))
    .filter((f): f is Facility => Boolean(f));
  const report = buildCompareReport(vertical, selected);

  if (!report) {
    return (
      <EmptyState
        className="mt-4"
        icon={<Scale size={26} />}
        title="비교할 시설을 2곳 이상 담아 주세요"
        description={`${vertical.label} 목록에서 비교함에 담으면 비교 리포트를 만들어 드려요.`}
        action={
          <Button asChild>
            <Link href={routes.list(vertical.key)}>{vertical.label} 목록으로</Link>
          </Button>
        }
      />
    );
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("리포트 링크를 복사했어요");
    } catch {
      toast.error("링크 복사에 실패했어요");
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3.5">
      <Card className="p-6">
        <div className="text-[13px] font-bold text-primary">비교 리포트</div>
        <h1 className="mt-1.5 text-2xl font-extrabold tracking-[-0.5px] text-text">
          {vertical.label} {selected.length}곳 비교
        </h1>
        <p className="mt-1.5 text-sm text-text-tertiary">
          {vertical.source} 공개 요금을 기준으로 정리했어요.
        </p>
      </Card>

      <CompareTable report={report} />
      <AiSummary text={report.summary} />

      <div className="flex gap-2.5">
        <Button variant="outline" size="lg" className="flex-1 rounded-xl" onClick={share}>
          리포트 공유
        </Button>
        <Button
          size="lg"
          className="flex-1 rounded-xl"
          onClick={() => toast("문의 기능은 준비 중이에요")}
        >
          선택한 곳 모두 문의
        </Button>
      </div>
    </div>
  );
}
