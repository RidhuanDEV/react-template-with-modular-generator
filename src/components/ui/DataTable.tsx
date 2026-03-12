import { type ReactNode, useState, useCallback, useMemo } from "react";
import { clsx } from "clsx";
import { Pagination } from "@/components/ui/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";
import type { TableColumn } from "@/types/common.types";

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
      <div className={clsx("data-table", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height="40px" variant="rectangular" />
        ))}
      </div>
    );
  }

  return (
    <div className={clsx("data-table", className)}>
      <div className="table-wrapper">
        <table className="table">
          <thead className="table__head">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    "table__th",
                    col.sortable && "table__th--sortable",
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    sortKey === col.key
                      ? sortOrder === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <span className="table__sort-icon">
                      {sortOrder === "asc" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="table__empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => (
                <tr
                  key={resolveRowId(row, i)}
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
