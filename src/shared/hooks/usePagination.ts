import { useState, useCallback } from "react";
import type { PaginationParams } from "@/types/api.types";
import { PAGINATION } from "@/config/constants";

interface UsePaginationReturn {
  params: PaginationParams;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
}

export const usePagination = (
  initialPage = PAGINATION.DEFAULT_PAGE,
  initialPerPage = PAGINATION.DEFAULT_PER_PAGE,
): UsePaginationReturn => {
  const [params, setParams] = useState<PaginationParams>({
    page: initialPage,
    perPage: initialPerPage,
  });

  const setPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const setPerPage = useCallback((perPage: number) => {
    setParams({ page: 1, perPage });
  }, []);

  const nextPage = useCallback(() => {
    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  const prevPage = useCallback(() => {
    setParams((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  }, []);

  const reset = useCallback(() => {
    setParams({ page: initialPage, perPage: initialPerPage });
  }, [initialPage, initialPerPage]);

  return { params, setPage, setPerPage, nextPage, prevPage, reset };
};
