"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { AppSettings, defaultSettings } from "@/types";

interface SettingsContextProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings> | ((prev: AppSettings) => AppSettings)) => void;
  resetSettings: () => void;
  importSettings: (json: string) => void;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cutting-mat-settings");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cutting-mat-settings", JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const updateSettings = useCallback((update: Partial<AppSettings> | ((prev: AppSettings) => AppSettings)) => {
    setSettings((prev) => {
      if (typeof update === 'function') {
        return update(prev);
      }
      return { ...prev, ...update };
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const importSettings = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      setSettings({ ...defaultSettings, ...parsed });
    } catch (e) {
      console.error("Failed to parse settings JSON:", e);
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, importSettings, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
