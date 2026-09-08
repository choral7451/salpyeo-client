import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DEFAULT_VERTICAL, VERTICAL_MAP } from "@/data/verticals";
import { routes } from "@/lib/routes";
import type { VerticalMeta } from "@/types/facility";

import { EmptyState } from "./empty-state";
import { VerticalIcon } from "./vertical-icon";

/** 아직 활성화되지 않은 버티컬 진입 시 보여주는 안내 */
export function ComingSoon({ vertical }: { vertical: VerticalMeta }) {
  const fallback = VERTICAL_MAP[DEFAULT_VERTICAL];
  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page py-16">
        <EmptyState
          icon={<VerticalIcon vertical={vertical.key} size={26} />}
          title={`${vertical.label}은 준비 중이에요`}
          description={`${vertical.source} 데이터를 연동하고 있어요. 지금은 ${fallback.label} 비교를 먼저 이용해 보세요.`}
          action={
            <Button asChild>
              <Link href={routes.list(fallback.key)}>
                {fallback.label} 살펴보기
              </Link>
            </Button>
          }
        />
      </div>
    </div>
  );
}
