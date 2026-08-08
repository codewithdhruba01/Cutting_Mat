"use client";

import { useWorkspace } from "./workspace-context";

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
  const workspace = useWorkspace();
  
  return {
    images: workspace.images,
    selectedImageId: workspace.selectedImageId,
    addImage: workspace.addImage,
    updateImage: workspace.updateImage,
    removeImage: workspace.removeImage,
    clearImages: workspace.clearImages,
    setSelectedImageId: workspace.setSelectedImageId,
  };
}
