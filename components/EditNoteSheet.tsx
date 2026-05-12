"use client";

import { useState, useEffect } from "react";
import type { ThemePalette } from "@/lib/types";
import type { SymptomEntry } from "@/lib/db/types";
import { fontDisplay, fontBody } from "@/lib/theme";
import { SYMPTOM_BY_ID } from "@/lib/symptoms";
import { updateSymptomNote } from "@/lib/db/queries";
import Icon from "./Icon";

interface EditNoteSheetProps {
  entry: SymptomEntry | null;
  dark: boolean;
  p: ThemePalette;
  onClose: () => void;
}

export default function EditNoteSheet({ entry, dark, p, onClose }: EditNoteSheetProps) {
  const [note, setNote] = useState("");
  const [closing, setClosing] = useState(false);
  const open = !!entry;

  useEffect(() => {
    if (open) {
      setNote(entry?.note ?? "");
      setClosing(false);
    }
  }, [open, entry]);

  if (!open && !closing) return null;
  if (!entry) return null;

  const s = SYMPTOM_BY_ID[entry.symptomId];
  const tone = p.tileTones[entry.symptomId] ?? { bg: p.surfaceAlt, ink: p.ink };
  const time = new Date(entry.occurredAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const date = new Date(entry.occurredAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 220);
  };

  const save = async () => {
    await updateSymptomNote(entry.id, note.trim() || undefined);
    close();
  };

  return (
    <>
      <div
        onClick={close}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 50,
          background: dark ? "rgba(0,0,0,0.45)" : "rgba(42,53,40,0.22)",
          opacity: closing ? 0 : 1,
          transition: "opacity 220ms ease",
        }}
      />
      <div
        className={closing ? "" : "sheet-up"}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 60,
          background: p.surface,
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          padding: "14px 24px calc(30px + env(safe-area-inset-bottom))",
          boxShadow: "0 -12px 40px rgba(0,0,0,0.20)",
          transform: closing ? "translateY(100%)" : "translateY(0)",
          transition: closing
            ? "transform 220ms cubic-bezier(0.5, 0, 0.75, 0)"
            : undefined,
        }}
      >
        {/* drag handle */}
        <div
          style={{
            width: 44,
            height: 5,
            borderRadius: 3,
            background: dark ? "rgba(245,228,205,0.18)" : "rgba(42,53,40,0.18)",
            margin: "0 auto 18px",
          }}
        />

        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: tone.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name={entry.symptomId} size={28} stroke={1.8} color={tone.ink} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: fontDisplay,
                fontSize: 28,
                fontWeight: 500,
                color: p.ink,
                letterSpacing: -0.5,
                lineHeight: 1,
              }}
            >
              {s?.label ?? entry.symptomId}
            </div>
            <div
              style={{
                fontSize: 13,
                color: p.inkSoft,
                marginTop: 4,
                fontFamily: fontBody,
              }}
            >
              {date} &middot; {time}
            </div>
          </div>
          <button
            onClick={close}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: p.surfaceAlt,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: p.inkSoft,
            }}
          >
            <Icon name="x" size={18} stroke={2} />
          </button>
        </div>

        <div
          style={{
            fontSize: 11,
            letterSpacing: 1.5,
            color: p.inkSoft,
            margin: "20px 0 10px",
            fontFamily: fontBody,
            fontWeight: 600,
          }}
        >
          EDIT NOTE
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything to remember…"
          rows={3}
          autoFocus
          style={{
            display: "block",
            width: "100%",
            resize: "none",
            background: p.surfaceAlt,
            borderRadius: 16,
            padding: "14px 16px",
            fontSize: 15,
            color: p.ink,
            marginBottom: 22,
            fontFamily: fontDisplay,
            fontStyle: "italic",
            border: `1px solid ${p.border}`,
            outline: "none",
            minHeight: 80,
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={close}
            style={{
              flex: 1,
              height: 60,
              borderRadius: 18,
              background: "transparent",
              border: `1px solid ${p.borderStrong}`,
              fontFamily: fontDisplay,
              fontSize: 19,
              color: p.inkSoft,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={save}
            style={{
              flex: 1.6,
              height: 60,
              borderRadius: 18,
              background: p.accent,
              color: dark ? "#1a1208" : "#fff",
              border: "none",
              fontFamily: fontDisplay,
              fontSize: 19,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
