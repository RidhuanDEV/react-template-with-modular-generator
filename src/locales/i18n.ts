import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./en/common.json";
import enAuth from "./en/auth.json";
import enSettings from "./en/settings.json";
import enDashboard from "./en/dashboard.json";

import idCommon from "./id/common.json";
import idAuth from "./id/auth.json";
import idSettings from "./id/settings.json";
import idDashboard from "./id/dashboard.json";

export const defaultNS = "common";
export const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    settings: enSettings,
    dashboard: enDashboard,
  },
  id: {
    common: idCommon,
    auth: idAuth,
    settings: idSettings,
    dashboard: idDashboard,
  },
} as const;

export type SupportedLanguage = "en" | "id";

export const SUPPORTED_LANGUAGES: readonly {
  code: SupportedLanguage;
  name: string;
  flag: string;
}[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "id"],
    defaultNS,
    resources,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "app_language",
      caches: ["localStorage"],
    },
  });

export default i18n;
