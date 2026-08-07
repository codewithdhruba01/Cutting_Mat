import { AppSettings } from "@/types";
import { unitToPixels } from "@/utils/svg";
import { Fragment } from "react";

interface Props {
  settings: AppSettings;
  widthPx: number;
  heightPx: number;
}

export function SvgGuides({ settings, widthPx, heightPx }: Props) {
  const cx = widthPx / 2;
  const cy = heightPx / 2;
  const maxRadius = Math.max(cx, cy);

  const { radiusGuides, angleGuides, diagonalGuides, crosshair, grid } = settings;

  const elements = [];

  // Radius Guides
  if (radiusGuides.enabled) {
    radiusGuides.radii.forEach((r, idx) => {
      const rPx = unitToPixels(r, settings.matSize.unit);
      elements.push(
        <circle
          key={`r-${idx}`}
          cx={cx}
          cy={cy}
          r={rPx}
          stroke={grid.color}
          strokeWidth={grid.minorThickness}
          fill="none"
        />
      );
      if (radiusGuides.labels) {
        elements.push(
          <text
            key={`r-lbl-${idx}`}
            x={cx + rPx + 4}
            y={cy}
            fill={settings.numericGuides.fontColor}
            fontSize={10}
            alignmentBaseline="middle"
          >
            {r}
          </text>
        );
      }
    });
  }

  // Angle Guides
  if (angleGuides.enabled) {
    const interval = angleGuides.interval || 15;
    for (let angle = 0; angle < 180; angle += interval) {
      if (angle === 0 || angle === 90) continue; // Skip straight crosshair axes if we just want pure angles, or draw them. Actually, crosshairs are separate, but 0/90 are diagonals? No, 0/90 are crosshairs.
      
      const rad = (angle * Math.PI) / 180;
      const dx = maxRadius * 2 * Math.cos(rad);
      const dy = maxRadius * 2 * Math.sin(rad);

      elements.push(
        <line
          key={`ang-${angle}`}
          x1={cx - dx}
          y1={cy - dy}
          x2={cx + dx}
          y2={cy + dy}
          stroke={grid.color}
          strokeWidth={grid.minorThickness}
          strokeDasharray={angleGuides.dashed ? "5,5" : "none"}
        />
      );

      if (angleGuides.labels) {
        elements.push(
          <text
            key={`ang-lbl-${angle}-1`}
            x={cx + maxRadius * 0.9 * Math.cos(rad)}
            y={cy + maxRadius * 0.9 * Math.sin(rad)}
            fill={settings.numericGuides.fontColor}
            fontSize={10}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {angle}°
          </text>
        );
      }
    }
  }

  // Diagonal Guides (45 and 60)
  if (diagonalGuides.enabled) {
    if (diagonalGuides.show45) {
      elements.push(
        <line key="diag-45-1" x1={0} y1={0} x2={widthPx} y2={heightPx} stroke={grid.color} strokeWidth={grid.majorThickness} />
      );
      elements.push(
        <line key="diag-45-2" x1={widthPx} y1={0} x2={0} y2={heightPx} stroke={grid.color} strokeWidth={grid.majorThickness} />
      );
    }
    // Simple 60 degree from corners if requested (though normally 60 originates from center in angle guides).
  }

  // Crosshair
  if (crosshair.enabled) {
    elements.push(
      <g key="crosshair" opacity={crosshair.opacity}>
        <line x1={0} y1={cy} x2={widthPx} y2={cy} stroke={grid.color} strokeWidth={grid.majorThickness} />
        <line x1={cx} y1={0} x2={cx} y2={heightPx} stroke={grid.color} strokeWidth={grid.majorThickness} />
      </g>
    );
  }

  return <Fragment>{elements}</Fragment>;
}
