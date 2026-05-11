"use client";

import { useState, useEffect, useMemo } from "react";
import type { Entry, Screen, AppSettings, SeverityLevel } from "@/lib/types";
import { getPalette, applyWarmth } from "@/lib/theme";
import {
  loadEntries,
  saveEntries,
  loadSettings,
  saveSettings,
} from "@/lib/storage";
import PhoneShell from "./PhoneShell";
import TabBar from "./TabBar";
import HomeScreen from "./HomeScreen";
import ModalSheet from "./ModalSheet";
import TimelineScreen from "./TimelineScreen";
import SettingsScreen from "./SettingsScreen";

export default function SymptomTracker() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [entries, setEntries] = useState<Entry[]>(() => loadEntries());
  const [screen, setScreen] = useState<Screen>("log");
  const [modalSid, setModalSid] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  // persist settings
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // persist entries
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const updateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  const dark = settings.darkMode;
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

  const saveEntry = ({
    sid,
    sev,
    note,
  }: {
    sid: string;
    sev: SeverityLevel;
    note: string;
  }) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setEntries((prev) => [
      { id: Date.now(), sid, sev, time, day: 0, note },
      ...prev,
    ]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: dark ? "#15100c" : "#efeae0",
      }}
    >
      <PhoneShell dark={dark} p={p} textScale={settings.textScale}>
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
            entries={entries}
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
      </PhoneShell>
    </div>
  );
}
