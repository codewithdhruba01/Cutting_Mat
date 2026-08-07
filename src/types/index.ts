export type Unit = 'mm' | 'cm' | 'inch';

export interface MatSize {
  unit: Unit;
  width: number;
  height: number;
}

export interface SurfaceColors {
  preset: string;
  custom: string;
}

export interface GridSettings {
  enabled: boolean;
  majorSize: number;
  minorSize: number;
  opacity: number;
  color: string;
  majorThickness: number;
  minorThickness: number;
}

export interface EdgeTicks {
  enabled: boolean;
  length: number;
  width: number;
  interval: number;
  position: 'Outside' | 'Inside' | 'Both';
}

export interface NumericGuides {
  enabled: boolean;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontColor: string;
}

export interface RadiusGuides {
  enabled: boolean;
  radii: number[];
  labels: boolean;
}

export interface AngleGuides {
  enabled: boolean;
  interval: number; // 5, 10, 15, 30, 45, custom
  labels: boolean;
  dashed: boolean;
}

export interface TickMarks {
  enabled: boolean;
  length: number;
  thickness: number;
  opacity: number;
}

export interface DiagonalGuides {
  enabled: boolean;
  show45: boolean;
  show60: boolean;
}

export interface Crosshair {
  enabled: boolean;
  opacity: number;
}

export interface BorderSettings {
  thickness: number;
  roundedCorners: number;
  padding: number;
  innerMargin: number;
  outerMargin: number;
}

export interface AdvancedSettings {
  snap: boolean;
  lockAspectRatio: boolean;
  livePreview: boolean;
  showCoordinates: boolean;
  showOrigin: boolean;
}

export interface BackgroundSettings {
  type: 'Solid' | 'Gradient' | 'Transparent';
  color1: string;
  color2: string;
}

export interface AppSettings {
  matSize: MatSize;
  surfaceColors: SurfaceColors;
  grid: GridSettings;
  edgeTicks: EdgeTicks;
  numericGuides: NumericGuides;
  radiusGuides: RadiusGuides;
  angleGuides: AngleGuides;
  tickMarks: TickMarks;
  diagonalGuides: DiagonalGuides;
  crosshair: Crosshair;
  border: BorderSettings;
  advanced: AdvancedSettings;
  background: BackgroundSettings;
}

export const defaultSettings: AppSettings = {
  matSize: { unit: 'inch', width: 12, height: 12 },
  surfaceColors: { preset: 'Classic Green', custom: '#0b5c4d' },
  grid: { enabled: true, majorSize: 1, minorSize: 0.125, opacity: 0.8, color: '#b8d04d', majorThickness: 1.5, minorThickness: 0.5 },
  edgeTicks: { enabled: true, length: 5, width: 1, interval: 1, position: 'Inside' },
  numericGuides: { enabled: true, top: true, bottom: true, left: true, right: true, fontSize: 12, fontFamily: 'var(--font-geist-mono)', fontWeight: '400', fontColor: '#f5f5f5' },
  radiusGuides: { enabled: false, radii: [2, 4, 6], labels: true },
  angleGuides: { enabled: false, interval: 15, labels: true, dashed: true },
  tickMarks: { enabled: false, length: 10, thickness: 1, opacity: 0.5 },
  diagonalGuides: { enabled: false, show45: true, show60: false },
  crosshair: { enabled: true, opacity: 0.3 },
  border: { thickness: 2, roundedCorners: 8, padding: 20, innerMargin: 10, outerMargin: 10 },
  advanced: { snap: false, lockAspectRatio: false, livePreview: true, showCoordinates: true, showOrigin: true },
  background: { type: 'Solid', color1: '#0b5c4d', color2: '#1a1a1a' },
};
