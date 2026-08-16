"use client";

import { useSettings } from "@/contexts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Unit } from "@/types";

export function MatSizeControl() {
  const { settings, updateSettings } = useSettings();
  const { width, height, unit } = settings.matSize;

  const handleChange = (field: string, val: string | number) => {
    updateSettings((prev) => ({
      ...prev,
      matSize: { ...prev.matSize, [field]: val },
    }));
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase font-mono">Width</Label>
          <Input
            type="number"
            value={width}
            onChange={(e) => handleChange("width", Number(e.target.value))}
            min={1}
            max={1000}
            className="font-mono w-20"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase font-mono">Height</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => handleChange("height", Number(e.target.value))}
            min={1}
            max={1000}
            className="font-mono w-20"
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label className="text-xs text-muted-foreground uppercase font-mono">Unit</Label>
          <Select value={unit} onValueChange={(val) => handleChange("unit", val as Unit)}>
            <SelectTrigger className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mm">Millimeters (mm)</SelectItem>
              <SelectItem value="cm">Centimeters (cm)</SelectItem>
              <SelectItem value="inch">Inches (in)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
