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
  timestamp: string;
  type: "nivel" | "mision" | "prompt" | "mvp" | "concepto" | "export";
  title: string;
  description: string;
  pointsDelta?: number;
  relatedMissionId?: string;
  learnedConcepts?: string[];
  metadata?: Record<string, string | number | boolean | null>;
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
