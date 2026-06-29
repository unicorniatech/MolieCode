import { appConcepts } from "./learning-content";
import type { Concept, PromptResult } from "./types";

const selectConcepts = (text: string): Concept[] => {
  const lower = text.toLowerCase();
  const conceptIds = new Set(["mvp", "frontend", "typescript"]);

  if (lower.includes("admin") || lower.includes("panel")) {
    conceptIds.add("roles");
  }

  if (lower.includes("foto") || lower.includes("archivo") || lower.includes("documento")) {
    conceptIds.add("storage");
  }

  if (lower.includes("usuario") || lower.includes("cliente")) {
    conceptIds.add("usuario");
  }

  return appConcepts.filter((concept) => conceptIds.has(concept.id));
};

export const improvePrompt = (original: string): PromptResult => {
  const cleanOriginal = original.trim();
  const idea = cleanOriginal || "Hazme una app de comida.";

  const improved = `Crea una app web sencilla en español de México para esta idea: "${idea}". Define primero el usuario principal, el problema, un MVP con 3 funciones básicas, las pantallas del frontend y qué datos se guardarían localmente. Antes de escribir código, dame un plan paso a paso y explica cada término técnico con un ejemplo simple.`;

  return {
    id: crypto.randomUUID(),
    original: idea,
    improved,
    explanation:
      "Este prompt es mejor porque aclara el contexto, pide usuario, problema, funciones mínimas y solicita un plan antes de crear código. También pide explicar términos técnicos para aprender mientras construyes.",
    concepts: selectConcepts(idea),
    createdAt: new Date().toISOString(),
  };
};
