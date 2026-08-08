"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
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

export function SidebarHeader({ onToggleCollapse }: { onToggleCollapse?: () => void }) {
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
      <div className="flex items-center gap-3 mt-1 ml-4 shrink-0">
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          title="Toggle Theme"
        >
          {mounted && resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        {onToggleCollapse && (
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={onToggleCollapse}
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        )}
      </div>
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn("relative z-20 h-full shrink-0 transition-all duration-300", isCollapsed ? "w-0" : "w-95", className)} suppressHydrationWarning>
      <div className={cn("h-full w-full bg-background flex flex-col overflow-hidden", !isCollapsed && "border-r")}>
        <div className="flex flex-col h-full w-95 shrink-0">
          <div className="flex-1 overflow-y-auto p-6 auto-hide-scrollbar">
            
            <div className="mb-8">
              <SidebarHeader onToggleCollapse={() => setIsCollapsed(true)} />
            </div>

            <SidebarContent />

          </div>
          
          <div className="p-6 pt-4 border-t text-left">
             <p className="text-xs text-muted-foreground">
                Made by <a href="https://codewithdhruba.in/" className="underline">@codewithdhruba</a>
             </p>
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute top-6 z-50 transition-all duration-300",
          isCollapsed ? "left-6 opacity-100" : "left-0 opacity-0 pointer-events-none"
        )}
      >
        <button 
          onClick={() => setIsCollapsed(false)}
          className="bg-background border rounded-md p-2 shadow-sm hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
          title="Expand Sidebar"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
