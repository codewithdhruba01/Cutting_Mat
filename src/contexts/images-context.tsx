"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";

export interface MatImage {
  id: string;
  url: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  borderRadius: number;
  opacity: number;
}

export function useImages() {
  return useWorkspaceStore(
    useShallow((state) => ({
      images: state.images,
      selectedImageId: state.selectedImageId,
      addImage: state.addImage,
      updateImage: state.updateImage,
      removeImage: state.removeImage,
      clearImages: state.clearImages,
      setSelectedImageId: state.setSelectedImageId,
    }))
  );
}
