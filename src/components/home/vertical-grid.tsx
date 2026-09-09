import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { VerticalIcon } from "@/components/common/vertical-icon";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { VerticalMeta } from "@/types/facility";

function VerticalCard({ vertical }: { vertical: VerticalMeta }) {
  const content = (
    <>
      <div className="flex size-[46px] items-center justify-center rounded-xl bg-primary-tint text-primary">
        <VerticalIcon vertical={vertical.key} size={22} />
      </div>
      <div>
        <div className="text-[17px] font-bold text-text">{vertical.label}</div>
        <div className="mt-1 text-[13px] leading-normal text-text-tertiary">
          {vertical.sub}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1 text-[13px] font-bold text-primary">
        {vertical.enabled ? (
          <>
            {vertical.count}곳 살펴보기
            <ChevronRight size={13} strokeWidth={2.5} aria-hidden />
          </>
        ) : (
          <span className="text-text-muted">데이터 연동 준비 중</span>
        )}
      </div>
    </>
  );

  const base =
    "flex flex-col gap-3.5 rounded-3xl border border-hairline bg-surface-alt px-5 py-6 transition-colors duration-150";

  if (!vertical.enabled) {
    return (
      <div
        aria-disabled="true"
        className={cn(base, "relative cursor-not-allowed opacity-60")}
      >
        <span className="absolute top-4 right-4 rounded-sm bg-hairline px-2 py-0.5 text-[11px] font-bold text-text-muted">
          준비 중
        </span>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={routes.list(vertical.key)}
      className={cn(
        base,
        "hover:border-primary-tint-border hover:bg-primary-tint-hover",
      )}
    >
      {content}
    </Link>
  );
}

export function VerticalGrid({ verticals }: { verticals: VerticalMeta[] }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(196px,1fr))] gap-3.5">
      {verticals.map((v) => (
        <VerticalCard key={v.key} vertical={v} />
      ))}
    </section>
  );
}
