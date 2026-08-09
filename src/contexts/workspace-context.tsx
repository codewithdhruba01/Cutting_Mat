"use client";

import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspace-store";
import { defaultSettings } from "@/types";

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const setIsLoaded = useWorkspaceStore((state) => state.setIsLoaded);
  const updateSettings = useWorkspaceStore((state) => state.updateSettings);

  // Load from LocalStorage on mount (only once)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cutting-mat-settings");
      if (stored) {
        // We use the store's set method implicitly via updateSettings or just direct state mutation if needed.
        // But since updateSettings pushes to history and saves to localstorage, we should be careful.
        // Let's just use the store's internal state initialization for hydration.
        const parsed = JSON.parse(stored);
        useWorkspaceStore.setState({ settings: { ...defaultSettings, ...parsed } });
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
    setIsLoaded(true);
  }, [setIsLoaded]);

  return <>{children}</>;
}

export function useWorkspace() {
  return useWorkspaceStore();
}
