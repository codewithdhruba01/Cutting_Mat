import { AppSettings } from "@/types";
import { unitToPixels } from "@/utils/svg-utils";

interface Props {
  settings: AppSettings;
  widthPx: number;
  heightPx: number;
}

export function SvgTicks({ settings, widthPx, heightPx }: Props) {
  if (!settings.edgeTicks.enabled) return null;

  const { unit } = settings.matSize;
  // Use minor size from grid for tick intervals
  const minorPx = unitToPixels(settings.grid.minorSize, unit);
  const majorPx = unitToPixels(settings.grid.majorSize, unit);
  
  const tickLen = unitToPixels(settings.edgeTicks.length, 'mm');

  let path = "";

  const addTick = (x: number, y: number, isVertical: boolean, position: 'Outside' | 'Inside' | 'Both', isMajor: boolean) => {
    let x1 = x, y1 = y, x2 = x, y2 = y;
    
    // Major ticks are twice as long
    const currentTickLen = isMajor ? tickLen * 2 : tickLen;
    
    if (isVertical) {
      if (y === 0) { // Top edge
        if (position === 'Inside' || position === 'Both') y2 += currentTickLen;
        if (position === 'Outside' || position === 'Both') y1 -= currentTickLen;
      } else { // Bottom edge
        if (position === 'Inside' || position === 'Both') y1 -= currentTickLen;
        if (position === 'Outside' || position === 'Both') y2 += currentTickLen;
      }
    } else {
      if (x === 0) { // Left edge
        if (position === 'Inside' || position === 'Both') x2 += currentTickLen;
        if (position === 'Outside' || position === 'Both') x1 -= currentTickLen;
      } else { // Right edge
        if (position === 'Inside' || position === 'Both') x1 -= currentTickLen;
        if (position === 'Outside' || position === 'Both') x2 += currentTickLen;
      }
    }
    
    path += `M ${x1} ${y1} L ${x2} ${y2} `;
  };

  // Top and Bottom edges
  for (let x = 0; x <= widthPx; x += minorPx) {
    const isMajor = Math.abs(x % majorPx) < 0.1 || Math.abs((x % majorPx) - majorPx) < 0.1;
    addTick(x, 0, true, settings.edgeTicks.position, isMajor);
    addTick(x, heightPx, true, settings.edgeTicks.position, isMajor);
  }

  // Left and Right edges
  for (let y = 0; y <= heightPx; y += minorPx) {
    const isMajor = Math.abs(y % majorPx) < 0.1 || Math.abs((y % majorPx) - majorPx) < 0.1;
    addTick(0, y, false, settings.edgeTicks.position, isMajor);
    addTick(widthPx, y, false, settings.edgeTicks.position, isMajor);
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
