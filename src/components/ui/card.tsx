import * as React from "react";

import { cn } from "@/lib/utils";

/** 흰 배경 · 1px 헤어라인 · radius 20px 기본 카드 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-3xl border border-hairline bg-surface",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="card-title"
      className={cn("text-lg font-bold text-text", className)}
      {...props}
    />
  );
}

export { Card, CardTitle };
