import type { SymptomDef, Entry } from "./types";

export const SYMPTOMS: SymptomDef[] = [
  { id: "headache", label: "Headache" },
  { id: "nausea",   label: "Nausea" },
  { id: "stomach",  label: "Stomach" },
  { id: "fatigue",  label: "Fatigue" },
  { id: "anxiety",  label: "Anxiety" },
  { id: "pain",     label: "Pain" },
];

export const SYMPTOM_BY_ID: Record<string, SymptomDef> = Object.fromEntries(
  SYMPTOMS.map((s) => [s.id, s])
);

export const SEV_LABELS: Record<string, string> = {
  mild: "Mild",
  bad: "Bad",
  terrible: "Terrible",
};

export const SEED_ENTRIES: Entry[] = [
  { id: 1,  sid: "stomach",  sev: "bad",      time: "1:24 PM",  day: 0,  note: "Started 30 min after lunch." },
  { id: 2,  sid: "headache", sev: "mild",     time: "11:02 AM", day: 0,  note: "" },
  { id: 3,  sid: "fatigue",  sev: "bad",      time: "8:30 AM",  day: 0,  note: "Slept poorly." },
  { id: 4,  sid: "nausea",   sev: "terrible", time: "9:15 PM",  day: 1,  note: "" },
  { id: 5,  sid: "stomach",  sev: "bad",      time: "6:40 PM",  day: 1,  note: "" },
  { id: 6,  sid: "anxiety",  sev: "mild",     time: "3:10 PM",  day: 1,  note: "Before the call." },
  { id: 7,  sid: "fatigue",  sev: "mild",     time: "2:14 PM",  day: 2,  note: "" },
  { id: 8,  sid: "headache", sev: "bad",      time: "4:50 PM",  day: 4,  note: "After the long drive." },
  { id: 9,  sid: "stomach",  sev: "mild",     time: "10:10 AM", day: 4,  note: "" },
  { id: 10, sid: "anxiety",  sev: "bad",      time: "8:20 PM",  day: 6,  note: "" },
  { id: 11, sid: "pain",     sev: "terrible", time: "11:40 PM", day: 7,  note: "Couldn't sleep." },
  { id: 12, sid: "headache", sev: "mild",     time: "7:45 AM",  day: 10, note: "" },
  { id: 13, sid: "nausea",   sev: "bad",      time: "12:30 PM", day: 12, note: "" },
  { id: 14, sid: "fatigue",  sev: "terrible", time: "3:00 PM",  day: 12, note: "Whole afternoon gone." },
  { id: 15, sid: "stomach",  sev: "bad",      time: "9:00 AM",  day: 15, note: "" },
  { id: 16, sid: "anxiety",  sev: "mild",     time: "6:20 PM",  day: 18, note: "" },
  { id: 17, sid: "headache", sev: "bad",      time: "2:00 PM",  day: 22, note: "" },
  { id: 18, sid: "pain",     sev: "bad",      time: "10:00 AM", day: 22, note: "Knee acting up." },
];

export function dayLabel(n: number): string {
  if (n === 0) return "Today";
  if (n === 1) return "Yesterday";
  return `${n} days ago`;
}

export function dayDate(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
