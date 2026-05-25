import { type ReactNode, useState, useCallback, useMemo } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";
import type { TableColumn } from "@/types/common.types";
import { cn } from "@/lib/utils";

type SortableValue = string | number | boolean | Date | null | undefined;

export interface DataTableColumn<T extends object> extends TableColumn<T> {
  sortable?: boolean;
  sortAccessor?: (row: T) => SortableValue;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: DataTableColumn<T>[];
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  getRowId?: (row: T, index: number) => string;
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

const normalizeSortValue = (value: unknown): string | number => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (typeof value === "string") {
    return value.toLowerCase();
  }

  return "";
};

const compareSortValues = (
  left: string | number,
  right: string | number,
): number => {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  return String(left).localeCompare(String(right));
};

export const DataTable = <T extends object>({
  data,
  columns,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  className,
  getRowId,
}: DataTableProps<T>): ReactNode => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const resolveRowId = getRowId ?? getDefaultRowId;

  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    },
    [sortKey],
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    const column = columns.find((candidate) => candidate.key === sortKey);

    if (!column) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aVal = column.sortAccessor?.(a) ?? a[column.key];
      const bVal = column.sortAccessor?.(b) ?? b[column.key];
      const compare = compareSortValues(
        normalizeSortValue(aVal),
        normalizeSortValue(bVal),
      );

      return sortOrder === "asc" ? compare : -compare;
    });
  }, [columns, data, sortKey, sortOrder]);

  if (loading) {
    return (
      <div
        className={cn("grid gap-3 rounded-lg border bg-card p-4", className)}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height="40px" variant="rectangular" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                {columns.map((col) => {
                  const active = sortKey === col.key;
                  const SortIcon = active
                    ? sortOrder === "asc"
                      ? ArrowUp
                      : ArrowDown
                    : ChevronsUpDown;

                  return (
                    <th
                      key={col.key}
                      className={cn(
                        "h-11 px-4 text-left align-middle font-medium text-muted-foreground",
                        col.sortable && "cursor-pointer select-none",
                      )}
                      onClick={
                        col.sortable ? () => handleSort(col.key) : undefined
                      }
                      aria-sort={
                        active
                          ? sortOrder === "asc"
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        {col.header}
                        {col.sortable && (
                          <SortIcon
                            className={cn(
                              "size-3.5",
                              active && "text-foreground",
                            )}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-24 px-4 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                sortedData.map((row, i) => (
                  <tr
                    key={resolveRowId(row, i)}
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
      {totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
