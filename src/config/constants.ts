export const APP_NAME = "Starter App";

export const STORAGE_KEYS = {
  AUTH_SESSION: "auth_session",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  THEME: "theme",
} as const;

export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"],
    LOGIN: ["auth", "login"],
  },
  USERS: {
    LIST: ["users"],
    DETAIL: (id: string) => ["users", id],
  },
  EXAMPLES: {
    LIST: ["examples"],
    DETAIL: (id: string) => ["examples", id],
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  PER_PAGE_OPTIONS: [10, 25, 50, 100],
} as const;

export const DATE_FORMATS = {
  DISPLAY: "MMM D, YYYY",
  DISPLAY_WITH_TIME: "MMM D, YYYY h:mm A",
  API: "YYYY-MM-DD",
  API_WITH_TIME: "YYYY-MM-DDTHH:mm:ss",
} as const;
