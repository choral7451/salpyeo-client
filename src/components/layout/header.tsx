"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { AuthMenu } from "@/components/layout/auth-menu";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { VerticalMeta } from "@/types/facility";

export function Header({ verticals }: { verticals: VerticalMeta[] }) {
  const params = useParams<{ vertical?: string }>();
  const activeKey = params?.vertical;

  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-white/[0.94] backdrop-blur-[10px]">
      <div className="container-page flex h-[60px] items-center gap-8">
        <Link
          href={routes.home()}
          className="text-[22px] font-extrabold tracking-[-0.5px] text-primary"
        >
          살펴
        </Link>

        <nav aria-label="시설 종류" className="flex flex-1 gap-1 overflow-x-auto">
          {verticals.map((v) => {
            const isActive = v.enabled && activeKey === v.key;
            const base =
              "shrink-0 rounded-md px-3.5 py-2 text-[15px] transition-colors duration-150";

            if (!v.enabled) {
              return (
                <span
                  key={v.key}
                  aria-disabled="true"
                  title="준비 중"
                  className={cn(
                    base,
                    "inline-flex cursor-not-allowed items-center gap-1.5 font-medium text-text-disabled",
                  )}
                >
                  {v.label}
                  <span className="rounded-sm bg-hairline px-1.5 py-0.5 text-[10px] font-bold text-text-muted">
                    준비 중
                  </span>
                </span>
              );
            }

            return (
              <Link
                key={v.key}
                href={routes.list(v.key)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  base,
                  isActive
                    ? "bg-primary-tint font-bold text-primary"
                    : "font-medium text-text-secondary hover:bg-hairline",
                )}
              >
                {v.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="px-3">
            <Link href={routes.inquiry()}>문의</Link>
          </Button>
          <AuthMenu />
        </div>
      </div>
    </header>
  );
}
