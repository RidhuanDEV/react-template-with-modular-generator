import type { PaginationMeta, PaginationParams } from "@/types/api.types";
import { PAGINATION } from "@/config/constants";

export const getDefaultPaginationParams = (): PaginationParams => ({
  page: PAGINATION.DEFAULT_PAGE,
  perPage: PAGINATION.DEFAULT_PER_PAGE,
});

export const buildPaginationQueryString = (
  params: PaginationParams,
): string => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("per_page", String(params.perPage));
  return searchParams.toString();
};

export const getTotalPages = (meta: PaginationMeta): number => {
  return meta.lastPage;
};

export const hasNextPage = (meta: PaginationMeta): boolean => {
  return meta.currentPage < meta.lastPage;
};

export const hasPreviousPage = (meta: PaginationMeta): boolean => {
  return meta.currentPage > 1;
};

export const getPageRange = (
  meta: PaginationMeta,
  maxVisible = 5,
): number[] => {
  const { currentPage, lastPage } = meta;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(lastPage, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};
