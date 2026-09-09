import { CircleCheck } from "lucide-react";

import { Card, CardTitle } from "@/components/ui/card";
import type { Inspection } from "@/types/facility";

export function InspectionList({ inspections }: { inspections: Inspection[] }) {
  return (
    <Card className="p-6">
      <CardTitle>공식 점검·평가</CardTitle>
      {inspections.length === 0 ? (
        <p className="mt-3.5 rounded-xl bg-surface-alt px-[18px] py-4 text-sm text-text-tertiary">
          공개된 점검·평가 결과가 아직 없어요. 보건소 점검 결과를 연동하면 여기에 표시돼요.
        </p>
      ) : null}
      <ul className="mt-3.5 flex flex-col gap-2">
        {inspections.map((i) => (
          <li
            key={`${i.title}-${i.date}`}
            className="flex items-center gap-3 rounded-xl border border-hairline px-[18px] py-3.5"
          >
            <CircleCheck size={18} strokeWidth={2} className="shrink-0 text-positive" aria-hidden />
            <div className="flex-1">
              <div className="text-sm font-semibold text-text">{i.title}</div>
              <div className="mt-0.5 text-xs text-text-muted">{i.date}</div>
            </div>
            <span className="text-[13px] font-bold text-positive">{i.result}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
