"use client";

import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PRESETS = [
  { name: 'Classic', value: '#0f3b2e' },
  { name: 'Monochrome', value: '#000000' },
  { name: 'Neutral', value: '#8a8a8a' },
  { name: 'Dark Red', value: '#6b1a1a' },
  { name: 'Blue', value: '#1a4b6b' },
  { name: 'Warm Orange', value: '#ff4500' },
  { name: 'Pink', value: '#d87093' },
  { name: 'Teal', value: '#008080' },
];

export function ColorControl() {
  const { settings, updateSettings, isLoaded } = useSettings();
  const { surfaceColors } = settings;

  if (!isLoaded) {
    return <div className="mt-4 animate-pulse h-32 bg-muted/20 rounded-md" />;
  }

  const handlePresetSelect = (preset: { name: string; value: string }) => {
    updateSettings(prev => ({
      ...prev,
      surfaceColors: { preset: preset.name, custom: preset.value },
      background: { ...prev.background, color1: preset.value, type: 'Solid' }
    }));
  };

  const handleCustomColor = (val: string) => {
    updateSettings(prev => ({
      ...prev,
      surfaceColors: { preset: 'Custom', custom: val }
    }));
  };

  const handleGridColor = (val: string) => {
    updateSettings(prev => ({
      ...prev,
      surfaceColors: { preset: 'Custom', custom: prev.surfaceColors.custom },
      grid: { ...prev.grid, color: val }
    }));
  };

  return (
    <div className="mt-4">
      <hr className="border-border my-4" />
      
      <div className="grid grid-cols-3 gap-y-3 gap-x-2">
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
                "w-3.5 h-3.5 rounded-lg border border-border shadow-sm shrink-0",
                surfaceColors.preset === p.name ? "ring-2 ring-foreground ring-offset-1 ring-offset-background" : ""
              )}
              style={{ backgroundColor: p.value }}
            />
            <span className="font-mono text-[11px] truncate">{p.name}</span>
          </button>
        ))}
        
        {/* Custom option */}
        <button
          className={cn(
            "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
            surfaceColors.preset === 'Custom' ? "font-semibold text-foreground" : ""
          )}
          onClick={() => updateSettings(prev => ({ ...prev, surfaceColors: { ...prev.surfaceColors, preset: 'Custom' } }))}
        >
          <span 
            className={cn(
              "w-3.5 h-3.5 rounded-lg border border-border shadow-sm shrink-0",
              surfaceColors.preset === 'Custom' ? "ring-2 ring-foreground ring-offset-1 ring-offset-background" : ""
            )}
            style={{ background: 'linear-gradient(135deg, #111111 50%, #d8f26b 50%)' }}
          />
          <span className="font-mono text-[11px] truncate">Custom</span>
        </button>
      </div>
      
      <div className="mt-6 pl-3 border-l-2 border-border flex gap-4">
        <div className="flex-1 space-y-1">
          <Label className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Surface Color</Label>
          <div className="relative w-full h-8 rounded-md overflow-hidden border border-border shadow-sm">
            <input 
              type="color" 
              value={surfaceColors.custom} 
              onChange={(e) => handleCustomColor(e.target.value)}
              className="absolute -top-4 -left-4 w-[200%] h-[200%] cursor-pointer"
              suppressHydrationWarning
            />
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          <Label className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Guide Color</Label>
          <div className="relative w-full h-8 rounded-md overflow-hidden border border-border shadow-sm">
            <input 
              type="color" 
              value={settings.grid.color} 
              onChange={(e) => handleGridColor(e.target.value)}
              className="absolute -top-4 -left-4 w-[200%] h-[200%] cursor-pointer"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
