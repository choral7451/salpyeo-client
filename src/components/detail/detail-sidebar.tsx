"use client";

import Link from "next/link";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompare } from "@/hooks/use-compare";
import { routes } from "@/lib/routes";
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
    <aside className="sticky top-20 flex flex-col gap-3 max-lg:static max-lg:order-first">
      <Card className="p-6">
        <div className="text-[13px] text-text-tertiary">{priceLabel}</div>
        <div className="tabular mt-1 text-[28px] font-extrabold text-text">
          {formatPrice(facility.price)}
        </div>
        <Button asChild size="block" className="mt-4">
          <Link href={routes.inquiry()}>정보가 다르면 알려주세요</Link>
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
          요금·연락처가 실제와 다르면 알려주세요. 확인 후 바로잡습니다.
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
