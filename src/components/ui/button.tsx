import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-bold transition-colors duration-150 ease-out outline-none select-none focus-visible:ring-3 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        outline:
          "border border-line bg-surface text-text-secondary hover:bg-surface-alt",
        ghost: "text-text-secondary hover:bg-hairline",
        /** 비교 바처럼 어두운 배경 위의 비활성 상태 */
        muted: "bg-text-secondary text-white",
      },
      size: {
        sm: "h-9 rounded-md px-4 text-sm",
        md: "h-12 rounded-lg px-[22px] text-[15px]",
        lg: "h-[52px] rounded-xl px-6 text-[15px]",
        block: "h-[50px] w-full rounded-lg text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
