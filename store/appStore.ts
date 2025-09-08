"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  theme: "light" | "dark" | "system";
  sidebarOpen: boolean;
  currentService: string | null;
  preferences: {
    notifications: boolean;
    autoSave: boolean;
    language: string;
  };
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleSidebar: () => void;
  setCurrentService: (service: string) => void;
  updatePreferences: (prefs: Partial<AppState["preferences"]>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      sidebarOpen: true,
      currentService: null,
      preferences: {
        notifications: true,
        autoSave: true,
        language: "en",
      },

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setCurrentService: (service) => set({ currentService: service }),

      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: "app-storage",
    }
  )
);
