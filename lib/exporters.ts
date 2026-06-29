import { appConcepts } from "./learning-content";
import { firstLocalAppLearnedConceptIds, getTemplateLabel } from "./first-local-app";
import { missions } from "./missions";
import type { LearnState } from "./types";

export type JournalJsonExport = LearnState & {
  exportedAt: string;
  productName: "Molie Code Learn";
  exportVersion: "alpha-001";
};

export type FirstLocalAppJsonPackage = {
  productName: "Molie Code Learn";
  packageType: "first-local-app-learning-package";
  exportVersion: "alpha-001";
  exportedAt: string;
  selectedTemplate: LearnState["firstLocalAppProgress"]["selectedTemplate"];
  screenTitle: string;
  screenDescription: string;
  primaryButtonText: string;
  fields: LearnState["firstLocalAppProgress"]["fields"];
  sampleRecords: LearnState["firstLocalAppProgress"]["sampleRecords"];
  completedSteps: string[];
  learnedConcepts: Array<{ id: string; name: string }>;
  recommendedNextSteps: string[];
  userLevel: LearnState["selectedLevel"];
  points: number;
  badges: string[];
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const conceptLabel = (conceptId: string) => appConcepts.find((concept) => concept.id === conceptId)?.name ?? conceptId;

const missionLabel = (missionId: string) => missions.find((mission) => mission.id === missionId)?.title ?? missionId;

const listOrPending = (items: string[]) => (items.length ? items.map((item) => `- ${item}`).join("\n") : "- Pendiente");

const recommendedFirstLocalAppNextSteps = [
  "Exporta tu bitácora completa para comparar tu avance con este paquete.",
  "Revisa si tus campos realmente capturan la información mínima de tu idea.",
  "Diseña un segundo formulario antes de pensar en generar código real.",
  "Cuando la Alpha lo permita, usa este paquete como contexto para Molie Code.",
];

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
  const firstLocalApp = state.firstLocalAppProgress;
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

## Mi Primera App Local

- Idea elegida: ${getTemplateLabel(firstLocalApp.selectedTemplate)}
- Pantalla diseñada: ${firstLocalApp.screenTitle || "Pendiente"}
- Descripción de pantalla: ${firstLocalApp.screenDescription || "Pendiente"}
- Botón principal: ${firstLocalApp.primaryButtonText || "Pendiente"}
- Campos: ${firstLocalApp.fields.map((field) => field.label).join(", ") || "Pendiente"}
- Registros de prueba guardados: ${firstLocalApp.sampleRecords.length}
- Pasos completados: ${firstLocalApp.completedSteps.length}

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

export const buildFirstLocalAppJsonPackage = (state: LearnState): FirstLocalAppJsonPackage => {
  const progress = state.firstLocalAppProgress;

  return {
    productName: "Molie Code Learn",
    packageType: "first-local-app-learning-package",
    exportVersion: "alpha-001",
    exportedAt: new Date().toISOString(),
    selectedTemplate: progress.selectedTemplate,
    screenTitle: progress.screenTitle,
    screenDescription: progress.screenDescription,
    primaryButtonText: progress.primaryButtonText,
    fields: progress.fields,
    sampleRecords: progress.sampleRecords,
    completedSteps: progress.completedSteps,
    learnedConcepts: firstLocalAppLearnedConceptIds.map((id) => ({ id, name: conceptLabel(id) })),
    recommendedNextSteps: recommendedFirstLocalAppNextSteps,
    userLevel: state.selectedLevel,
    points: state.points,
    badges: state.badges,
  };
};

export const buildFirstLocalAppMarkdownPackage = (state: LearnState): string => {
  const exportedAt = new Date().toISOString();
  const progress = state.firstLocalAppProgress;
  const learnedConceptNames = firstLocalAppLearnedConceptIds.map(conceptLabel);

  return `# Paquete de aprendizaje — Mi Primera App Local

Fecha de descarga: ${formatDate(exportedAt)}

## Qué construiste

Un proyecto guiado local dentro de Molie Code Learn. Paquete de aprendizaje significa un archivo descargable que resume lo que construiste, aprendiste y decidiste durante un proyecto guiado.

## Idea elegida

- ${getTemplateLabel(progress.selectedTemplate)}

## Pantalla diseñada

- Título: ${progress.screenTitle || "Pendiente"}
- Descripción: ${progress.screenDescription || "Pendiente"}
- Botón principal: ${progress.primaryButtonText || "Pendiente"}

## Formulario creado

${listOrPending(progress.fields.map((field) => field.label))}

## Datos de prueba guardados

- Registros guardados: ${progress.sampleRecords.length}

## Conceptos aprendidos

${listOrPending(learnedConceptNames)}

## Progreso

- Nivel elegido: ${state.selectedLevel ?? "Pendiente"}
- Puntos actuales: ${state.points}
- Insignias: ${state.badges.length ? state.badges.join(", ") : "Pendiente"}
- Pasos completados: ${progress.completedSteps.length}

## Recomendaciones siguientes

${listOrPending(recommendedFirstLocalAppNextSteps)}

## Nota sobre local-first

Local-first significa que el aprendizaje y los datos se guardan primero en tu navegador o computadora, sin depender de servidores externos. Sirve para probar y aprender sin cuentas ni infraestructura. Ejemplo: tus registros de prueba viven en localStorage mientras usas esta Alpha.
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
