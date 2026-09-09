"use client";

import { Info } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompare } from "@/hooks/use-compare";
import { formatPrice } from "@/lib/format";
import type { Facility } from "@/types/facility";

export function DetailSidebar({
  facility,
  priceLabel,
}: {
  facility: Facility;
  priceLabel: string;
}) {
  const { hydrated, isSelected, toggle } = useCompare(facility.vertical);
  const selected = hydrated && isSelected(facility.id);

  return (
    <aside className="sticky top-20 flex flex-col gap-3 max-lg:static">
      <Card className="p-6">
        <div className="text-[13px] text-text-tertiary">{priceLabel}</div>
        <div className="tabular mt-1 text-[28px] font-extrabold text-text">
          {formatPrice(facility.price)}
        </div>
        <Button
          size="block"
          className="mt-4"
          onClick={() =>
            toast("문의 기능은 준비 중이에요", {
              description: "오픈 후 시설에 바로 전달돼요.",
            })
          }
        >
          방문 상담 문의하기
        </Button>
        <Button
          variant="outline"
          size="block"
          className="mt-2"
          aria-pressed={selected}
          onClick={() => toggle(facility.id)}
        >
          {selected ? "비교함에서 빼기" : "비교함에 담기"}
        </Button>
        <p className="mt-3.5 text-xs leading-[1.6] text-text-muted">
          문의는 시설에 바로 전달되며, 살펴는 상담 과정에 개입하지 않아요.
        </p>
      </Card>

      <div className="flex items-start gap-2.5 rounded-2xl bg-primary-tint px-[18px] py-4">
        <Info size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-hover" aria-hidden />
        <p className="text-[13px] leading-[1.6] text-primary-hover">
          이 페이지의 가격·점검 정보는 공공기관 공개 자료를 그대로 옮긴 것입니다.
        </p>
      </div>
    </aside>
  );
}
