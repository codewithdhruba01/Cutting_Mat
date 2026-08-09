import { create } from "zustand";
import { AppSettings, defaultSettings } from "@/types";
import { MatImage } from "@/contexts/images-context";

export interface WorkspaceStateSnapshot {
  settings: AppSettings;
  images: MatImage[];
}

export interface WorkspaceStore {
  // Settings
  settings: AppSettings;
  updateSettings: (
    newSettings: Partial<AppSettings> | ((prev: AppSettings) => AppSettings)
  ) => void;
  resetSettings: () => void;
  importSettings: (json: string) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;

  // Images
  images: MatImage[];
  selectedImageId: string | null;
  addImage: (image: Omit<MatImage, "id">) => void;
  updateImage: (id: string, update: Partial<MatImage>) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  setSelectedImageId: (id: string | null) => void;

  // History
  past: WorkspaceStateSnapshot[];
  future: WorkspaceStateSnapshot[];
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Helpers
  pushToHistory: () => void;
  debouncedHistoryPush: () => void;
}

let timeoutId: NodeJS.Timeout | null = null;

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  settings: defaultSettings,
  images: [],
  selectedImageId: null,
  isLoaded: false,
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  pushToHistory: () => {
    const { settings, images, past } = get();
    set({
      past: [...past, { settings, images }],
      future: [],
      canUndo: true,
      canRedo: false,
    });
  },

  debouncedHistoryPush: () => {
    if (!timeoutId) {
      get().pushToHistory();
    } else {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, 500);
  },

  updateSettings: (update) => {
    get().debouncedHistoryPush();
    set((state) => {
      const newSettings =
        typeof update === "function" ? update(state.settings) : { ...state.settings, ...update };
      if (state.isLoaded) {
        localStorage.setItem("cutting-mat-settings", JSON.stringify(newSettings));
      }
      return { settings: newSettings };
    });
  },

  resetSettings: () => {
    get().pushToHistory();
    set((state) => {
      if (state.isLoaded) {
        localStorage.setItem("cutting-mat-settings", JSON.stringify(defaultSettings));
      }
      return { settings: defaultSettings };
    });
  },

  importSettings: (json: string) => {
    try {
      const parsed = JSON.parse(json);
      get().pushToHistory();
      set((state) => {
        const newSettings = { ...defaultSettings, ...parsed };
        if (state.isLoaded) {
          localStorage.setItem("cutting-mat-settings", JSON.stringify(newSettings));
        }
        return { settings: newSettings };
      });
    } catch (e) {
      console.error("Failed to parse settings JSON:", e);
    }
  },

  addImage: (image) => {
    get().pushToHistory();
    const newId = crypto.randomUUID();
    set((state) => ({
      images: [...state.images, { ...image, id: newId }],
      selectedImageId: newId,
    }));
  },

  updateImage: (id, update) => {
    get().debouncedHistoryPush();
    set((state) => ({
      images: state.images.map((img) => (img.id === id ? { ...img, ...update } : img)),
    }));
  },

  removeImage: (id) => {
    get().pushToHistory();
    set((state) => {
      const filtered = state.images.filter((img) => img.id !== id);
      const imgToRemove = state.images.find((img) => img.id === id);
      if (imgToRemove && imgToRemove.url.startsWith("blob:")) {
        URL.revokeObjectURL(imgToRemove.url);
      }
      return {
        images: filtered,
        selectedImageId: state.selectedImageId === id ? null : state.selectedImageId,
      };
    });
  },

  clearImages: () => {
    get().pushToHistory();
    set((state) => {
      state.images.forEach((img) => {
        if (img.url.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      });
      return {
        images: [],
        selectedImageId: null,
      };
    });
  },

  setSelectedImageId: (id) => set({ selectedImageId: id }),

  undo: () => {
    const { past, future, settings, images } = get();
    if (past.length === 0) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    const previousState = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    set({
      past: newPast,
      future: [{ settings, images }, ...future],
      settings: previousState.settings,
      images: previousState.images,
      canUndo: newPast.length > 0,
      canRedo: true,
    });
  },

  redo: () => {
    const { past, future, settings, images } = get();
    if (future.length === 0) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    const nextState = future[0];
    const newFuture = future.slice(1);

    set({
      past: [...past, { settings, images }],
      future: newFuture,
      settings: nextState.settings,
      images: nextState.images,
      canUndo: true,
      canRedo: newFuture.length > 0,
    });
  },
}));
