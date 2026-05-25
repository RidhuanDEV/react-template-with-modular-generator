import type { ReactNode } from "react";
import type { TableColumn } from "@/types/common.types";
import { cn } from "@/lib/utils";

interface TableProps<T extends object> {
  data: T[];
  columns: TableColumn<T>[];
  className?: string;
  onRowClick?: (row: T) => void;
  getRowId?: (row: T, index: number) => string;
  emptyMessage?: string;
}

const getDefaultRowId = <T extends object>(row: T, index: number): string => {
  if ("id" in row) {
    const identifier = Reflect.get(row, "id");

    if (typeof identifier === "string" || typeof identifier === "number") {
      return String(identifier);
    }
  }

  return `row-${String(index)}`;
};

export const Table = <T extends object>({
  data,
  columns,
  className,
  onRowClick,
  getRowId,
  emptyMessage = "No data available",
}: TableProps<T>): ReactNode => {
  const resolveRowId = getRowId ?? getDefaultRowId;

  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="h-11 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 px-4 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={resolveRowId(row, rowIndex)}
                  className={cn(
                    "transition-colors duration-150",
                    onRowClick && "cursor-pointer hover:bg-muted/50",
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => {
                    const value = row[col.key];

                    return (
                      <td key={col.key} className="px-4 py-3 align-middle">
                        {col.render
                          ? col.render(value, row)
                          : String(value ?? "")}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
