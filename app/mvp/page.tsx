"use client";

import { MvpDesigner } from "@/components/mvp-designer";
import { useLearn } from "@/components/learn-context";

export default function MvpPage() {
  const { state, actions } = useLearn();

  return (
    <>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">Diseñador de MVP</p>
        <h1 className="mt-2 text-3xl font-bold">Define la primera versión de tu app</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
          La meta es decidir qué sí construirás ahora y qué dejarás fuera para no convertir una Alpha en una montaña.
        </p>
      </div>
      <MvpDesigner initialDraft={state.mvpDraft} onSave={actions.saveMvp} />
    </>
  );
}
