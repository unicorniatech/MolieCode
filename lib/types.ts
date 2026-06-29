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

export type FirstLocalAppTemplateId =
  | "todo-list"
  | "client-directory"
  | "order-log"
  | "personal-journal"
  | "small-inventory";

export type FirstLocalAppField = {
  id: string;
  label: string;
};

export type FirstLocalAppRecord = {
  id: string;
  values: Record<string, string>;
  createdAt: string;
};

export type FirstLocalAppProgress = {
  selectedTemplate: FirstLocalAppTemplateId | null;
  screenTitle: string;
  screenDescription: string;
  primaryButtonText: string;
  fields: FirstLocalAppField[];
  sampleRecords: FirstLocalAppRecord[];
  completedSteps: string[];
};

export type JournalEvent = {
  id: string;
  timestamp: string;
  type: "nivel" | "mision" | "prompt" | "mvp" | "concepto" | "export" | "proyecto";
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
  firstLocalAppProgress: FirstLocalAppProgress;
  learnedConcepts: string[];
  journalEvents: JournalEvent[];
};
