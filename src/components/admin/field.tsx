"use client";

import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-bold text-text-secondary">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint ? <span className="text-[11px] text-text-muted">{hint}</span> : null}
    </label>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  hint,
  className,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-bold text-text-secondary">{label}</span>
      <input
        type="number"
        min={0}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className={inputClass}
      />
      {hint ? <span className="text-[11px] text-text-muted">{hint}</span> : null}
    </label>
  );
}

/** 요금표·사진처럼 행을 늘렸다 줄였다 하는 목록 */
export function RowList<T>({
  label,
  rows,
  onChange,
  makeEmpty,
  renderRow,
  hint,
}: {
  label: string;
  rows: T[];
  onChange: (rows: T[]) => void;
  makeEmpty: () => T;
  renderRow: (row: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  hint?: string;
}) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xs font-bold text-text-secondary">{label}</h2>
        {hint ? <span className="text-[11px] text-text-muted">{hint}</span> : null}
      </div>

      {rows.length === 0 ? <p className="text-sm text-text-muted">없음</p> : null}

      <ul className="flex flex-col gap-2">
        {rows.map((row, index) => (
          <li key={index} className="flex items-end gap-2 rounded-xl border border-hairline bg-surface-alt p-3">
            <div className="flex flex-1 flex-wrap gap-2">
              {renderRow(row, (patch) =>
                onChange(rows.map((r, i) => (i === index ? { ...r, ...patch } : r))),
              )}
            </div>
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, i) => i !== index))}
              className="shrink-0 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-bold text-text-secondary hover:bg-hairline"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onChange([...rows, makeEmpty()])}
        className="self-start rounded-lg border border-line bg-surface px-3 py-2 text-xs font-bold text-text-secondary hover:bg-hairline"
      >
        + 행 추가
      </button>
    </section>
  );
}
