import type { Concept } from "@/lib/types";

export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <article className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold">{concept.name}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6">
        <p>
          <span className="font-semibold">Qué significa: </span>
          {concept.meaning}
        </p>
        <p>
          <span className="font-semibold">Para qué sirve: </span>
          {concept.purpose}
        </p>
        <p>
          <span className="font-semibold">Ejemplo: </span>
          {concept.example}
        </p>
      </div>
    </article>
  );
}
