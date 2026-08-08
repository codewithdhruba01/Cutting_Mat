"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { MatSizeControl } from "./MatSizeControl";
import { ColorControl } from "./ColorControl";
import { GridControl } from "./GridControl";
import { EdgeTicksControl, NumericGuidesControl, AdditionalGuidesControl } from "./OtherControls";
import { ImageControl } from "./ImageControl";
import { ExportControl } from "./ExportControl";
import { cn } from "@/lib/utils";

function Card({ title, children, description }: { title: string, children: React.ReactNode, description?: string }) {
  return (
    <div className="bg-card border rounded-xl p-4 shadow-sm mb-4">
      <h3 className="font-bold font-sans text-sm mb-1">{title}</h3>
      {description && <p className="text-xs text-muted-foreground mb-4 font-mono">{description}</p>}
      {children}
    </div>
  );
}

export function SidebarHeader() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-lg font-bold font-mono tracking-tight text-white bg-[#0f3b2e] inline-block px-1 mb-2">
          Cutting mat bg generator
        </h1>
        <p className="text-xs text-muted-foreground font-mono leading-relaxed">
          Fully customizable SVG cutting mat.<br/>
          Adjust size, grid, ticks, colors, and typography. Use it for backgrounds, and wallpapers.
        </p>
      </div>
      <button 
        className="text-muted-foreground hover:text-foreground mt-1 ml-4"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {mounted && resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
}

export function SidebarContent() {
  return (
    <>
      <Card title="Mat Size">
        <MatSizeControl />
      </Card>

      <Card title="Surface" description="Control the mat's color, choose from a preset or create your own.">
        <ColorControl />
      </Card>

      <Card title="Guides" description="Configure alignment and measurement guides.">
        <div className="space-y-6">
          <EdgeTicksControl />
          <NumericGuidesControl />
          <GridControl />
          <AdditionalGuidesControl />
        </div>
      </Card>

      <Card title="Images" description="Import images to place on the cutting mat.">
        <ImageControl />
      </Card>

      <Card title="Export">
        <ExportControl />
      </Card>
    </>
  );
}

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("w-95 shrink-0 h-full bg-background border-r flex flex-col z-20", className)} suppressHydrationWarning>
      <div className="flex-1 overflow-y-auto p-6 auto-hide-scrollbar">
        
        <div className="mb-8">
          <SidebarHeader />
        </div>

        <SidebarContent />

      </div>
      
      <div className="p-6 pt-4 border-t text-left">
         <p className="text-xs text-muted-foreground">
            Made by <a href="https://codewithdhruba.in/" className="underline">@codewithdhruba</a>
         </p>
      </div>
    </div>
  );
}
