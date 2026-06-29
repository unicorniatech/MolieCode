import { appConcepts } from "./learning-content";
import { missions } from "./missions";
import type { LearnState } from "./types";

export type JournalJsonExport = LearnState & {
  exportedAt: string;
  productName: "Molie Code Learn";
  exportVersion: "alpha-001";
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const conceptLabel = (conceptId: string) => appConcepts.find((concept) => concept.id === conceptId)?.name ?? conceptId;

const missionLabel = (missionId: string) => missions.find((mission) => mission.id === missionId)?.title ?? missionId;

const listOrPending = (items: string[]) => (items.length ? items.map((item) => `- ${item}`).join("\n") : "- Pendiente");

export const buildJournalJsonExport = (state: LearnState): JournalJsonExport => ({
  ...state,
  exportedAt: new Date().toISOString(),
  productName: "Molie Code Learn",
  exportVersion: "alpha-001",
});

export const buildJournalMarkdownExport = (state: LearnState): string => {
  const exportedAt = new Date().toISOString();
  const lastPrompt = state.promptHistory[0];
  const mvp = state.mvpDraft;
  const learnedConceptNames = state.learnedConcepts.map(conceptLabel);
  const completedMissionNames = state.completedMissions.map(missionLabel);

  return `# Molie Code Learn - Resumen de bitácora

Fecha de exportación: ${formatDate(exportedAt)}

## Resumen

- Producto: Molie Code Learn
- Nivel elegido: ${state.selectedLevel ?? "Pendiente"}
- Puntos: ${state.points}
- Racha simulada: ${state.streak}

## Insignias

${listOrPending(state.badges)}

## Misiones completadas

${listOrPending(completedMissionNames)}

## Conceptos aprendidos

${listOrPending(learnedConceptNames)}

## Prompts escritos

${state.promptHistory.length ? state.promptHistory.map((prompt) => `- ${prompt.original}`).join("\n") : "- Pendiente"}

## Prompt mejorado más reciente

${lastPrompt ? lastPrompt.improved : "Pendiente"}

## MVP diseñado

- Nombre: ${mvp?.appName || "Pendiente"}
- Problema: ${mvp?.problem || "Pendiente"}
- Usuario principal: ${mvp?.primaryUser || "Pendiente"}
- Funciones básicas: ${mvp?.features.filter(Boolean).join(", ") || "Pendiente"}
- Fuera de alcance: ${mvp?.outOfScope || "Pendiente"}

## Eventos principales de la bitácora

${
  state.journalEvents.length
    ? state.journalEvents
        .slice(0, 20)
        .map((event) => `- ${formatDate(event.timestamp)} | ${event.title}: ${event.description}`)
        .join("\n")
    : "- Pendiente"
}
`;
};

export const downloadTextFile = (filename: string, content: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
