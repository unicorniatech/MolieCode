"use client";

import { firstLocalAppTemplates } from "@/lib/first-local-app";
import type { FirstLocalAppTemplateId } from "@/lib/types";

export function TemplatePicker({
  selectedTemplate,
  onSelect,
}: {
  selectedTemplate: FirstLocalAppTemplateId | null;
  onSelect: (templateId: FirstLocalAppTemplateId) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {firstLocalAppTemplates.map((template) => {
        const selected = selectedTemplate === template.id;
        return (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={`focus-ring rounded-lg border p-4 text-left shadow-sm transition ${
              selected ? "border-[var(--brand)] bg-[#eef2ff]" : "border-[var(--line)] bg-white hover:bg-[#fbfbff]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold">{template.title}</h3>
              <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold">
                {selected ? "Elegida" : "Elegir"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{template.description}</p>
            <p className="mt-3 rounded-md bg-[#f6f5fb] p-3 text-xs">{template.example}</p>
          </button>
        );
      })}
    </div>
  );
}
