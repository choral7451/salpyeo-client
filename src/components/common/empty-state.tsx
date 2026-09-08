import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-3xl border border-hairline bg-surface px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary-tint text-primary">
          {icon}
        </div>
      ) : null}
      <h2 className="text-lg font-bold text-text">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-tertiary">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
