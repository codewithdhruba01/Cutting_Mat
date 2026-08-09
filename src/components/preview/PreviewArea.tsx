"use client";

import { SvgMat } from "../svg/SvgMat";
import { TopToolbar } from "./TopToolbar";

export function PreviewArea() {
  return (
    <div className="relative w-full h-full flex flex-col bg-background/50 overflow-hidden">
      <TopToolbar />
      {/* Canvas Area */}
      <div className="flex-1 w-full h-full flex items-center justify-center pt-24 pb-12 px-8 lg:px-16 bg-[url('/grid.svg')] bg-center">
        <div
          id="svg-export-container"
          className="w-full h-full flex items-center justify-center bg-transparent rounded-xl"
        >
          <SvgMat />
        </div>
      </div>
    </div>
  );
}
