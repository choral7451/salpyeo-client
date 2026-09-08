import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CompareReport } from "@/lib/compare";
import { cn } from "@/lib/utils";

export function CompareTable({ report }: { report: CompareReport }) {
  const gridStyle = {
    gridTemplateColumns: `120px repeat(${report.columns.length}, minmax(0, 1fr))`,
  };

  return (
    <Card className="overflow-x-auto">
      <div role="table" aria-label="시설 비교표" className="min-w-[520px]">
        <div role="row" className="grid border-b border-hairline" style={gridStyle}>
          <div role="columnheader" className="p-4" />
          {report.columns.map((c) => (
            <div
              key={c.id}
              role="columnheader"
              className="border-l border-hairline px-2.5 py-4 text-center"
            >
              <div className="text-[15px] font-bold text-text">{c.name}</div>
              {c.recommended ? (
                <Badge size="sm" className="mt-[5px]">
                  추천
                </Badge>
              ) : null}
            </div>
          ))}
        </div>

        {report.rows.map((row) => (
          <div
            key={row.label}
            role="row"
            className="grid border-b border-hairline last:border-b-0"
            style={gridStyle}
          >
            <div role="rowheader" className="px-4 py-3.5 text-[13px] font-semibold text-text-muted">
              {row.label}
            </div>
            {row.cells.map((cell, i) => (
              <div
                key={report.columns[i].id}
                role="cell"
                className={cn(
                  "tabular border-l border-hairline px-2.5 py-3.5 text-center text-sm",
                  cell.best ? "font-extrabold text-positive" : "font-semibold text-text",
                )}
              >
                {cell.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
