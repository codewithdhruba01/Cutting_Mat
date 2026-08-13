import { AppSettings, defaultSettings } from "@/types";

export interface Template {
  id: string;
  name: string;
  description: string;
  themeColor: string; // Tailwind gradient class
  settings: Partial<AppSettings>;
}

export const presets: Template[] = [
  {
    id: "classic-green",
    name: "Classic Green",
    description: "The traditional cutting mat layout.",
    themeColor: "bg-gradient-to-br from-[#0b5c4d] to-[#128f76]",
    settings: {
      ...defaultSettings,
      surfaceColors: { preset: "Classic Green", custom: "#0b5c4d" },
      background: { type: "Solid", color1: "#0b5c4d", color2: "#0b5c4d" },
      grid: { ...defaultSettings.grid, color: "#b8d04d" },
      numericGuides: { ...defaultSettings.numericGuides, fontColor: "#b8d04d" },
    },
  },
  {
    id: "dark-blueprint",
    name: "Dark Blueprint",
    description: "Architectural blueprint style.",
    themeColor: "bg-gradient-to-br from-blue-900 to-blue-700",
    settings: {
      ...defaultSettings,
      surfaceColors: { preset: "Custom", custom: "#0f172a" },
      background: { type: "Solid", color1: "#0f172a", color2: "#0f172a" },
      grid: { ...defaultSettings.grid, color: "#38bdf8", opacity: 0.8 },
      numericGuides: { ...defaultSettings.numericGuides, fontColor: "#38bdf8" },
    },
  },
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    description: "Dark mode with glowing pink and cyan accents.",
    themeColor: "bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-600",
    settings: {
      ...defaultSettings,
      surfaceColors: { preset: "Custom", custom: "#09090b" },
      background: { type: "Solid", color1: "#09090b", color2: "#09090b" },
      grid: { ...defaultSettings.grid, color: "#e879f9", opacity: 0.6 },
      numericGuides: { ...defaultSettings.numericGuides, fontColor: "#22d3ee" },
      angleGuides: { ...defaultSettings.angleGuides, dashed: false },
    },
  },
  {
    id: "minimalist-light",
    name: "Minimalist Light",
    description: "Clean, distraction-free light surface.",
    themeColor: "bg-gradient-to-br from-gray-100 to-gray-300",
    settings: {
      ...defaultSettings,
      surfaceColors: { preset: "Custom", custom: "#f8fafc" },
      background: { type: "Solid", color1: "#f8fafc", color2: "#f8fafc" },
      grid: { ...defaultSettings.grid, color: "#94a3b8", opacity: 0.5 },
      numericGuides: { ...defaultSettings.numericGuides, fontColor: "#64748b" },
    },
  },
  {
    id: "a4-layout",
    name: "A4 Layout",
    description: "Perfect for A4 paper design.",
    themeColor: "bg-gradient-to-br from-orange-500 to-rose-500",
    settings: {
      ...defaultSettings,
      matSize: { unit: "mm", width: 297, height: 210 },
      surfaceColors: { preset: "Custom", custom: "#27272a" },
      background: { type: "Solid", color1: "#27272a", color2: "#27272a" },
      grid: {
        enabled: true,
        majorSize: 10, // 1 cm
        minorSize: 1, // 1 mm
        opacity: 0.7,
        color: "#fb923c",
        majorThickness: 1.5,
        minorThickness: 0.5,
      },
      numericGuides: { ...defaultSettings.numericGuides, fontColor: "#fb923c" },
    },
  },
];
