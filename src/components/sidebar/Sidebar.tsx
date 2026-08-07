"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MatSizeControl } from "./MatSizeControl";
import { ColorControl } from "./ColorControl";
import { GridControl } from "./GridControl";
import { EdgeTicksControl, NumericGuidesControl, AdditionalGuidesControl } from "./OtherControls";
import { ExportControl } from "./ExportControl";
import { Layers } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-[340px] flex-shrink-0 h-full bg-card border-r shadow-premium flex flex-col z-20">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold flex items-center gap-2 text-foreground tracking-tight">
          <Layers className="text-primary w-6 h-6" />
          Cutting Mat Pro
        </h1>
        <p className="text-sm text-muted-foreground mt-1 font-mono">SVG Background Generator</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion defaultValue={["mat-size", "colors", "grid", "export"]} className="w-full">
            
            <AccordionItem value="mat-size" className="border-b-0 mb-4 bg-background/50 rounded-xl px-4 py-1 shadow-sm">
              <AccordionTrigger className="hover:no-underline font-semibold font-mono text-sm uppercase tracking-wider">Mat Size</AccordionTrigger>
              <AccordionContent>
                <MatSizeControl />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="colors" className="border-b-0 mb-4 bg-background/50 rounded-xl px-4 py-1 shadow-sm">
              <AccordionTrigger className="hover:no-underline font-semibold font-mono text-sm uppercase tracking-wider">Colors & Theme</AccordionTrigger>
              <AccordionContent>
                <ColorControl />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="grid" className="border-b-0 mb-4 bg-background/50 rounded-xl px-4 py-1 shadow-sm">
              <AccordionTrigger className="hover:no-underline font-semibold font-mono text-sm uppercase tracking-wider">Grid Controls</AccordionTrigger>
              <AccordionContent>
                <GridControl />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="guides" className="border-b-0 mb-4 bg-background/50 rounded-xl px-4 py-1 shadow-sm">
              <AccordionTrigger className="hover:no-underline font-semibold font-mono text-sm uppercase tracking-wider">Guides & Ticks</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <EdgeTicksControl />
                  <div className="w-full h-px bg-border/50" />
                  <NumericGuidesControl />
                  <div className="w-full h-px bg-border/50" />
                  <AdditionalGuidesControl />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="export" className="border-b-0 mb-4 bg-background/50 rounded-xl px-4 py-1 shadow-sm">
              <AccordionTrigger className="hover:no-underline font-semibold font-mono text-sm uppercase tracking-wider">Export & Reset</AccordionTrigger>
              <AccordionContent>
                <ExportControl />
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
