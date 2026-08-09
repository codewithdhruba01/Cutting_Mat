import { Unit } from "@/types";

export const DPI = 96;

export function unitToPixels(value: number, unit: Unit): number {
  switch (unit) {
    case "inch":
      return value * DPI;
    case "cm":
      return (value * DPI) / 2.54;
    case "mm":
      return (value * DPI) / 25.4;
    default:
      return value;
  }
}

export function pixelsToUnit(value: number, unit: Unit): number {
  switch (unit) {
    case "inch":
      return value / DPI;
    case "cm":
      return (value * 2.54) / DPI;
    case "mm":
      return (value * 25.4) / DPI;
    default:
      return value;
  }
}

export function formatUnit(value: number): string {
  // Round to 2 decimal places if needed
  return Math.round(value * 100) / 100 + "";
}
