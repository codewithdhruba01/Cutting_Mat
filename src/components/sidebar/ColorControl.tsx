"use client";

import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PRESETS = [
  { name: 'Classic Green', value: '#0b5c4d' },
  { name: 'Blue', value: '#1a4b6b' },
  { name: 'Dark Red', value: '#6b1a1a' },
  { name: 'Teal', value: '#1a6b6b' },
  { name: 'Pink', value: '#6b1a4b' },
  { name: 'Warm Orange', value: '#6b3b1a' },
  { name: 'Monochrome', value: '#2a2a2a' },
  { name: 'Neutral', value: '#8a8a8a' },
];

export function ColorControl() {
  const { settings, updateSettings } = useSettings();
  const { surfaceColors, background } = settings;

  const handlePresetSelect = (preset: { name: string; value: string }) => {
    updateSettings(prev => ({
      ...prev,
      surfaceColors: { preset: preset.name, custom: preset.value },
      background: { ...prev.background, color1: preset.value, type: 'Solid' } // Also update background if solid
    }));
  };

  const handleCustomColor = (val: string) => {
    updateSettings(prev => ({
      ...prev,
      surfaceColors: { preset: 'Custom', custom: val }
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map(p => (
          <button
            key={p.name}
            title={p.name}
            className={cn(
              "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              surfaceColors.preset === p.name ? "font-semibold text-foreground" : ""
            )}
            onClick={() => handlePresetSelect(p)}
          >
            <span 
              className={cn(
                "w-3 h-3 rounded-full border border-border shadow-sm",
                surfaceColors.preset === p.name ? "ring-2 ring-ring ring-offset-1 ring-offset-background" : ""
              )}
              style={{ backgroundColor: p.value }}
            />
            {p.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground uppercase font-mono">Custom Color</Label>
        <div className="flex items-center gap-2">
          <Input 
            type="color" 
            value={surfaceColors.custom} 
            onChange={(e) => handleCustomColor(e.target.value)}
            className="w-12 h-8 p-1 cursor-pointer"
          />
          <Input 
            type="text" 
            value={surfaceColors.custom} 
            onChange={(e) => handleCustomColor(e.target.value)}
            className="flex-1 font-mono uppercase"
          />
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t">
        <Label className="text-xs text-muted-foreground uppercase font-mono">Grid Color</Label>
        <div className="flex items-center gap-2">
          <Input 
            type="color" 
            value={settings.grid.color} 
            onChange={(e) => updateSettings(prev => ({ ...prev, grid: { ...prev.grid, color: e.target.value } }))}
            className="w-12 h-8 p-1 cursor-pointer"
          />
          <Input 
            type="text" 
            value={settings.grid.color} 
            onChange={(e) => updateSettings(prev => ({ ...prev, grid: { ...prev.grid, color: e.target.value } }))}
            className="flex-1 font-mono uppercase"
          />
        </div>
      </div>
    </div>
  );
}
