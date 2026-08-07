import { AppSettings } from "@/types";
import { pixelsToUnit, unitToPixels } from "@/utils/svg";

interface Props {
  settings: AppSettings;
  widthPx: number;
  heightPx: number;
}

export function SvgNumbers({ settings, widthPx, heightPx }: Props) {
  if (!settings.numericGuides.enabled) return null;

  const { unit } = settings.matSize;
  const majorPx = unitToPixels(settings.grid.majorSize, unit);
  const { top, bottom, left, right, fontSize, fontFamily, fontColor, fontWeight } = settings.numericGuides;

  const labels: { x: number; y: number; text: string; anchor: "start" | "end" | "middle"; baseline: string }[] = [];

  const margin = 10; // offset from the edge

  // Horizontal labels (Top and Bottom)
  for (let x = 0; x <= widthPx; x += majorPx) {
    const val = pixelsToUnit(x, unit);
    // Don't render 0 if it overlaps with Y-axis 0
    if (x === 0 || Math.abs(x - widthPx) < 0.1) continue; 
    
    if (top) {
      labels.push({ x, y: margin, text: `${Math.round(val * 100) / 100}`, anchor: "middle", baseline: "hanging" });
    }
    if (bottom) {
      labels.push({ x, y: heightPx - margin, text: `${Math.round(val * 100) / 100}`, anchor: "middle", baseline: "auto" });
    }
  }

  // Vertical labels (Left and Right)
  for (let y = 0; y <= heightPx; y += majorPx) {
    const val = pixelsToUnit(y, unit);
    if (y === 0 || Math.abs(y - heightPx) < 0.1) continue;

    if (left) {
      labels.push({ x: margin, y, text: `${Math.round(val * 100) / 100}`, anchor: "start", baseline: "middle" });
    }
    if (right) {
      labels.push({ x: widthPx - margin, y, text: `${Math.round(val * 100) / 100}`, anchor: "end", baseline: "middle" });
    }
  }

  return (
    <g
      fill={fontColor}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {labels.map((lbl, idx) => (
        <text
          key={idx}
          x={lbl.x}
          y={lbl.y}
          textAnchor={lbl.anchor}
          alignmentBaseline={lbl.baseline as any}
        >
          {lbl.text}
        </text>
      ))}
    </g>
  );
}
