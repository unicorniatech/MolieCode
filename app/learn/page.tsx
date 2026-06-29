"use client";

import { useLearn } from "@/components/learn-context";
import { userLevels } from "@/lib/learning-content";

export default function LearnPage() {
  const { state, actions } = useLearn();

  return (
    <>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">Selección de nivel</p>
        <h1 className="mt-2 text-3xl font-bold">Elige tu punto de partida</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
          Nivel significa el ritmo y profundidad con que la app te explica. Sirve para adaptar la experiencia.
          Ejemplo: una persona nueva recibe pasos más pequeños.
        </p>
      </div>
      <div className="grid gap-4">
        {userLevels.map((level) => {
          const selected = state.selectedLevel === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => actions.selectLevel(level.id)}
              className={`focus-ring rounded-lg border p-5 text-left shadow-sm transition ${
                selected ? "border-[var(--brand)] bg-[#eef2ff]" : "border-[var(--line)] bg-white hover:bg-[#fbfbff]"
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold">{level.title}</h2>
                <span className="w-fit rounded-md bg-white px-3 py-1 text-sm font-semibold">
                  {selected ? "Seleccionado" : "Elegir"}
                </span>
              </div>
              <p className="mt-3 text-lg">{level.description}</p>
              <p className="mt-3 leading-7 text-[var(--muted)]">{level.receives}</p>
            </button>
          );
        })}
      </div>
    </>
  );
}
