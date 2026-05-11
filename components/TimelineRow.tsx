import type { Entry, ThemePalette, CbMode } from "@/lib/types";
import { fontDisplay, fontMono, getSevStyle } from "@/lib/theme";
import { SYMPTOM_BY_ID, SEV_LABELS } from "@/lib/symptoms";
import Icon from "./Icon";
import SevDots from "./SevDots";

interface TimelineRowProps {
  e: Entry;
  dark: boolean;
  p: ThemePalette;
  cbMode: CbMode;
}

export default function TimelineRow({ e, dark, p, cbMode }: TimelineRowProps) {
  const s = SYMPTOM_BY_ID[e.sid];
  const tone = p.tileTones[e.sid] ?? { bg: p.surfaceAlt, ink: p.ink };
  const sev = getSevStyle({ level: e.sev, dark, cbMode, variant: "button" });

  return (
    <div
      style={{
        background: p.surface,
        borderRadius: 20,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        border: `1px solid ${p.border}`,
      }}
    >
      {/* icon */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 13,
          background: tone.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={e.sid} size={22} color={tone.ink} stroke={1.8} />
      </div>

      {/* content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: fontDisplay,
            fontSize: 19,
            fontWeight: 500,
            color: p.ink,
            letterSpacing: -0.2,
            lineHeight: 1.1,
          }}
        >
          {s?.label ?? e.sid}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 5,
            fontSize: 11,
            padding: "3px 9px",
            borderRadius: 8,
            background: sev.bg,
            color: sev.ink,
            fontWeight: 600,
            letterSpacing: 0.3,
            border:
              cbMode === "highcontrast"
                ? `1.5px solid ${sev.border}`
                : "none",
          }}
        >
          <span>{SEV_LABELS[e.sev]}</span>
          {sev.showDots && (
            <SevDots level={e.sev} color={sev.dotColor} size={5} gap={2} />
          )}
        </div>
        {e.note && (
          <div
            style={{
              fontSize: 12,
              color: p.inkSoft,
              marginTop: 6,
              fontFamily: fontDisplay,
              fontStyle: "italic",
              lineHeight: 1.3,
            }}
          >
            &ldquo;{e.note}&rdquo;
          </div>
        )}
      </div>

      {/* time */}
      <div
        style={{
          fontSize: 12,
          color: p.inkFaint,
          fontFamily: fontMono,
          fontVariantNumeric: "tabular-nums",
          flexShrink: 0,
        }}
      >
        {e.time}
      </div>
    </div>
  );
}
