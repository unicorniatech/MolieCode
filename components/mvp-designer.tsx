"use client";

import { useState } from "react";
import type { MvpDraft } from "@/lib/types";

export function MvpDesigner({
  initialDraft,
  onSave,
}: {
  initialDraft: MvpDraft | null;
  onSave: (draft: MvpDraft) => void;
}) {
  const [draft, setDraft] = useState<MvpDraft>(
    initialDraft ?? {
      appName: "",
      problem: "",
      primaryUser: "",
      features: ["", "", ""],
      outOfScope: "",
      updatedAt: new Date().toISOString(),
    },
  );

  const setField = (field: keyof MvpDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value, updatedAt: new Date().toISOString() }));
  };

  const setFeature = (index: number, value: string) => {
    setDraft((current) => {
      const features = [...current.features] as [string, string, string];
      features[index] = value;
      return { ...current, features, updatedAt: new Date().toISOString() };
    });
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <div className="rounded-lg border border-[#d8c6a9] bg-[#fff8ef] p-5 leading-7">
        <h2 className="text-xl font-bold">MVP</h2>
        <p className="mt-2">
          MVP significa Producto Mínimo Viable: la primera versión simple para probar una idea sin construir todo.
          Sirve para validar rápido. Ejemplo: una tienda que al inicio solo muestra catálogo, carrito y pedidos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="font-semibold">Nombre de tu app</span>
          <input
            className="focus-ring mt-2 w-full rounded-md border border-[var(--line)] bg-white p-3"
            value={draft.appName}
            onChange={(event) => setField("appName", event.target.value)}
          />
        </label>
        <label className="block">
          <span className="font-semibold">Usuario principal</span>
          <input
            className="focus-ring mt-2 w-full rounded-md border border-[var(--line)] bg-white p-3"
            value={draft.primaryUser}
            onChange={(event) => setField("primaryUser", event.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className="font-semibold">Problema que resuelve</span>
        <textarea
          className="focus-ring mt-2 min-h-24 w-full rounded-md border border-[var(--line)] bg-white p-3"
          value={draft.problem}
          onChange={(event) => setField("problem", event.target.value)}
        />
      </label>

      <div>
        <p className="font-semibold">3 funciones básicas</p>
        <div className="mt-2 grid gap-3 md:grid-cols-3">
          {draft.features.map((feature, index) => (
            <input
              key={index}
              className="focus-ring rounded-md border border-[var(--line)] bg-white p-3"
              value={feature}
              onChange={(event) => setFeature(index, event.target.value)}
              placeholder={`Función ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <label className="block">
        <span className="font-semibold">Qué NO se construirá todavía</span>
        <textarea
          className="focus-ring mt-2 min-h-24 w-full rounded-md border border-[var(--line)] bg-white p-3"
          value={draft.outOfScope}
          onChange={(event) => setField("outOfScope", event.target.value)}
        />
      </label>

      <button type="submit" className="focus-ring rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">
        Guardar diseño de MVP
      </button>
    </form>
  );
}
