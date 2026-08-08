"use client";

import { Button } from "@/components/ui/button";
import { Image as ImageIcon, FileCode, RefreshCcw } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

export function ExportControl() {
  const { resetSettings } = useSettings();

  const handleExportSVG = () => {
    const svgElement = document.getElementById('svg-mat');
    if (!svgElement) return;

    // Temporarily hide handles
    const handles = svgElement.querySelectorAll('.no-export-handles');
    handles.forEach(el => el.setAttribute('display', 'none'));

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    saveAs(blob, "cutting-mat.svg");

    // Restore handles
    handles.forEach(el => el.removeAttribute('display'));
  };

  const handleExportPNG = async () => {
    const container = document.getElementById('svg-export-container');
    if (!container) return;
    try {
      // Temporarily hide handles
      const handles = container.querySelectorAll('.no-export-handles');
      handles.forEach(el => (el as SVGElement).style.display = 'none');

      // Temporarily remove transform to get true size for export
      const oldTransform = container.style.transform;
      container.style.transform = 'none';
      const dataUrl = await toPng(container, { pixelRatio: 2 });
      container.style.transform = oldTransform;
      
      // Restore handles
      handles.forEach(el => (el as SVGElement).style.display = '');
      
      saveAs(dataUrl, "cutting-mat.png");
    } catch (err) {
      console.error("Failed to export PNG", err);
    }
  };

  return (
    <div className="space-y-4 pt-2 pb-6">
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleExportSVG} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex gap-2">
          <FileCode className="w-4 h-4" /> SVG
        </Button>
        <Button onClick={handleExportPNG} variant="outline" className="w-full flex gap-2">
          <ImageIcon className="w-4 h-4" /> PNG
        </Button>
      </div>
      <Button onClick={resetSettings} variant="destructive" className="w-full flex gap-2">
        <RefreshCcw className="w-4 h-4" /> Reset All Settings
      </Button>
    </div>
  );
}
