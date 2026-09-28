import { env } from "./env";

export interface CustomThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
}

export const applyCustomPalette = (colors: CustomThemeColors): void => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  if (colors.primary) {
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--sidebar-primary", colors.primary);
  }
  if (colors.secondary) {
    root.style.setProperty("--secondary", colors.secondary);
  }
  if (colors.accent) {
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--sidebar-accent", colors.accent);
  }
  if (colors.background) {
    root.style.setProperty("--background", colors.background);
  }
};

export const initializeEnvTheme = (): void => {
  if (
    env.theme.colorPrimary ||
    env.theme.colorSecondary ||
    env.theme.colorAccent ||
    env.theme.colorBackground
  ) {
    applyCustomPalette({
      primary: env.theme.colorPrimary,
      secondary: env.theme.colorSecondary,
      accent: env.theme.colorAccent,
      background: env.theme.colorBackground,
    });
  }
};
