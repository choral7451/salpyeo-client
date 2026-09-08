"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export function CompareCheckbox({
  checked,
  onToggle,
  label,
  className,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        "flex size-[26px] shrink-0 items-center justify-center rounded-lg border-[1.5px] transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-primary/30 focus-visible:outline-none",
        checked
          ? "border-primary bg-primary text-white"
          : "border-check-border bg-surface hover:border-primary",
        className,
      )}
    >
      {checked ? <Check size={15} strokeWidth={3} aria-hidden /> : null}
    </button>
  );
}
