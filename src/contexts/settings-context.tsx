"use client";

import { useWorkspace } from "./workspace-context";

// We simply re-export the hook mapped to WorkspaceContext to avoid changing any consumer imports!
export function useSettings() {
  const workspace = useWorkspace();
  
  return {
    settings: workspace.settings,
    updateSettings: workspace.updateSettings,
    resetSettings: workspace.resetSettings,
    importSettings: workspace.importSettings,
    undo: workspace.undo,
    redo: workspace.redo,
    canUndo: workspace.canUndo,
    canRedo: workspace.canRedo,
    isLoaded: workspace.isLoaded,
  };
}
