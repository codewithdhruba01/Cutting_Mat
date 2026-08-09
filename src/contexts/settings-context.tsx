"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";

export function useSettings() {
  return useWorkspaceStore(
    useShallow((state) => ({
      settings: state.settings,
      updateSettings: state.updateSettings,
      resetSettings: state.resetSettings,
      importSettings: state.importSettings,
      undo: state.undo,
      redo: state.redo,
      canUndo: state.canUndo,
      canRedo: state.canRedo,
      isLoaded: state.isLoaded,
    }))
  );
}
