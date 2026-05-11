import type { ThemePalette, SeverityLevel, CbMode, SevStyle } from "./types";

export const fontDisplay = "var(--font-newsreader), 'Iowan Old Style', Georgia, serif";
export const fontBody = "var(--font-dm-sans), system-ui, sans-serif";
export const fontMono = "var(--font-jetbrains-mono), ui-monospace, monospace";

const lightPalette: ThemePalette = {
  bg: "#f3efe4",
  surface: "#ffffff",
  surfaceAlt: "#ebe5d3",
  surfaceWarm: "#f5e7a8",
  ink: "#2a3528",
  inkSoft: "#5e6b5a",
  inkFaint: "#8c9486",
  accent: "#5b7548",
  accentDeep: "#3f5532",
  butter: "#e8c860",
  clay: "#b8775a",
  border: "rgba(42,53,40,0.10)",
  borderStrong: "rgba(42,53,40,0.18)",
  wash: "radial-gradient(ellipse 60% 40% at 80% -10%, rgba(91,117,72,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at -10% 95%, rgba(232,200,96,0.18), transparent 60%)",
  tileTones: {
    headache: { bg: "#f0e7ce", ink: "#7a5a1f" },
    nausea:   { bg: "#dde6cf", ink: "#4f6b3a" },
    stomach:  { bg: "#f0d9c8", ink: "#8a4f30" },
    fatigue:  { bg: "#e0dcc7", ink: "#5a5530" },
    anxiety:  { bg: "#ead8d3", ink: "#7b4438" },
    pain:     { bg: "#dfd6e0", ink: "#5a3f63" },
  },
  sev: {
    mild:     { bg: "#dde6cf", ink: "#4f6b3a", solid: "#5b7548",  solidInk: "#fff" },
    bad:      { bg: "#f0e7ce", ink: "#7a5a1f", solid: "#e8c860",  solidInk: "#3a2e10" },
    terrible: { bg: "#ead8d3", ink: "#7b4438", solid: "#b8775a",  solidInk: "#fff" },
  },
};

const darkPalette: ThemePalette = {
  bg: "#241814",
  surface: "#33231d",
  surfaceAlt: "#3d2a23",
  surfaceWarm: "#4a3327",
  ink: "#f5e4cd",
  inkSoft: "#bfa590",
  inkFaint: "#9a8674",
  accent: "#f08d68",
  accentDeep: "#d96846",
  butter: "#f0a868",
  clay: "#d96846",
  border: "rgba(245,228,205,0.10)",
  borderStrong: "rgba(245,228,205,0.20)",
  wash: "radial-gradient(ellipse 60% 50% at 80% -10%, rgba(240,141,104,0.18), transparent 65%), radial-gradient(ellipse 70% 50% at -10% 95%, rgba(240,168,104,0.12), transparent 60%)",
  tileTones: {
    headache: { bg: "#3a2814", ink: "#f4c89e" },
    nausea:   { bg: "#2c3826", ink: "#cfd8b3" },
    stomach:  { bg: "#3a1d10", ink: "#f0a868" },
    fatigue:  { bg: "#322412", ink: "#e8c860" },
    anxiety:  { bg: "#3a1f17", ink: "#f08d68" },
    pain:     { bg: "#2f2236", ink: "#c4afe0" },
  },
  sev: {
    mild:     { bg: "#2c3826", ink: "#a7c285", solid: "#7c9a5f",  solidInk: "#1a2419" },
    bad:      { bg: "#3a2814", ink: "#f0a868", solid: "#e8c860",  solidInk: "#1a1208" },
    terrible: { bg: "#3a1d10", ink: "#f08d68", solid: "#d96846",  solidInk: "#fff" },
  },
};

const sevPatterns = {
  light: {
    mild:     { bg: "#c5dff8", ink: "#1e4d8c", solid: "#2d72d2", solidInk: "#fff" },
    bad:      { bg: "#f5edcc", ink: "#7a5a1f", solid: "#d4a820", solidInk: "#3a2e10" },
    terrible: { bg: "#e8d4f5", ink: "#6b21a8", solid: "#8b34c9", solidInk: "#fff" },
  } as Record<SeverityLevel, { bg: string; ink: string; solid: string; solidInk: string }>,
  dark: {
    mild:     { bg: "#1a3558", ink: "#82bef7", solid: "#2d72d2", solidInk: "#fff" },
    bad:      { bg: "#3a2a10", ink: "#f0b468", solid: "#c49a18", solidInk: "#0a0800" },
    terrible: { bg: "#2d1a42", ink: "#bf80f0", solid: "#8b34c9", solidInk: "#fff" },
  } as Record<SeverityLevel, { bg: string; ink: string; solid: string; solidInk: string }>,
};

const sevHC = {
  light: {
    mild:     { bg: "#ffffff", ink: "#2a3528", solid: "#2a3528", solidInk: "#fff",     border: "#2a3528" },
    bad:      { bg: "#e8c860", ink: "#2a3528", solid: "#7a5a1f", solidInk: "#fff",     border: "#7a5a1f" },
    terrible: { bg: "#2a3528", ink: "#f3efe4", solid: "#000000", solidInk: "#fff",     border: "#000" },
  } as Record<SeverityLevel, { bg: string; ink: string; solid: string; solidInk: string; border: string }>,
  dark: {
    mild:     { bg: "#241814", ink: "#f5e4cd", solid: "#f5e4cd", solidInk: "#241814", border: "#f5e4cd" },
    bad:      { bg: "#f0a868", ink: "#241814", solid: "#f0a868", solidInk: "#241814", border: "#f0a868" },
    terrible: { bg: "#f5e4cd", ink: "#241814", solid: "#ffffff", solidInk: "#241814", border: "#fff" },
  } as Record<SeverityLevel, { bg: string; ink: string; solid: string; solidInk: string; border: string }>,
};

export function getPalette(dark: boolean): ThemePalette {
  return dark ? darkPalette : lightPalette;
}

export function getSevStyle({
  level,
  dark,
  cbMode,
  variant,
}: {
  level: SeverityLevel;
  dark: boolean;
  cbMode: CbMode;
  variant: "button" | "buttonActive" | "badge";
}): SevStyle {
  const palette =
    cbMode === "highcontrast"
      ? dark ? sevHC.dark : sevHC.light
      : cbMode === "patterns"
        ? dark ? sevPatterns.dark : sevPatterns.light
        : dark ? darkPalette.sev : lightPalette.sev;

  const p = palette[level];
  const showDots = cbMode === "patterns" || cbMode === "highcontrast";

  if (variant === "buttonActive") {
    return {
      bg: p.solid,
      ink: p.solidInk,
      border: (p as { border?: string }).border ?? "transparent",
      showDots,
      dotColor: p.solidInk,
    };
  }

  return {
    bg: p.bg,
    ink: p.ink,
    border: (p as { border?: string }).border ?? "transparent",
    showDots,
    dotColor: p.ink,
  };
}

export function applyWarmth(palette: ThemePalette, warmth: number, dark: boolean): ThemePalette {
  if (warmth === 1) return palette;
  const cooler = warmth < 1;

  const colorShift = dark
    ? cooler
      ? { bg: "#181c24", surface: "#20242e", surfaceAlt: "#282e3a" }
      : { bg: "#2e1510", surface: "#3e2018", surfaceAlt: "#4e2a22" }
    : cooler
      ? { bg: "#e8eef4", surface: "#f4f7fa", surfaceAlt: "#dde5ec" }
      : { bg: "#f8e2cc", surface: "#fff5ec", surfaceAlt: "#f0d8c0" };

  const wash = dark
    ? cooler
      ? "radial-gradient(ellipse 60% 50% at 80% -10%, rgba(140,160,200,0.18), transparent 65%), radial-gradient(ellipse 70% 50% at -10% 95%, rgba(170,190,220,0.12), transparent 60%)"
      : "radial-gradient(ellipse 60% 50% at 80% -10%, rgba(240,141,104,0.30), transparent 65%), radial-gradient(ellipse 70% 50% at -10% 95%, rgba(240,168,104,0.22), transparent 60%)"
    : cooler
      ? "radial-gradient(ellipse 60% 40% at 80% -10%, rgba(91,130,170,0.18), transparent 60%), radial-gradient(ellipse 70% 50% at -10% 95%, rgba(150,190,210,0.22), transparent 60%)"
      : "radial-gradient(ellipse 60% 40% at 80% -10%, rgba(200,110,60,0.18), transparent 60%), radial-gradient(ellipse 70% 50% at -10% 95%, rgba(232,180,80,0.30), transparent 60%)";

  return { ...palette, ...colorShift, wash };
}
