import { env } from "./env";

type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel = env.isDevelopment ? "debug" : "warn";

const shouldLog = (level: LogLevel): boolean => {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
};

export type LogMetadataValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Error
  | object;

export const logger = {
  debug: (message: string, ...args: LogMetadataValue[]): void => {
    if (shouldLog("debug")) console.debug(`[DEBUG] ${message}`, ...args);
  },
  info: (message: string, ...args: LogMetadataValue[]): void => {
    if (shouldLog("info")) console.info(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: LogMetadataValue[]): void => {
    if (shouldLog("warn")) console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: LogMetadataValue[]): void => {
    if (shouldLog("error")) console.error(`[ERROR] ${message}`, ...args);
  },
};
