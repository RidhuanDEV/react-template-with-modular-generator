import dayjs from "dayjs";
import { DATE_FORMATS } from "@/config/constants";

export const formatDate = (
  date: string | Date,
  format: string = DATE_FORMATS.DISPLAY,
): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format(DATE_FORMATS.DISPLAY_WITH_TIME);
};

export const formatCurrency = (
  amount: number,
  currency = "USD",
  locale = "en-US",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatNumber = (value: number, locale = "en-US"): string => {
  return new Intl.NumberFormat(locale).format(value);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};
