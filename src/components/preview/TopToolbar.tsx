"use client";

import { useSettings, useImages } from "@/contexts";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2, ImagePlus, Maximize2 } from "lucide-react";
import { useRef } from "react";
import { unitToPixels } from "@/utils/svg-utils";

export function TopToolbar() {
  const { undo, redo, canUndo, canRedo, resetSettings, settings } = useSettings();
  const { addImage, clearImages } = useImages();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartOver = () => {
    resetSettings();
    clearImages();
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const { unit, width: matW, height: matH } = settings.matSize;
      const matWidthPx = unitToPixels(matW, unit);
      const matHeightPx = unitToPixels(matH, unit);

      const defaultMaxWidth = 200;
      const scale = Math.min(1, defaultMaxWidth / img.width);
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (matWidthPx - width) / 2;
      const y = (matHeightPx - height) / 2;

      addImage({
        url,
        name: file.name,
        x,
        y,
        width,
        height,
        rotation: 0,
        borderRadius: 0,
        opacity: 1,
      });
    };
    img.src = url;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 sm:gap-1 bg-[#1c1c1c] p-1 sm:p-1.5 rounded-full border border-border/10 shadow-xl backdrop-blur-md w-[95%] sm:w-auto justify-center max-w-fit">
      <input
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Undo */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-white h-8 w-8 sm:h-10 sm:w-10 shrink-0"
        disabled={!canUndo}
        onClick={undo}
        title="Undo"
      >
        <Undo2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </Button>

      <div className="w-px h-5 sm:h-6 bg-border/20 mx-0.5 sm:mx-1 shrink-0" />

      {/* Add Image */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-white h-8 w-8 sm:h-10 sm:w-10 shrink-0"
        onClick={() => fileInputRef.current?.click()}
        title="Add Image"
      >
        <ImagePlus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </Button>

      {/* Start Over */}
      <Button
        onClick={handleStartOver}
        className="rounded-full px-3 sm:px-5 h-8 sm:h-9 bg-[#2c2c2c] hover:bg-[#3c3c3c] text-white font-medium mx-0.5 sm:mx-1 text-xs sm:text-sm shrink-0 whitespace-nowrap"
        variant="secondary"
      >
        Start Over
      </Button>

      <div className="w-px h-5 sm:h-6 bg-border/20 mx-0.5 sm:mx-1 shrink-0" />

      {/* Fullscreen */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-white h-8 w-8 sm:h-10 sm:w-10 shrink-0"
        onClick={handleFullscreen}
        title="Full Screen"
      >
        <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </Button>

      {/* Redo */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-white h-8 w-8 sm:h-10 sm:w-10 shrink-0"
        disabled={!canRedo}
        onClick={redo}
        title="Redo"
      >
        <Redo2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </Button>
    </div>
  );
}
