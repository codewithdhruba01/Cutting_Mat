"use client";

import { SvgMat } from "../svg/SvgMat";
import { TopToolbar } from "./TopToolbar";

export function PreviewArea() {
  return (
    <div className="relative w-full h-full flex flex-col bg-background/50 overflow-hidden">
      {/* Canvas Area */}
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center pt-6 lg:pt-24 pb-12 px-4 lg:px-16 bg-[url('/grid.svg')] bg-center relative">
        <div className="lg:absolute lg:top-6 lg:left-1/2 lg:-translate-x-1/2 z-50 w-full flex justify-center lg:w-auto mb-4 lg:mb-0 shrink-0">
          <TopToolbar />
        </div>

        <div
          id="svg-export-container"
          className="w-full flex-1 min-h-0 flex items-center justify-center bg-transparent rounded-xl"
        >
          <SvgMat />
        </div>
      </div>
    </div>
  );
}
