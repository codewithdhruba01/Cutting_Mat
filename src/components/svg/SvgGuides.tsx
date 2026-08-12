import { AppSettings } from "@/types";
import { unitToPixels } from "@/utils/svg-utils";
import React, { useMemo } from "react";

interface Props {
  settings: AppSettings;
  widthPx: number;
  heightPx: number;
}

export function SvgGuides({ settings, widthPx, heightPx }: Props) {
  // Origin for angles and radius (bottom left)
  const cx = 0;
  const cy = heightPx;
  const maxRadius = Math.sqrt(widthPx * widthPx + heightPx * heightPx);

  const { radiusGuides, angleGuides, diagonalGuides, crosshair, grid, matSize } = settings;
  const unit = matSize.unit;

  const elements = useMemo(() => {
    const elems: React.ReactNode[] = [];

    // Radius Guides (Arcs)
    if (radiusGuides.enabled) {
      radiusGuides.radii.forEach((radiusValue) => {
        const r = unitToPixels(radiusValue, unit);
        if (r <= 0) return;

        // Draw arc from right (x-axis) to top (y-axis)
        // Start point: (r, cy)
        // End point: (0, cy - r)
        const pathData = `M ${r} ${cy} A ${r} ${r} 0 0 0 0 ${cy - r}`;

        elems.push(
          <path
            key={`rad-${radiusValue}`}
            d={pathData}
            stroke={grid.color}
            strokeWidth={Math.max(grid.minorThickness * 1.5, 1)}
            fill="none"
          />
        );
      });
    }

    // Angle Guides (15, 30, 45, 60)
    if (angleGuides.enabled) {
      const specificAngles = [15, 30, 45, 60];
      const r10 = unitToPixels(10, unit); // Radius 10 for label placement

      specificAngles.forEach((angle) => {
        const rad = (angle * Math.PI) / 180;
        const dx = maxRadius * Math.cos(rad);
        const dy = maxRadius * Math.sin(rad);

        elems.push(
          <line
            key={`ang-${angle}`}
            x1={cx}
            y1={cy}
            x2={cx + dx}
            y2={cy - dy}
            stroke={grid.color}
            strokeWidth={Math.max(grid.minorThickness * 1.5, 1)}
            strokeDasharray={angleGuides.dashed ? "6,6" : "none"}
          />
        );

        if (angleGuides.labels) {
          const labelR = r10;
          const labelX = cx + labelR * Math.cos(rad);
          const labelY = cy - labelR * Math.sin(rad);
          const offsetX = 10 * Math.cos(rad);
          const offsetY = -10 * Math.sin(rad);

          elems.push(
            <text
              key={`ang-lbl-${angle}`}
              x={labelX + offsetX}
              y={labelY + offsetY}
              fill={settings.numericGuides.fontColor}
              fontSize={18}
              fontFamily="var(--font-geist-mono), monospace"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {angle}°
            </text>
          );
        }
      });
    }

    // Exact Diagonal Pattern
    if (diagonalGuides.enabled) {
      const cm35 = unitToPixels(35, unit);
      const cm15 = unitToPixels(15, unit);
      const cm50 = unitToPixels(50, unit);

      elems.push(
        <line
          key="diag-2"
          x1={cm15}
          y1={heightPx}
          x2={cm50}
          y2={heightPx - cm35}
          stroke={grid.color}
          strokeWidth={Math.max(grid.minorThickness * 1.5, 1)}
          strokeDasharray="6,6"
        />
      );

      elems.push(
        <line
          key="diag-3"
          x1={0}
          y1={0}
          x2={cm35}
          y2={cm35}
          stroke={grid.color}
          strokeWidth={Math.max(grid.minorThickness * 1.5, 1)}
          strokeDasharray="6,6"
        />
      );

      elems.push(
        <line
          key="diag-4"
          x1={cm15}
          y1={0}
          x2={cm50}
          y2={cm35}
          stroke={grid.color}
          strokeWidth={Math.max(grid.minorThickness * 1.5, 1)}
          strokeDasharray="6,6"
        />
      );
    }

    // Crosshair
    if (crosshair.enabled) {
      elems.push(
        <g key="crosshair" opacity={crosshair.opacity}>
          <line
            x1={0}
            y1={cy}
            x2={widthPx}
            y2={cy}
            stroke={grid.color}
            strokeWidth={grid.majorThickness}
          />
          <line
            x1={cx}
            y1={0}
            x2={cx}
            y2={heightPx}
            stroke={grid.color}
            strokeWidth={grid.majorThickness}
          />
        </g>
      );
    }

    return elems;
  }, [
    radiusGuides,
    angleGuides,
    diagonalGuides,
    crosshair,
    grid,
    settings.numericGuides.fontColor,
    unit,
    widthPx,
    heightPx,
    cx,
    cy,
    maxRadius,
  ]);

  return <g>{elements}</g>;
}
