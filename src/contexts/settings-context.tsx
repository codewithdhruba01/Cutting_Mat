"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { AppSettings, defaultSettings } from "@/types";

interface SettingsContextProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings> | ((prev: AppSettings) => AppSettings)) => void;
  resetSettings: () => void;
  importSettings: (json: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [past, setPast] = useState<AppSettings[]>([]);
  const [future, setFuture] = useState<AppSettings[]>([]);
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
      const next = typeof update === 'function' ? update(prev) : { ...prev, ...update };
      
      // Only push to past if there's an actual change (optional optimization, but simple reference check isn't enough)
      // To keep it simple, we push the current state to past every time it updates.
      setPast((p) => [...p, prev]);
      setFuture([]); // clear future on new action
      
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings((prev) => {
      setPast((p) => [...p, prev]);
      setFuture([]);
      return defaultSettings;
    });
  }, []);

  const importSettings = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      setSettings((prev) => {
        setPast((p) => [...p, prev]);
        setFuture([]);
        return { ...defaultSettings, ...parsed };
      });
    } catch (e) {
      console.error("Failed to parse settings JSON:", e);
    }
  }, []);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    setPast(newPast);
    setFuture([settings, ...future]);
    setSettings(previous);
  }, [past, future, settings]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    
    setPast([...past, settings]);
    setFuture(newFuture);
    setSettings(next);
  }, [past, future, settings]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  return (
    <SettingsContext.Provider value={{ 
      settings, updateSettings, resetSettings, importSettings, 
      undo, redo, canUndo, canRedo,
      isLoaded 
    }}>
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
