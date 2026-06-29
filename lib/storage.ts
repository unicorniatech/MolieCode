"use client";

import type { JournalEvent, LearnState, MvpDraft, PromptResult, UserLevelId } from "./types";

export const STORAGE_KEY = "molie-code-learn.state";

export const initialState: LearnState = {
  selectedLevel: null,
  completedMissions: [],
  points: 0,
  badges: [],
  streak: 1,
  promptHistory: [],
  mvpDraft: null,
  learnedConcepts: [],
  journalEvents: [],
};

export const createEvent = (
  type: JournalEvent["type"],
  title: string,
  description: string,
  options: Pick<JournalEvent, "pointsDelta" | "relatedMissionId" | "learnedConcepts" | "metadata"> = {},
): JournalEvent => ({
  id: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
  type,
  title,
  description,
  ...options,
});

type StoredJournalEvent = Partial<JournalEvent> & {
  detail?: string;
  createdAt?: string;
};

const normalizeJournalEvent = (event: StoredJournalEvent): JournalEvent => ({
  id: event.id ?? crypto.randomUUID(),
  timestamp: event.timestamp ?? event.createdAt ?? new Date().toISOString(),
  type: event.type ?? "concepto",
  title: event.title ?? "Evento de bitácora",
  description: event.description ?? event.detail ?? "Evento registrado en la Alpha.",
  pointsDelta: event.pointsDelta,
  relatedMissionId: event.relatedMissionId,
  learnedConcepts: event.learnedConcepts,
  metadata: event.metadata,
});

const normalizeState = (value: Partial<LearnState>): LearnState => ({
  ...initialState,
  ...value,
  journalEvents: Array.isArray(value.journalEvents) ? value.journalEvents.map(normalizeJournalEvent) : [],
});

export const loadState = (): LearnState => {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : initialState;
  } catch {
    return initialState;
  }
};

export const saveState = (state: LearnState) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const addUnique = <T,>(items: T[], item: T) => (items.includes(item) ? items : [...items, item]);

export type LearnActions = {
  selectLevel: (level: UserLevelId) => void;
  completeMission: (missionId: string) => void;
  savePrompt: (result: PromptResult) => void;
  saveMvp: (draft: MvpDraft) => void;
  learnConcepts: (conceptIds: string[]) => void;
  recordExport: (format: "JSON" | "Markdown") => void;
  resetProgress: () => void;
};
