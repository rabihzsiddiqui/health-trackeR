export type SeverityLevel = "mild" | "bad" | "terrible";
export type CbMode = "off" | "patterns" | "highcontrast";
export type Screen = "log" | "timeline" | "settings";
export type TimelineView = "day" | "month";

export interface SymptomDef {
  id: string;
  label: string;
}

export interface Entry {
  id: number;
  sid: string;
  sev: SeverityLevel;
  time: string;
  day: number;
  note: string;
}

export interface TileTone {
  bg: string;
  ink: string;
}

export interface SevPalette {
  bg: string;
  ink: string;
  solid: string;
  solidInk: string;
  border?: string;
}

export interface ThemePalette {
  bg: string;
  surface: string;
  surfaceAlt: string;
  surfaceWarm: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  accent: string;
  accentDeep: string;
  butter: string;
  clay: string;
  border: string;
  borderStrong: string;
  wash: string;
  tileTones: Record<string, TileTone>;
  sev: Record<SeverityLevel, SevPalette>;
}

export interface SevStyle {
  bg: string;
  ink: string;
  border: string;
  showDots: boolean;
  dotColor: string;
}

export interface AppSettings {
  darkMode: boolean;
  cbMode: CbMode;
  textScale: number;
  warmth: number;
}
