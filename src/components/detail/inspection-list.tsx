import { CircleCheck } from "lucide-react";

import { Card, CardTitle } from "@/components/ui/card";
import type { Inspection } from "@/types/facility";

export function InspectionList({ inspections }: { inspections: Inspection[] }) {
  return (
    <Card className="p-6">
      <CardTitle>공식 점검·평가</CardTitle>
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
