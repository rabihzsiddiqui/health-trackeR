"use client";

import { useState, useEffect, useMemo } from "react";
import type { Screen, AppSettings, SeverityLevel } from "@/lib/types";

function computeDark(s: AppSettings, now: Date): boolean {
  if (s.darkModeAuto === "off") return s.darkMode;
  const start = s.darkModeAuto === "custom" ? s.darkModeStart : "20:00";
  const end   = s.darkModeAuto === "custom" ? s.darkModeEnd   : "07:00";
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const sv = sh * 60 + sm;
  const ev = eh * 60 + em;
  return sv > ev ? (cur >= sv || cur < ev) : (cur >= sv && cur < ev);
}
import { getPalette, applyWarmth, fontBody } from "@/lib/theme";
import { loadSettings, saveSettings } from "@/lib/storage";
import { logSymptom } from "@/lib/db/queries";
import TabBar from "./TabBar";
import HomeScreen from "./HomeScreen";
import ModalSheet from "./ModalSheet";
import TimelineScreen from "./TimelineScreen";
import SettingsScreen from "./SettingsScreen";

export default function SymptomTracker() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [screen, setScreen] = useState<Screen>("log");
  const [modalSid, setModalSid] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const updateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  const dark = useMemo(
    () => computeDark(settings, now),
    [settings, now]
  );
  const basePalette = getPalette(dark);
  const p = useMemo(
    () => applyWarmth(basePalette, settings.warmth, dark),
    [basePalette, settings.warmth, dark]
  );

  const openModal = (sid: string) => setModalSid(sid);

  const closeModal = (didSave?: boolean) => {
    setModalSid(null);
    if (didSave) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1600);
    }
  };

  const saveEntry = async ({
    sid,
    sev,
    note,
  }: {
    sid: string;
    sev: SeverityLevel;
    note: string;
  }) => {
    await logSymptom({ symptomId: sid, severity: sev, note: note || undefined });
  };

  const ts = settings.textScale;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: p.bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${100 / ts}%`,
          height: `${100 / ts}%`,
          transform: `scale(${ts})`,
          transformOrigin: "top left",
          background: p.bg,
          color: p.ink,
          fontFamily: fontBody,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: p.wash,
          }}
        />
        {screen === "log" && (
          <HomeScreen
            onOpenModal={openModal}
            dark={dark}
            p={p}
            savedFlash={savedFlash}
          />
        )}
        {screen === "timeline" && (
          <TimelineScreen
            dark={dark}
            p={p}
            cbMode={settings.cbMode}
          />
        )}
        {screen === "settings" && (
          <SettingsScreen
            settings={settings}
            onUpdate={updateSettings}
            dark={dark}
            p={p}
          />
        )}

        <ModalSheet
          open={!!modalSid}
          sid={modalSid}
          dark={dark}
          p={p}
          cbMode={settings.cbMode}
          onClose={closeModal}
          onSave={saveEntry}
        />

        <TabBar
          screen={screen}
          setScreen={setScreen}
          dark={dark}
          p={p}
        />
      </div>
    </div>
  );
}
