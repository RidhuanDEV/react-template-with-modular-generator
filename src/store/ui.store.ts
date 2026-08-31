import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/config/constants";

export type ThemeMode = "light" | "dark" | "system";
export type LayoutMode = "sidebar" | "header";

interface UIState {
  sidebarOpen: boolean;
  theme: ThemeMode;
  layoutMode: LayoutMode;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setLayoutMode: (mode: LayoutMode) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: "system",
      layoutMode: "sidebar",
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      setTheme: (theme: ThemeMode) => set({ theme }),
      toggleTheme: () =>
        set((state) => {
          if (state.theme === "light") {
            return { theme: "dark" };
          }
          if (state.theme === "dark") {
            return { theme: "system" };
          }
          return { theme: "light" };
        }),
      setLayoutMode: (layoutMode: LayoutMode) => set({ layoutMode }),
    }),
    {
      name: STORAGE_KEYS.THEME,
      partialize: (state) => ({
        theme: state.theme,
        layoutMode: state.layoutMode,
      }),
    },
  ),
);
