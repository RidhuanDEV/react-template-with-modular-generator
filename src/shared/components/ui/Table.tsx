import type { ReactNode } from "react";
import { clsx } from "clsx";
import type { TableColumn } from "@/types/common.types";

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
    <div className={clsx("table-wrapper", className)}>
      <table className="table">
        <thead className="table__head">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="table__th">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={resolveRowId(row, rowIndex)}
                className={clsx(
                  "table__row",
                  onRowClick && "table__row--clickable",
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => {
                  const value = row[col.key];

                  return (
                    <td key={col.key} className="table__td">
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
  );
};
