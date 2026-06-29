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
  detail: string,
): JournalEvent => ({
  id: crypto.randomUUID(),
  type,
  title,
  detail,
  createdAt: new Date().toISOString(),
});

export const loadState = (): LearnState => {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState;
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
  resetProgress: () => void;
};
