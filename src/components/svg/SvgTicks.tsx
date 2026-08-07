import { AppSettings } from "@/types";
import { unitToPixels } from "@/utils/svg";

interface Props {
  settings: AppSettings;
  widthPx: number;
  heightPx: number;
}

export function SvgTicks({ settings, widthPx, heightPx }: Props) {
  if (!settings.edgeTicks.enabled) return null;

  const { unit } = settings.matSize;
  const intervalPx = unitToPixels(settings.edgeTicks.interval, unit);
  const lengthPx = unitToPixels(settings.edgeTicks.length, "mm"); // standardizing tick length to mm or px? Let's just assume length is in pixels for simplicity, or mm. The requirement didn't specify units for length. Let's assume mm.
  const tickLen = unitToPixels(settings.edgeTicks.length, 'mm');

  let path = "";

  const addTick = (x: number, y: number, isVertical: boolean, position: 'Outside' | 'Inside' | 'Both') => {
    let x1 = x, y1 = y, x2 = x, y2 = y;
    
    if (isVertical) {
      // Top or bottom edge ticks
      if (y === 0) { // Top edge
        if (position === 'Inside' || position === 'Both') y2 += tickLen;
        if (position === 'Outside' || position === 'Both') y1 -= tickLen;
      } else { // Bottom edge
        if (position === 'Inside' || position === 'Both') y1 -= tickLen;
        if (position === 'Outside' || position === 'Both') y2 += tickLen;
      }
    } else {
      // Left or right edge ticks
      if (x === 0) { // Left edge
        if (position === 'Inside' || position === 'Both') x2 += tickLen;
        if (position === 'Outside' || position === 'Both') x1 -= tickLen;
      } else { // Right edge
        if (position === 'Inside' || position === 'Both') x1 -= tickLen;
        if (position === 'Outside' || position === 'Both') x2 += tickLen;
      }
    }
    
    path += `M ${x1} ${y1} L ${x2} ${y2} `;
  };

  // Top and Bottom edges
  for (let x = 0; x <= widthPx; x += intervalPx) {
    addTick(x, 0, true, settings.edgeTicks.position);
    addTick(x, heightPx, true, settings.edgeTicks.position);
  }

  // Left and Right edges
  for (let y = 0; y <= heightPx; y += intervalPx) {
    addTick(0, y, false, settings.edgeTicks.position);
    addTick(widthPx, y, false, settings.edgeTicks.position);
  }

  return (
    <path
      d={path}
      stroke={settings.grid.color}
      strokeWidth={settings.edgeTicks.width}
      fill="none"
    />
  );
}
