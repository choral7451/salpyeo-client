import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-sm px-2 py-[3px] text-xs font-bold leading-[1.4]",
  {
    variants: {
      variant: {
        /** 점검·평가 결과 (초록) */
        positive: "bg-positive-tint text-positive",
        /** 시설 특성 (파랑) */
        primary: "bg-primary-tint text-primary",
        neutral: "bg-hairline text-text-tertiary",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[11px]",
        md: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
