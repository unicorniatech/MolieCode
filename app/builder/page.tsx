"use client";

import { PromptImprover } from "@/components/prompt-improver";
import { useLearn } from "@/components/learn-context";

export default function BuilderPage() {
  const { actions } = useLearn();

  return (
    <>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">Constructor guiado básico</p>
        <h1 className="mt-2 text-3xl font-bold">Mejora una idea antes de pedir código</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
          Prompt significa la instrucción que le das a una IA. Sirve para pedir mejor lo que necesitas.
          Ejemplo: en vez de “hazme una app”, explicas usuario, funciones y formato de respuesta.
        </p>
      </div>
      <PromptImprover onSave={actions.savePrompt} />
    </>
  );
}
