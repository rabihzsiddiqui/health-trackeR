"use client";

import { useState, useEffect } from "react";
import type { ThemePalette, CbMode } from "@/lib/types";
import type { SymptomEntry } from "@/lib/db/types";
import { fontDisplay, fontMono, getSevStyle } from "@/lib/theme";
import { SYMPTOM_BY_ID, SEV_LABELS } from "@/lib/symptoms";
import { deleteSymptomEntry } from "@/lib/db/queries";
import Icon from "./Icon";
import SevDots from "./SevDots";

interface TimelineRowProps {
  e: SymptomEntry;
  dark: boolean;
  p: ThemePalette;
  cbMode: CbMode;
  onEdit: (entry: SymptomEntry) => void;
}

export default function TimelineRow({ e, dark, p, cbMode, onEdit }: TimelineRowProps) {
  const s = SYMPTOM_BY_ID[e.symptomId];
  const tone = p.tileTones[e.symptomId] ?? { bg: p.surfaceAlt, ink: p.ink };
  const sev = getSevStyle({ level: e.severity, dark, cbMode, variant: "button" });
  const time = new Date(e.occurredAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const t = setTimeout(() => setConfirming(false), 2500);
    return () => clearTimeout(t);
  }, [confirming]);

  const handleDelete = async () => {
    await deleteSymptomEntry(e.id);
    setConfirming(false);
  };

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
        <Icon name={e.symptomId} size={22} color={tone.ink} stroke={1.8} />
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
          {s?.label ?? e.symptomId}
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
          <span>{SEV_LABELS[e.severity]}</span>
          {sev.showDots && (
            <SevDots level={e.severity} color={sev.dotColor} size={5} gap={2} />
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

      {/* right: time + actions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: p.inkFaint,
            fontFamily: fontMono,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time}
        </div>

        {confirming ? (
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setConfirming(false)}
              style={actionBtn(p.surfaceAlt, p.inkSoft)}
              aria-label="cancel delete"
            >
              <Icon name="x" size={13} stroke={2.2} color={p.inkSoft} />
            </button>
            <button
              onClick={handleDelete}
              style={actionBtn("rgba(220,60,50,0.15)", "#e05548")}
              aria-label="confirm delete"
            >
              <Icon name="trash" size={13} stroke={2} color="#e05548" />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => onEdit(e)}
              style={actionBtn(p.surfaceAlt, p.inkFaint)}
              aria-label="edit note"
            >
              <Icon name="pencil" size={13} stroke={2} color={p.inkFaint} />
            </button>
            <button
              onClick={() => setConfirming(true)}
              style={actionBtn(p.surfaceAlt, p.inkFaint)}
              aria-label="delete entry"
            >
              <Icon name="trash" size={13} stroke={2} color={p.inkFaint} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function actionBtn(bg: string, color: string): React.CSSProperties {
  return {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: bg,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color,
    padding: 0,
  };
}
