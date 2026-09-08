"use client";

import Image from "next/image";
import Link from "next/link";

import { Thumbnail } from "@/components/common/thumbnail";
import { Badge } from "@/components/ui/badge";
import { formatRating, formatWon } from "@/lib/format";
import { routes } from "@/lib/routes";
import type { Facility } from "@/types/facility";

import { CompareCheckbox } from "./compare-checkbox";

export function FacilityCard({
  facility,
  priceLabel,
  checked,
  onToggleCompare,
}: {
  facility: Facility;
  priceLabel: string;
  checked: boolean;
  onToggleCompare: () => void;
}) {
  return (
    <article className="relative flex flex-col gap-3.5 rounded-3xl border border-hairline bg-surface p-5 transition-[border-color,box-shadow] duration-150 hover:border-primary-tint-border hover:shadow-card-hover">
      <div className="flex gap-3.5">
        {facility.images[0] ? (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-placeholder">
            <Image
              src={facility.images[0].url}
              alt={`${facility.name} ${facility.images[0].alt}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : (
          <Thumbnail className="size-16 rounded-xl" />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-bold text-text">
            {/* 카드 전체를 덮는 링크 (stretched link). 체크박스는 z-10으로 위에 올림 */}
            <Link
              href={routes.detail(facility.vertical, facility.id)}
              className="after:absolute after:inset-0 after:rounded-3xl after:content-['']"
            >
              {facility.name}
            </Link>
          </h3>
          <p className="mt-[3px] text-[13px] text-text-tertiary">{facility.meta}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="positive">{facility.badges.inspection}</Badge>
            <Badge variant="primary">{facility.badges.feature}</Badge>
          </div>
        </div>
        <CompareCheckbox
          checked={checked}
          onToggle={onToggleCompare}
          label={`${facility.name} 비교함에 ${checked ? "서 빼기" : " 담기"}`}
          className="relative z-10"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-surface-alt px-4 py-3">
        <span className="text-[13px] text-text-tertiary">{priceLabel}</span>
        <span className="tabular text-lg font-extrabold text-text">
          {formatWon(facility.price)}
        </span>
      </div>

      <div className="flex items-center justify-between text-[13px]">
        <span className="font-semibold text-text-secondary">
          인증 후기 {formatRating(facility.rating)} · {facility.reviewCount}건
        </span>
        <span className="text-text-muted">집에서 {facility.distance.label}</span>
      </div>
    </article>
  );
}
