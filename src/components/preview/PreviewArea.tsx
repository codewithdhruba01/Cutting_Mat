"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent as ReactMouseEvent } from "react";
import { SvgMat } from "../svg/SvgMat";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export function PreviewArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const isDragging = useRef(false);
  const startDragPos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = -e.deltaY * 0.002;
      setScale((s) => Math.min(Math.max(0.1, s + zoomFactor), 10));
    } else {
      // Pan
      setPosition(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel]);

  const handlePointerDown = (e: ReactMouseEvent) => {
    if (e.button === 1 || e.button === 0) { // Middle or left click
      isDragging.current = true;
      startDragPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      document.body.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: ReactMouseEvent) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - startDragPos.current.x,
        y: e.clientY - startDragPos.current.y
      });
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-background/50 overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-card p-2 rounded-xl border shadow-premium">
        <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(s + 0.2, 10))} title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <span className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
        <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(s - 0.2, 0.1))} title="Zoom Out">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border mx-1" />
        <Button variant="ghost" size="icon" onClick={() => { setScale(1); setPosition({x:0, y:0}); }} title="Reset View">
          <RefreshCcw className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => {
          // simple "fit" calculation - just reset to a smaller scale if on small screen
          setScale(0.5);
          setPosition({x: 0, y: 0});
        }} title="Fit to Screen">
          <Maximize className="w-4 h-4" />
        </Button>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center bg-[url('/grid.svg')] bg-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <motion.div
          id="svg-export-container"
          style={{
            x: position.x,
            y: position.y,
            scale: scale,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <SvgMat />
        </motion.div>
      </div>
    </div>
  );
}
