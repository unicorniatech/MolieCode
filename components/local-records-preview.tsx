"use client";

import type { FirstLocalAppField, FirstLocalAppRecord } from "@/lib/types";

export function LocalRecordsPreview({
  fields,
  values,
  records,
  onValueChange,
  onSave,
}: {
  fields: FirstLocalAppField[];
  values: Record<string, string>;
  records: FirstLocalAppRecord[];
  onValueChange: (fieldId: string, value: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <h3 className="text-xl font-bold">Simula guardar datos</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Registro significa un dato guardado, por ejemplo un cliente, una tarea o un pedido. En esta Alpha se guarda
          localmente en tu navegador.
        </p>
        <div className="mt-4 space-y-3">
          {fields.map((field) => (
            <label key={field.id} className="block">
              <span className="text-sm font-semibold capitalize">{field.label || "campo"}</span>
              <input
                className="focus-ring mt-2 w-full rounded-md border border-[var(--line)] bg-white p-3"
                value={values[field.id] ?? ""}
                onChange={(event) => onValueChange(field.id, event.target.value)}
              />
            </label>
          ))}
        </div>
        <button type="button" onClick={onSave} className="focus-ring mt-4 rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">
          Guardar dato de prueba
        </button>
      </div>

      <div className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Lista local</p>
        <div className="mt-4 space-y-3">
          {records.length ? (
            records.map((record) => (
              <article key={record.id} className="rounded-md bg-[#f6f5fb] p-4">
                {fields.map((field) => (
                  <p key={field.id} className="text-sm">
                    <span className="font-semibold capitalize">{field.label || "campo"}: </span>
                    {record.values[field.id] || "Sin dato"}
                  </p>
                ))}
              </article>
            ))
          ) : (
            <p className="text-[var(--muted)]">Todavía no hay registros de prueba.</p>
          )}
        </div>
      </div>
    </div>
  );
}
