"use client";

import { SvgMat } from "../svg/SvgMat";

export function PreviewArea() {
  return (
    <div className="relative w-full h-full flex flex-col bg-background/50 overflow-hidden">
      {/* Canvas Area */}
      <div className="flex-1 w-full h-full flex items-center justify-center p-8 bg-[url('/grid.svg')] bg-center">
        <div id="svg-export-container" className="w-full h-full flex items-center justify-center shadow-premium bg-transparent rounded-xl">
          <SvgMat />
        </div>
      </div>
    </div>
  );
}
