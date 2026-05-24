import type { ReactNode } from "react";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TableColumn<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export type Permission = string;

export interface RouteConfig {
  path: string;
  label: string;
  permissions?: Permission[];
  children?: RouteConfig[];
}

export type PropsWithClassName<P = object> = P & {
  className?: string;
};

export type PropsWithChildren<P = object> = P & {
  children: ReactNode;
};

export type Nullable<T> = T | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
