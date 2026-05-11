import type { ThemePalette } from "@/lib/types";
import { fontBody } from "@/lib/theme";

const W = 390;
const H = 844;

interface PhoneShellProps {
  children: React.ReactNode;
  dark: boolean;
  p: ThemePalette;
  textScale: number;
}

export default function PhoneShell({ children, dark, p, textScale }: PhoneShellProps) {
  return (
    <div
      style={{
        width: W,
        height: H,
        background: p.bg,
        color: p.ink,
        fontFamily: fontBody,
        position: "relative",
        overflow: "hidden",
        borderRadius: 48,
        fontSize: 16 * textScale,
        boxShadow: dark
          ? "0 40px 80px rgba(0,0,0,0.45), 0 0 0 8px #15100c, 0 0 0 9px rgba(255,255,255,0.06)"
          : "0 40px 80px rgba(42,53,40,0.18), 0 0 0 8px #2a2521, 0 0 0 9px rgba(0,0,0,0.05)",
      }}
    >
      {/* wash gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: p.wash,
        }}
      />
      {/* dynamic island */}
      <div
        style={{
          position: "absolute",
          top: 11,
          left: "50%",
          transform: "translateX(-50%)",
          width: 126,
          height: 37,
          borderRadius: 24,
          background: "#000",
          zIndex: 50,
        }}
      />
      {/* status bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 54,
          padding: "0 30px 0",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          fontFamily: fontBody,
          fontSize: 15,
          fontWeight: 600,
          color: p.ink,
          paddingBottom: 6,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span>9:41</span>
        <span style={{ opacity: 0.6, fontSize: 12, letterSpacing: 1 }}>
          &bull;&bull;&bull;
        </span>
      </div>
      {children}
    </div>
  );
}
