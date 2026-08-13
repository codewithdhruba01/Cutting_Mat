"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import { presets, Template } from "@/config/templates";
import { cn } from "@/lib/utils";

export function TemplateContent() {
  const { updateSettings } = useWorkspaceStore();

  const handleApplyTemplate = (template: Template) => {
    updateSettings(template.settings);
  };

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h3 className="font-bold font-sans text-sm mb-1">Layout Presets</h3>
        <p className="text-xs text-muted-foreground font-mono">
          Click a preset to apply its configuration instantly.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {presets.map((template) => (
          <button
            key={template.id}
            onClick={() => handleApplyTemplate(template)}
            className="group relative flex w-full flex-col items-start overflow-hidden rounded-xl border border-border/50 bg-card p-0 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {/* Visual Thumbnail / Color Header */}
            <div
              className={cn(
                "h-24 w-full opacity-90 transition-opacity group-hover:opacity-100",
                template.themeColor
              )}
            >
              {/* Optional: We could add a mini-preview SVG here, but abstract gradients work beautifully */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            </div>

            {/* Template Info */}
            <div className="p-4 w-full">
              <h4 className="font-semibold text-sm mb-1 font-sans">{template.name}</h4>
              <p className="text-xs text-muted-foreground font-mono line-clamp-2">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
