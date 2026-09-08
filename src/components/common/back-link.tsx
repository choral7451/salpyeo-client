import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export function BackLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold text-text-tertiary transition-colors hover:text-text",
        className,
      )}
    >
      <ChevronLeft size={15} strokeWidth={2.5} aria-hidden />
      {children}
    </Link>
  );
}
