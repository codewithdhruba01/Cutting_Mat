"use client";

import { useImages } from "@/contexts";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSettings } from "@/contexts";
import { unitToPixels } from "@/utils/svg-utils";

export function ImageControl() {
  const { images, selectedImageId, addImage, removeImage, setSelectedImageId, updateImage } =
    useImages();
  const { settings } = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedImage = images.find((i) => i.id === selectedImageId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    // Create an image element to get the original dimensions
    const img = new Image();
    img.onload = () => {
      // Calculate mat center
      const { unit, width: matW, height: matH } = settings.matSize;
      const matWidthPx = unitToPixels(matW, unit);
      const matHeightPx = unitToPixels(matH, unit);

      const defaultMaxWidth = 200; // 200px max width for initial import
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

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const updateProp = (prop: string, val: number) => {
    if (!selectedImageId) return;
    updateImage(selectedImageId, { [prop]: val });
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex gap-2"
        variant="outline"
      >
        <Upload className="w-4 h-4" /> Import Image
      </Button>

      {images.length > 0 && (
        <div className="space-y-2 mt-4">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Uploaded Images
          </Label>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {images.map((img) => (
              <div
                key={img.id}
                className={`flex items-center justify-between p-2 rounded-md border ${
                  selectedImageId === img.id
                    ? "border-primary bg-primary/10"
                    : "border-border/50 bg-background hover:bg-muted/50"
                } transition-colors cursor-pointer`}
                onClick={() => setSelectedImageId(img.id)}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <ImageIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm truncate">{img.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(img.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="space-y-4 mt-6 pt-4 border-t border-border/50">
          <Label className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
            Edit Image
          </Label>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between">
                <Label className="text-xs">Size (Width)</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round(selectedImage.width)}px
                </span>
              </div>
              <Slider
                min={10}
                max={2000}
                step={1}
                value={[selectedImage.width]}
                onValueChange={(val: number[]) => {
                  const newW = Array.isArray(val) ? val[0] : typeof val === "number" ? val : val[0];
                  if (newW === undefined) return;
                  const aspect = selectedImage.width / selectedImage.height;
                  updateImage(selectedImage.id, { width: newW, height: newW / aspect });
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <Label className="text-xs">X Position</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round(selectedImage.x)}px
                </span>
              </div>
              <Slider
                min={-500}
                max={2000}
                step={1}
                value={[selectedImage.x]}
                onValueChange={(val: number[]) => {
                  const v = Array.isArray(val) ? val[0] : typeof val === "number" ? val : val[0];
                  if (v !== undefined) updateProp("x", v);
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <Label className="text-xs">Y Position</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round(selectedImage.y)}px
                </span>
              </div>
              <Slider
                min={-500}
                max={2000}
                step={1}
                value={[selectedImage.y]}
                onValueChange={(val: number[]) => {
                  const v = Array.isArray(val) ? val[0] : typeof val === "number" ? val : val[0];
                  if (v !== undefined) updateProp("y", v);
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <Label className="text-xs">Rotation</Label>
                <span className="text-xs text-muted-foreground">{selectedImage.rotation}°</span>
              </div>
              <Slider
                min={0}
                max={360}
                step={1}
                value={[selectedImage.rotation]}
                onValueChange={(val: number[]) => {
                  const v = Array.isArray(val) ? val[0] : typeof val === "number" ? val : val[0];
                  if (v !== undefined) updateProp("rotation", v);
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <Label className="text-xs">Border Radius</Label>
                <span className="text-xs text-muted-foreground">
                  {selectedImage.borderRadius}px
                </span>
              </div>
              <Slider
                min={0}
                max={Math.min(selectedImage.width, selectedImage.height) / 2}
                step={1}
                value={[selectedImage.borderRadius]}
                onValueChange={(val: number[]) => {
                  const v = Array.isArray(val) ? val[0] : typeof val === "number" ? val : val[0];
                  if (v !== undefined) updateProp("borderRadius", v);
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <Label className="text-xs">Opacity</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round(selectedImage.opacity * 100)}%
                </span>
              </div>
              <Slider
                min={0.1}
                max={1}
                step={0.05}
                value={[selectedImage.opacity]}
                onValueChange={(val: number[]) => {
                  const v = Array.isArray(val) ? val[0] : typeof val === "number" ? val : val[0];
                  if (v !== undefined) updateProp("opacity", v);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
