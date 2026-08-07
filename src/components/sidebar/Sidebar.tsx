"use client";

import { MatSizeControl } from "./MatSizeControl";
import { ColorControl } from "./ColorControl";
import { GridControl } from "./GridControl";
import { EdgeTicksControl, NumericGuidesControl, AdditionalGuidesControl } from "./OtherControls";
import { ExportControl } from "./ExportControl";

function Card({ title, children, description }: { title: string, children: React.ReactNode, description?: string }) {
  return (
    <div className="bg-card border rounded-xl p-4 shadow-sm mb-4">
      <h3 className="font-bold font-sans text-sm mb-1">{title}</h3>
      {description && <p className="text-xs text-muted-foreground mb-4 font-mono">{description}</p>}
      {children}
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="w-[380px] flex-shrink-0 h-full bg-background border-r flex flex-col z-20">
      <div className="flex-1 overflow-y-auto p-6">
        
        <div className="mb-8">
          <h1 className="text-lg font-bold font-mono tracking-tight text-white bg-[#0f3b2e] inline-block px-1 mb-2">
            Cutting mat bg generator
          </h1>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
            Fully customizable SVG cutting mat.<br/>
            Adjust size, grid, ticks, colors, and typography. Use it for backgrounds, and wallpapers.
          </p>
        </div>

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

        <Card title="Export">
          <ExportControl />
        </Card>

      </div>
    </div>
  );
}
