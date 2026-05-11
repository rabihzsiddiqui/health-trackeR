"use client";

import { useState } from "react";
import type { Entry, ThemePalette, CbMode, TimelineView } from "@/lib/types";
import { fontDisplay, fontMono } from "@/lib/theme";
import { dayLabel, dayDate } from "@/lib/symptoms";
import TimelineRow from "./TimelineRow";
import CalendarView from "./CalendarView";

interface TimelineScreenProps {
  entries: Entry[];
  dark: boolean;
  p: ThemePalette;
  cbMode: CbMode;
}

export default function TimelineScreen({
  entries,
  dark,
  p,
  cbMode,
}: TimelineScreenProps) {
  const [view, setView] = useState<TimelineView>("day");

  // group by day index
  const grouped: Record<number, Entry[]> = {};
  for (const e of entries) {
    grouped[e.day] = grouped[e.day] ?? [];
    grouped[e.day].push(e);
  }
  const dayKeys = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingTop: 60,
        paddingBottom: 110,
        overflow: "auto",
      }}
    >
      <div style={{ padding: "0 24px" }}>
        <div style={{ marginTop: 22, marginBottom: 18 }}>
          <div
            style={{
              fontFamily: fontDisplay,
              fontSize: 38,
              fontWeight: 400,
              color: p.ink,
              letterSpacing: -0.6,
              lineHeight: 1.02,
            }}
          >
            Your{" "}
            <em style={{ color: p.accent }}>timeline</em>
          </div>
          <div
            style={{
              fontSize: 14,
              color: p.inkSoft,
              marginTop: 8,
              marginBottom: 16,
            }}
          >
            {entries.length} entries &middot; take this to your appointment
          </div>

          {/* view toggle */}
          <div
            style={{
              display: "inline-flex",
              background: p.surfaceAlt,
              borderRadius: 14,
              padding: 3,
              gap: 2,
              border: `1px solid ${p.border}`,
            }}
          >
            {([{ v: "day", label: "Day" }, { v: "month", label: "Month" }] as {
              v: TimelineView;
              label: string;
            }[]).map((o) => {
              const on = view === o.v;
              return (
                <button
                  key={o.v}
                  onClick={() => setView(o.v)}
                  style={{
                    minWidth: 76,
                    height: 34,
                    borderRadius: 11,
                    border: "none",
                    background: on ? p.surface : "transparent",
                    color: on ? p.ink : p.inkSoft,
                    fontWeight: on ? 600 : 500,
                    fontFamily: fontDisplay,
                    fontStyle: on ? "italic" : "normal",
                    fontSize: 15,
                    cursor: "pointer",
                    boxShadow: on ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>

        {view === "month" && (
          <CalendarView entries={entries} dark={dark} p={p} cbMode={cbMode} />
        )}

        {view === "day" &&
          dayKeys.map((d) => (
            <div key={d} style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontStyle: "italic",
                    fontSize: 20,
                    color: p.ink,
                    letterSpacing: -0.2,
                  }}
                >
                  {dayLabel(d)}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: p.inkFaint,
                    fontFamily: fontMono,
                    letterSpacing: 0.5,
                  }}
                >
                  {dayDate(d)}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {grouped[d].map((e) => (
                  <TimelineRow
                    key={e.id}
                    e={e}
                    dark={dark}
                    p={p}
                    cbMode={cbMode}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
