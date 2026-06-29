export type UserLevelId = "principiante" | "constructor" | "arquitecto";

export type MissionStatus = "bloqueada" | "disponible" | "completada";

export type Concept = {
  id: string;
  name: string;
  meaning: string;
  purpose: string;
  example: string;
};

export type UserLevel = {
  id: UserLevelId;
  title: string;
  description: string;
  receives: string;
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  education: string;
  reward: number;
  badge: string;
};

export type PromptResult = {
  id: string;
  original: string;
  improved: string;
  explanation: string;
  concepts: Concept[];
  createdAt: string;
};

export type MvpDraft = {
  appName: string;
  problem: string;
  primaryUser: string;
  features: [string, string, string];
  outOfScope: string;
  updatedAt: string;
};

export type JournalEvent = {
  id: string;
  type: "nivel" | "mision" | "prompt" | "mvp" | "concepto";
  title: string;
  detail: string;
  createdAt: string;
};

export type LearnState = {
  selectedLevel: UserLevelId | null;
  completedMissions: string[];
  points: number;
  badges: string[];
  streak: number;
  promptHistory: PromptResult[];
  mvpDraft: MvpDraft | null;
  learnedConcepts: string[];
  journalEvents: JournalEvent[];
};
