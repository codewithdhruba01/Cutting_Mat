"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

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

interface ImageContextProps {
  images: MatImage[];
  selectedImageId: string | null;
  addImage: (image: Omit<MatImage, "id">) => void;
  updateImage: (id: string, update: Partial<MatImage>) => void;
  removeImage: (id: string) => void;
  setSelectedImageId: (id: string | null) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<MatImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const addImage = useCallback((image: Omit<MatImage, "id">) => {
    const newId = crypto.randomUUID();
    setImages((prev) => [...prev, { ...image, id: newId }]);
    setSelectedImageId(newId);
  }, []);

  const updateImage = useCallback((id: string, update: Partial<MatImage>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...update } : img))
    );
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      // Clean up blob URL to prevent memory leaks
      const imgToRemove = prev.find((img) => img.id === id);
      if (imgToRemove && imgToRemove.url.startsWith("blob:")) {
        URL.revokeObjectURL(imgToRemove.url);
      }
      return filtered;
    });
    setSelectedImageId((prevId) => (prevId === id ? null : prevId));
  }, []);

  return (
    <ImageContext.Provider
      value={{
        images,
        selectedImageId,
        addImage,
        updateImage,
        removeImage,
        setSelectedImageId,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
}
