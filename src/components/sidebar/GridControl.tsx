"use client";

import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export function GridControl() {
  const { settings, updateSettings } = useSettings();
  const { grid } = settings;

  const handleChange = (field: string, val: number | boolean) => {
    updateSettings(prev => ({
      ...prev,
      grid: { ...prev.grid, [field]: val }
    }));
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Enable Grid</Label>
        <Switch 
          checked={grid.enabled} 
          onCheckedChange={(val) => handleChange('enabled', val)}
        />
      </div>

      {grid.enabled && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase font-mono">Major Size</Label>
              <Input 
                type="number" 
                value={grid.majorSize} 
                onChange={(e) => handleChange('majorSize', Number(e.target.value))} 
                step={0.1}
                min={0.1}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase font-mono">Minor Size</Label>
              <Input 
                type="number" 
                value={grid.minorSize} 
                onChange={(e) => handleChange('minorSize', Number(e.target.value))} 
                step={0.01}
                min={0.01}
                className="font-mono"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground uppercase font-mono">Opacity</Label>
              <span className="text-xs font-mono">{Math.round(grid.opacity * 100)}%</span>
            </div>
            <Slider 
              value={[grid.opacity]} 
              onValueChange={(val: readonly number[] | number) => handleChange('opacity', Array.isArray(val) ? val[0] : val)} 
              min={0} 
              max={1} 
              step={0.01}
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground uppercase font-mono">Major Thickness</Label>
              <span className="text-xs font-mono">{grid.majorThickness}px</span>
            </div>
            <Slider 
              value={[grid.majorThickness]} 
              onValueChange={(val: readonly number[] | number) => handleChange('majorThickness', Array.isArray(val) ? val[0] : val)} 
              min={0.1} 
              max={10} 
              step={0.1}
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground uppercase font-mono">Minor Thickness</Label>
              <span className="text-xs font-mono">{grid.minorThickness}px</span>
            </div>
            <Slider 
              value={[grid.minorThickness]} 
              onValueChange={(val: readonly number[] | number) => handleChange('minorThickness', Array.isArray(val) ? val[0] : val)} 
              min={0.1} 
              max={10} 
              step={0.1}
            />
          </div>
        </>
      )}
    </div>
  );
}
