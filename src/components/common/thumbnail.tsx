import { cn } from "@/lib/utils";

/** 시설 사진 플레이스홀더 — 실제 이미지 연동 시 next/image로 교체 */
export function Thumbnail({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "시설 사진"}
      className={cn(
        "flex shrink-0 items-center justify-center bg-placeholder text-sm text-text-muted",
        className,
      )}
    >
      {label}
    </div>
  );
}
