"use client";

import type { FirstLocalAppField } from "@/lib/types";

export function FormBuilder({
  fields,
  onFieldChange,
}: {
  fields: FirstLocalAppField[];
  onFieldChange: (index: number, label: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <h3 className="text-xl font-bold">Define 3 campos</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Campo significa un espacio donde el usuario puede escribir un dato. Sirve para separar la información.
          Ejemplo: nombre, teléfono o nota.
        </p>
        <div className="mt-4 space-y-3">
          {fields.map((field, index) => (
            <label key={field.id} className="block">
              <span className="text-sm font-semibold">Campo {index + 1}</span>
              <input
                className="focus-ring mt-2 w-full rounded-md border border-[var(--line)] bg-white p-3"
                value={field.label}
                onChange={(event) => onFieldChange(index, event.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Vista previa del formulario</p>
        <div className="mt-4 space-y-3">
          {fields.map((field) => (
            <label key={field.id} className="block">
              <span className="text-sm font-semibold capitalize">{field.label || "campo"}</span>
              <input
                className="mt-2 w-full rounded-md border border-[var(--line)] bg-[#f8f8fc] p-3"
                placeholder={`Escribe ${field.label || "un dato"}`}
                readOnly
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
