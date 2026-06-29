"use client";

import { useEffect, useMemo, useState } from "react";
import { firstLocalAppLearnedConceptIds } from "./first-local-app";
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
      updateFirstLocalApp: (patch: Partial<LearnState["firstLocalAppProgress"]>) => {
        setState((current) => ({
          ...current,
          firstLocalAppProgress: {
            ...current.firstLocalAppProgress,
            ...patch,
          },
        }));
      },
      completeFirstLocalAppStep: (stepId: string, learnedConcepts: string[] = []) => {
        setState((current) => {
          const nextCompletedSteps = addUnique(current.firstLocalAppProgress.completedSteps, stepId);
          const newConcepts = Array.from(new Set([...learnedConcepts]));

          return {
            ...current,
            firstLocalAppProgress: {
              ...current.firstLocalAppProgress,
              completedSteps: nextCompletedSteps,
            },
            learnedConcepts: Array.from(new Set([...current.learnedConcepts, ...newConcepts])),
            journalEvents: current.firstLocalAppProgress.completedSteps.includes(stepId)
              ? current.journalEvents
              : [
                  createEvent("proyecto", "Paso completado en Mi Primera App Local", `Completaste el paso ${stepId}.`, {
                    learnedConcepts: newConcepts,
                    metadata: { stepId },
                  }),
                  ...current.journalEvents,
                ],
          };
        });
      },
      saveFirstLocalAppRecord: (values: Record<string, string>) => {
        setState((current) => {
          const record = {
            id: crypto.randomUUID(),
            values,
            createdAt: new Date().toISOString(),
          };
          const stepAlreadyDone = current.firstLocalAppProgress.completedSteps.includes("paso-5");

          return {
            ...current,
            firstLocalAppProgress: {
              ...current.firstLocalAppProgress,
              sampleRecords: [record, ...current.firstLocalAppProgress.sampleRecords].slice(0, 8),
              completedSteps: addUnique(current.firstLocalAppProgress.completedSteps, "paso-5"),
            },
            learnedConcepts: Array.from(new Set([...current.learnedConcepts, ...firstLocalAppLearnedConceptIds])),
            journalEvents: [
              createEvent("proyecto", "Dato de prueba guardado", "Guardaste un registro local dentro de Mi Primera App Local.", {
                learnedConcepts: ["registro", "guardado-local", "estado"],
                metadata: {
                  recordId: record.id,
                  recordCount: current.firstLocalAppProgress.sampleRecords.length + 1,
                },
              }),
              ...(stepAlreadyDone
                ? []
                : [
                    createEvent("proyecto", "Paso completado en Mi Primera App Local", "Completaste el paso paso-5.", {
                      learnedConcepts: ["registro", "guardado-local"],
                      metadata: { stepId: "paso-5" },
                    }),
                  ]),
              ...current.journalEvents,
            ],
          };
        });
      },
      resetProgress: () => setState(initialState),
    }),
    [],
  );

  const learnedConceptDetails = appConcepts.filter((concept) => state.learnedConcepts.includes(concept.id));

  return { state, actions, hydrated, learnedConceptDetails };
};
