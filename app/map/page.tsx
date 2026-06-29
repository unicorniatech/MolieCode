"use client";

import { ConceptCard } from "@/components/concept-card";
import { useLearn } from "@/components/learn-context";
import { appConcepts } from "@/lib/learning-content";

export default function MapPage() {
  const { actions } = useLearn();

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--accent)]">Mapa de una app</p>
          <h1 className="mt-2 text-3xl font-bold">Las piezas que forman un producto digital</h1>
          <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
            Cada tarjeta explica qué significa el término, para qué sirve y un ejemplo sencillo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => actions.learnConcepts(appConcepts.map((concept) => concept.id))}
          className="focus-ring rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white"
        >
          Marcar mapa entendido
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {appConcepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </>
  );
}
