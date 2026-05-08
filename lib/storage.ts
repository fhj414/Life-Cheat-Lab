"use client";

import type { Answer, LifeReport, StoredReport } from "@/types/report";

const ANSWERS_KEY = "life-cheat-lab:answers";
const CURRENT_REPORT_KEY = "life-cheat-lab:current-report";
const HISTORY_KEY = "life-cheat-lab:history";

const isBrowser = () => typeof window !== "undefined";

export function saveAnswers(answers: Answer[]) {
  if (!isBrowser()) return;
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function getAnswers(): Answer[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(ANSWERS_KEY) ?? "[]") as Answer[];
  } catch {
    return [];
  }
}

export function saveCurrentReport(report: LifeReport, answers: Answer[]) {
  if (!isBrowser()) return;
  const stored: StoredReport = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    answers,
    report
  };
  localStorage.setItem(CURRENT_REPORT_KEY, JSON.stringify(stored));
  const history = getHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify([stored, ...history].slice(0, 30)));
}

export function getCurrentReport(): StoredReport | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(CURRENT_REPORT_KEY);
    return raw ? (JSON.parse(raw) as StoredReport) : null;
  } catch {
    return null;
  }
}

export function setCurrentReport(stored: StoredReport) {
  if (!isBrowser()) return;
  localStorage.setItem(CURRENT_REPORT_KEY, JSON.stringify(stored));
}

export function getHistory(): StoredReport[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as StoredReport[];
  } catch {
    return [];
  }
}

export function deleteHistoryReport(id: string) {
  if (!isBrowser()) return;
  const next = getHistory().filter((item) => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (!isBrowser()) return;
  localStorage.removeItem(HISTORY_KEY);
}
