"use client";

export function ScreenPreview({
  title,
  description,
  primaryButtonText,
}: {
  title: string;
  description: string;
  primaryButtonText: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase text-[var(--muted)]">Vista previa</p>
      <div className="mt-4 rounded-lg border border-[#d9e1f5] bg-[#f8fbff] p-5">
        <h3 className="text-2xl font-bold">{title || "Título de tu app"}</h3>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          {description || "Una descripción corta explica para qué sirve esta pantalla."}
        </p>
        <button type="button" className="mt-5 rounded-md bg-[var(--brand)] px-4 py-2 font-semibold text-white">
          {primaryButtonText || "Botón principal"}
        </button>
      </div>
    </div>
  );
}
