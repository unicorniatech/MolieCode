"use client";

import { useState } from "react";
import { improvePrompt } from "@/lib/prompt-improver";
import type { PromptResult } from "@/lib/types";
import { ConceptCard } from "./concept-card";

export function PromptImprover({ onSave }: { onSave: (result: PromptResult) => void }) {
  const [idea, setIdea] = useState("Hazme una app de comida.");
  const [result, setResult] = useState<PromptResult | null>(null);

  const handleImprove = () => {
    const nextResult = improvePrompt(idea);
    setResult(nextResult);
    onSave(nextResult);
  };

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="font-semibold">Idea original de app</span>
        <textarea
          className="focus-ring mt-2 min-h-36 w-full rounded-lg border border-[var(--line)] bg-white p-4 leading-6"
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
          placeholder="Ejemplo: Hazme una app de comida."
        />
      </label>
      <button
        type="button"
        onClick={handleImprove}
        className="focus-ring rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white"
      >
        Mejorar mi prompt
      </button>

      {result ? (
        <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">Resultado local</p>
          <h2 className="mt-2 text-2xl font-bold">Prompt mejorado</h2>
          <div className="mt-4 grid gap-4">
            <div className="rounded-md bg-[#f6f5fb] p-4">
              <p className="text-sm font-bold">Prompt original</p>
              <p className="mt-2">{result.original}</p>
            </div>
            <div className="rounded-md bg-[#eef6ff] p-4">
              <p className="text-sm font-bold">Prompt mejorado</p>
              <p className="mt-2 leading-7">{result.improved}</p>
            </div>
            <p className="leading-7 text-[var(--muted)]">{result.explanation}</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {result.concepts.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
