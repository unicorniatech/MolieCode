"use client";

import { useEffect, useMemo, useState } from "react";
import { appConcepts } from "./learning-content";
import { missions } from "./missions";
import type { LearnState, MvpDraft, PromptResult, UserLevelId } from "./types";
import { addUnique, createEvent, initialState, loadState, saveState } from "./storage";

export const useLearnState = () => {
  const [state, setState] = useState<LearnState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setState(loadState());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [hydrated, state]);

  const actions = useMemo(
    () => ({
      selectLevel: (level: UserLevelId) => {
        setState((current) => ({
          ...current,
          selectedLevel: level,
          learnedConcepts: addUnique(current.learnedConcepts, "usuario"),
          journalEvents: [
            createEvent("nivel", "Nivel elegido", `Seleccionaste el nivel ${level}.`, {
              learnedConcepts: ["usuario"],
              metadata: { selectedLevel: level },
            }),
            ...current.journalEvents,
          ],
        }));
      },
      completeMission: (missionId: string) => {
        const mission = missions.find((item) => item.id === missionId);
        if (!mission) {
          return;
        }

        setState((current) => {
          if (current.completedMissions.includes(missionId)) {
            return current;
          }

          return {
            ...current,
            completedMissions: [...current.completedMissions, missionId],
            points: current.points + mission.reward,
            badges: addUnique(current.badges, mission.badge),
            streak: current.streak + 1,
            journalEvents: [
              createEvent("mision", mission.title, `Ganaste ${mission.reward} puntos y la insignia ${mission.badge}.`, {
                pointsDelta: mission.reward,
                relatedMissionId: mission.id,
                metadata: { badge: mission.badge },
              }),
              ...current.journalEvents,
            ],
          };
        });
      },
      savePrompt: (result: PromptResult) => {
        setState((current) => ({
          ...current,
          promptHistory: [result, ...current.promptHistory].slice(0, 12),
          learnedConcepts: Array.from(
            new Set([...current.learnedConcepts, ...result.concepts.map((concept) => concept.id)]),
          ),
          journalEvents: [
            createEvent("prompt", "Prompt mejorado", `Convertiste "${result.original}" en una instrucción más clara.`, {
              learnedConcepts: result.concepts.map((concept) => concept.id),
              metadata: { promptId: result.id },
            }),
            ...result.concepts.map((concept) =>
              createEvent("concepto", concept.name, `${concept.meaning} ${concept.example}`, {
                learnedConcepts: [concept.id],
              }),
            ),
            ...current.journalEvents,
          ],
        }));
      },
      saveMvp: (draft: MvpDraft) => {
        setState((current) => ({
          ...current,
          mvpDraft: draft,
          learnedConcepts: addUnique(current.learnedConcepts, "mvp"),
          journalEvents: [
            createEvent("mvp", "MVP diseñado", `Definiste la primera versión de ${draft.appName || "tu app"}.`, {
              learnedConcepts: ["mvp"],
              metadata: { appName: draft.appName || null },
            }),
            ...current.journalEvents,
          ],
        }));
      },
      learnConcepts: (conceptIds: string[]) => {
        setState((current) => ({
          ...current,
          learnedConcepts: Array.from(new Set([...current.learnedConcepts, ...conceptIds])),
          journalEvents: [
            createEvent("concepto", "Conceptos revisados", `Revisaste ${conceptIds.length} conceptos del mapa de una app.`, {
              learnedConcepts: conceptIds,
              metadata: { conceptCount: conceptIds.length },
            }),
            ...current.journalEvents,
          ],
        }));
      },
      recordExport: (format: "JSON" | "Markdown") => {
        setState((current) => ({
          ...current,
          journalEvents: [
            createEvent("export", "Bitácora exportada", `Exportaste tu bitácora en formato ${format}.`, {
              metadata: { format },
            }),
            ...current.journalEvents,
          ],
        }));
      },
      resetProgress: () => setState(initialState),
    }),
    [],
  );

  const learnedConceptDetails = appConcepts.filter((concept) => state.learnedConcepts.includes(concept.id));

  return { state, actions, hydrated, learnedConceptDetails };
};
