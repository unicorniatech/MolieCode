"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLearnState } from "@/lib/use-learn-state";

type LearnContextValue = ReturnType<typeof useLearnState>;

const LearnContext = createContext<LearnContextValue | null>(null);

export function LearnProvider({ value, children }: { value: LearnContextValue; children: ReactNode }) {
  return <LearnContext.Provider value={value}>{children}</LearnContext.Provider>;
}

export function useLearn() {
  const value = useContext(LearnContext);
  if (!value) {
    throw new Error("useLearn debe usarse dentro de LearnProvider.");
  }

  return value;
}
