"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import { cn } from "@/lib/utils";

export function AppModeToggle() {
  const { appMode, setAppMode } = useWorkspaceStore();

  const options = [
    { value: "cutting-mat", label: "Cutting mat" },
    { value: "template", label: "Template" },
  ] as const;

  return (
    <div className="relative flex w-full items-center p-1 bg-muted rounded-xl mb-4 shadow-inner">
      {/* Sliding background indicator */}
      <div
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-background rounded-lg shadow-sm border border-border/40 transition-transform duration-300 ease-out",
          appMode === "template" ? "translate-x-full" : "translate-x-0"
        )}
      />

      {options.map((option) => {
        const isActive = appMode === option.value;
        return (
          <button
            type="button"
            key={option.value}
            onClick={(e) => {
              e.preventDefault();
              setAppMode(option.value);
            }}
            className={cn(
              "relative flex-1 py-1.5 text-sm font-semibold transition-colors duration-200 z-10 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
              isActive ? "text-foreground drop-shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="relative z-20 pointer-events-none">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
