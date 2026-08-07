"use client";

import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export function EdgeTicksControl() {
  const { settings, updateSettings } = useSettings();
  const { edgeTicks } = settings;

  const handleChange = (field: string, val: number | boolean) => {
    updateSettings(prev => ({
      ...prev,
      edgeTicks: { ...prev.edgeTicks, [field]: val }
    }));
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Enable Edge Ticks</Label>
        <Switch checked={edgeTicks.enabled} onCheckedChange={(val) => handleChange('enabled', val)} />
      </div>
      {edgeTicks.enabled && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase font-mono">Length</Label>
            <Input type="number" value={edgeTicks.length} onChange={(e) => handleChange('length', Number(e.target.value))} className="font-mono" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase font-mono">Interval</Label>
            <Input type="number" value={edgeTicks.interval} onChange={(e) => handleChange('interval', Number(e.target.value))} className="font-mono" />
          </div>
        </div>
      )}
    </div>
  );
}

export function NumericGuidesControl() {
  const { settings, updateSettings } = useSettings();
  const { numericGuides } = settings;

  const handleChange = (field: string, val: number | boolean) => {
    updateSettings(prev => ({
      ...prev,
      numericGuides: { ...prev.numericGuides, [field]: val }
    }));
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Enable Numbers</Label>
        <Switch checked={numericGuides.enabled} onCheckedChange={(val) => handleChange('enabled', val)} />
      </div>
      {numericGuides.enabled && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Label className="flex items-center gap-2 text-sm"><Switch checked={numericGuides.top} onCheckedChange={(val) => handleChange('top', val)}/> Top</Label>
            <Label className="flex items-center gap-2 text-sm"><Switch checked={numericGuides.bottom} onCheckedChange={(val) => handleChange('bottom', val)}/> Bottom</Label>
            <Label className="flex items-center gap-2 text-sm"><Switch checked={numericGuides.left} onCheckedChange={(val) => handleChange('left', val)}/> Left</Label>
            <Label className="flex items-center gap-2 text-sm"><Switch checked={numericGuides.right} onCheckedChange={(val) => handleChange('right', val)}/> Right</Label>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase font-mono">Font Size</Label>
            <Input type="number" value={numericGuides.fontSize} onChange={(e) => handleChange('fontSize', Number(e.target.value))} className="font-mono" />
          </div>
        </>
      )}
    </div>
  );
}

export function AdditionalGuidesControl() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Radius Guides</Label>
        <Switch checked={settings.radiusGuides.enabled} onCheckedChange={(val) => updateSettings(p => ({...p, radiusGuides: {...p.radiusGuides, enabled: val}}))} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Angle Guides</Label>
        <Switch checked={settings.angleGuides.enabled} onCheckedChange={(val) => updateSettings(p => ({...p, angleGuides: {...p.angleGuides, enabled: val}}))} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Diagonal Guides (45°)</Label>
        <Switch checked={settings.diagonalGuides.enabled} onCheckedChange={(val) => updateSettings(p => ({...p, diagonalGuides: {...p.diagonalGuides, enabled: val}}))} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Center Crosshair</Label>
        <Switch checked={settings.crosshair.enabled} onCheckedChange={(val) => updateSettings(p => ({...p, crosshair: {...p.crosshair, enabled: val}}))} />
      </div>
    </div>
  );
}
