import { AppSettings } from "@/types";
import { unitToPixels } from "@/utils/svg-utils";

interface Props {
  settings: AppSettings;
  widthPx: number;
  heightPx: number;
}

export function SvgGrid({ settings, widthPx, heightPx }: Props) {
  if (!settings.grid.enabled) return null;

  const { unit } = settings.matSize;
  const majorPx = unitToPixels(settings.grid.majorSize, unit);
  const minorPx = unitToPixels(settings.grid.minorSize, unit);

  // We need to render the lines. Creating paths is more efficient than lots of <line> elements.
  let minorPath = "";
  let majorPath = "";

  // Vertical lines
  for (let x = 0; x <= widthPx; x += minorPx) {
    const isMajor = Math.abs(x % majorPx) < 0.1 || Math.abs((x % majorPx) - majorPx) < 0.1;
    const line = `M ${x} 0 L ${x} ${heightPx} `;
    if (isMajor) majorPath += line;
    else minorPath += line;
  }

  // Horizontal lines
  for (let y = 0; y <= heightPx; y += minorPx) {
    const isMajor = Math.abs(y % majorPx) < 0.1 || Math.abs((y % majorPx) - majorPx) < 0.1;
    const line = `M 0 ${y} L ${widthPx} ${y} `;
    if (isMajor) majorPath += line;
    else minorPath += line;
  }

  return (
    <g opacity={settings.grid.opacity}>
      {minorPath && (
        <path
          d={minorPath}
          stroke={settings.grid.color}
          strokeWidth={settings.grid.minorThickness}
          fill="none"
        />
      )}
      {majorPath && (
        <path
          d={majorPath}
          stroke={settings.grid.color}
          strokeWidth={settings.grid.majorThickness}
          fill="none"
        />
      )}
    </g>
  );
}
