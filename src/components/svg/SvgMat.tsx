import { useSettings } from "@/contexts";
import { unitToPixels } from "@/utils/svg-utils";
import { SvgGrid } from "./SvgGrid";
import { SvgTicks } from "./SvgTicks";
import { SvgNumbers } from "./SvgNumbers";
import { SvgGuides } from "./SvgGuides";
import { SvgImages } from "./SvgImages";

export function SvgMat() {
  const { settings, isLoaded } = useSettings();
  if (!isLoaded) return null;

  const { unit, width, height } = settings.matSize;
  const widthPx = unitToPixels(width, unit);
  const heightPx = unitToPixels(height, unit);

  let { padding } = settings.border;
  const { roundedCorners, thickness } = settings.border;

  // Make sure padding is large enough to fit the numbers
  if (settings.numericGuides.enabled) {
    const requiredPadding = settings.numericGuides.fontSize * 2.5 + 25;
    if (padding < requiredPadding) {
      padding = requiredPadding;
    }
  }

  // Determine background fill
  let bgFill = settings.surfaceColors.custom;
  if (settings.background.type === "Transparent") bgFill = "transparent";
  if (settings.background.type === "Gradient") {
    bgFill = "url(#mat-gradient)";
  }

  // The actual SVG viewing box includes padding and margins if specified
  const totalWidth = widthPx + padding * 2;
  const totalHeight = heightPx + padding * 2;

  return (
    <svg
      id="svg-mat"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      width="100%"
      height="100%"
      style={{
        borderRadius: roundedCorners,
        backgroundColor: bgFill === "transparent" ? "white" : "transparent", // For transparent preview visibility
      }}
    >
      <defs>
        <clipPath id="inner-mat-clip">
          <rect x={0} y={0} width={widthPx} height={heightPx} />
        </clipPath>
        {settings.background.type === "Gradient" && (
          <linearGradient id="mat-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={settings.background.color1} />
            <stop offset="100%" stopColor={settings.background.color2} />
          </linearGradient>
        )}
      </defs>

      {/* Main Mat Background */}
      <rect
        x={0}
        y={0}
        width={totalWidth}
        height={totalHeight}
        fill={bgFill}
        rx={roundedCorners}
        ry={roundedCorners}
      />

      {/* Drawing Area / Inner Box */}
      <g transform={`translate(${padding}, ${padding})`}>
        {/* Inner Border */}
        <rect
          x={0}
          y={0}
          width={widthPx}
          height={heightPx}
          fill="none"
          stroke={settings.grid.color}
          strokeWidth={thickness}
        />
        <g clipPath="url(#inner-mat-clip)">
          <SvgGrid settings={settings} widthPx={widthPx} heightPx={heightPx} />
          <SvgTicks settings={settings} widthPx={widthPx} heightPx={heightPx} />
          <SvgGuides settings={settings} widthPx={widthPx} heightPx={heightPx} />
          <SvgImages />
        </g>

        {/* Draw numbers outside clip so they can overhang if needed, though they shouldn't with margin */}
        <SvgNumbers settings={settings} widthPx={widthPx} heightPx={heightPx} />
      </g>
    </svg>
  );
}
