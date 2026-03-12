export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface SortParams {
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

export type QueryParams = PaginationParams & Partial<SortParams> & FilterParams;
