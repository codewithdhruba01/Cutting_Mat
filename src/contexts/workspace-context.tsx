"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { AppSettings, defaultSettings } from "@/types";
import { MatImage } from "./images-context";

interface WorkspaceState {
  settings: AppSettings;
  images: MatImage[];
}

export interface WorkspaceContextProps {
  // Settings
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings> | ((prev: AppSettings) => AppSettings)) => void;
  resetSettings: () => void;
  importSettings: (json: string) => void;
  isLoaded: boolean;
  
  // Images
  images: MatImage[];
  selectedImageId: string | null;
  addImage: (image: Omit<MatImage, "id">) => void;
  updateImage: (id: string, update: Partial<MatImage>) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  setSelectedImageId: (id: string | null) => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [images, setImages] = useState<MatImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  
  const [past, setPast] = useState<WorkspaceState[]>([]);
  const [future, setFuture] = useState<WorkspaceState[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Save settings to LocalStorage on change (Images are kept transient)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cutting-mat-settings", JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  // History Helper
  const pushToHistory = useCallback(() => {
    setPast((p) => [...p, { settings, images }]);
    setFuture([]);
  }, [settings, images]);

  const debouncedHistoryPush = useCallback(() => {
    if (!timeoutRef.current) {
      // If it's the first change in a while, snapshot the CURRENT state before it changes
      pushToHistory();
    } else {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, 500);
  }, [pushToHistory]);

  // Settings Actions
  const updateSettings = useCallback((update: Partial<AppSettings> | ((prev: AppSettings) => AppSettings)) => {
    debouncedHistoryPush();
    setSettings((prev) => typeof update === 'function' ? update(prev) : { ...prev, ...update });
  }, [debouncedHistoryPush]);

  const resetSettings = useCallback(() => {
    pushToHistory();
    setSettings(defaultSettings);
  }, [pushToHistory]);

  const importSettings = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      pushToHistory();
      setSettings({ ...defaultSettings, ...parsed });
    } catch (e) {
      console.error("Failed to parse settings JSON:", e);
    }
  }, [pushToHistory]);

  // Images Actions
  const addImage = useCallback((image: Omit<MatImage, "id">) => {
    pushToHistory(); // Explicit push for explicit actions
    const newId = crypto.randomUUID();
    setImages((prev) => [...prev, { ...image, id: newId }]);
    setSelectedImageId(newId);
  }, [pushToHistory]);

  const updateImage = useCallback((id: string, update: Partial<MatImage>) => {
    debouncedHistoryPush();
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...update } : img))
    );
  }, [debouncedHistoryPush]);

  const removeImage = useCallback((id: string) => {
    pushToHistory();
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const imgToRemove = prev.find((img) => img.id === id);
      if (imgToRemove && imgToRemove.url.startsWith("blob:")) {
        URL.revokeObjectURL(imgToRemove.url);
      }
      return filtered;
    });
    setSelectedImageId((prevId) => (prevId === id ? null : prevId));
  }, [pushToHistory]);

  const clearImages = useCallback(() => {
    pushToHistory();
    setImages((prev) => {
      prev.forEach((img) => {
        if (img.url.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      });
      return [];
    });
    setSelectedImageId(null);
  }, [pushToHistory]);

  // Undo / Redo
  const undo = useCallback(() => {
    if (past.length === 0) return;
    
    // Cancel any pending debounces to avoid overwriting history right after an undo
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const previousState = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    setPast(newPast);
    setFuture([{ settings, images }, ...future]);
    
    setSettings(previousState.settings);
    setImages(previousState.images);
  }, [past, future, settings, images]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const nextState = future[0];
    const newFuture = future.slice(1);
    
    setPast([...past, { settings, images }]);
    setFuture(newFuture);
    
    setSettings(nextState.settings);
    setImages(nextState.images);
  }, [past, future, settings, images]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  return (
    <WorkspaceContext.Provider value={{
      settings, updateSettings, resetSettings, importSettings, isLoaded,
      images, selectedImageId, addImage, updateImage, removeImage, clearImages, setSelectedImageId,
      undo, redo, canUndo, canRedo
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
