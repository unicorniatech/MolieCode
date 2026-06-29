"use client";

import { useState } from "react";
import { ConceptCard } from "./concept-card";
import { FormBuilder } from "./form-builder";
import { LocalRecordsPreview } from "./local-records-preview";
import { ScreenPreview } from "./screen-preview";
import { TemplatePicker } from "./template-picker";
import { firstLocalAppConcepts, firstLocalAppLearnedConceptIds, getTemplateLabel } from "@/lib/first-local-app";
import { useLearn } from "./learn-context";
import type { FirstLocalAppField, FirstLocalAppTemplateId } from "@/lib/types";

const stepButtonClass = "focus-ring mt-4 rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white";

export function FirstLocalAppGuide() {
  const { state, actions } = useLearn();
  const progress = state.firstLocalAppProgress;
  const [sampleValues, setSampleValues] = useState<Record<string, string>>({});

  const selectTemplate = (templateId: FirstLocalAppTemplateId) => {
    actions.updateFirstLocalApp({ selectedTemplate: templateId });
    actions.completeFirstLocalAppStep("paso-1", ["pantalla"]);
    actions.completeMission("mision-7");
  };

  const updateField = (index: number, label: string) => {
    const nextFields = progress.fields.map((field, fieldIndex) =>
      fieldIndex === index ? { ...field, label } : field,
    ) as FirstLocalAppField[];
    actions.updateFirstLocalApp({ fields: nextFields });
  };

  const saveRecord = () => {
    actions.saveFirstLocalAppRecord(sampleValues);
    actions.completeMission("mision-10");
    setSampleValues({});
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">Proyecto guiado</p>
        <h1 className="mt-2 text-3xl font-bold">Mi Primera App Local</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
          Proyecto guiado significa una experiencia paso a paso donde aprendes creando una app concreta. Esta simulación
          no exporta un proyecto real todavía; te ayuda a entender las primeras piezas de una app.
        </p>
      </section>

      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Paso 1</p>
        <h2 className="mt-1 text-2xl font-bold">Elige una idea simple</h2>
        <p className="mt-2 text-[var(--muted)]">Cada opción simula una app pequeña para practicar sin presión.</p>
        <div className="mt-4">
          <TemplatePicker selectedTemplate={progress.selectedTemplate} onSelect={selectTemplate} />
        </div>
      </section>

      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Paso 2</p>
        <h2 className="mt-1 text-2xl font-bold">Entiende las partes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {firstLocalAppConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
        <button
          type="button"
          className={stepButtonClass}
          onClick={() => actions.completeFirstLocalAppStep("paso-2", firstLocalAppLearnedConceptIds)}
        >
          Marcar conceptos entendidos
        </button>
      </section>

      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Paso 3</p>
        <h2 className="mt-1 text-2xl font-bold">Diseña tu primera pantalla</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <label className="block">
              <span className="font-semibold">Título de la app</span>
              <input
                className="focus-ring mt-2 w-full rounded-md border border-[var(--line)] bg-white p-3"
                value={progress.screenTitle}
                onChange={(event) => actions.updateFirstLocalApp({ screenTitle: event.target.value })}
              />
            </label>
            <label className="block">
              <span className="font-semibold">Descripción corta</span>
              <textarea
                className="focus-ring mt-2 min-h-24 w-full rounded-md border border-[var(--line)] bg-white p-3"
                value={progress.screenDescription}
                onChange={(event) => actions.updateFirstLocalApp({ screenDescription: event.target.value })}
              />
            </label>
            <label className="block">
              <span className="font-semibold">Texto del botón principal</span>
              <input
                className="focus-ring mt-2 w-full rounded-md border border-[var(--line)] bg-white p-3"
                value={progress.primaryButtonText}
                onChange={(event) => actions.updateFirstLocalApp({ primaryButtonText: event.target.value })}
              />
            </label>
            <button
              type="button"
              className={stepButtonClass}
              onClick={() => {
                actions.completeFirstLocalAppStep("paso-3", ["pantalla", "vista-previa", "componente"]);
                actions.completeMission("mision-8");
              }}
            >
              Guardar diseño de pantalla
            </button>
          </div>
          <ScreenPreview
            title={progress.screenTitle}
            description={progress.screenDescription}
            primaryButtonText={progress.primaryButtonText}
          />
        </div>
      </section>

      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Paso 4</p>
        <h2 className="mt-1 text-2xl font-bold">Crea tu primer formulario</h2>
        <div className="mt-4">
          <FormBuilder fields={progress.fields} onFieldChange={updateField} />
        </div>
        <button
          type="button"
          className={stepButtonClass}
          onClick={() => {
            actions.completeFirstLocalAppStep("paso-4", ["formulario", "campo", "estado"]);
            actions.completeMission("mision-9");
          }}
        >
          Guardar formulario
        </button>
      </section>

      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Paso 5</p>
        <h2 className="mt-1 text-2xl font-bold">Simula guardar datos</h2>
        <div className="mt-4">
          <LocalRecordsPreview
            fields={progress.fields}
            values={sampleValues}
            records={progress.sampleRecords}
            onValueChange={(fieldId, value) => setSampleValues((current) => ({ ...current, [fieldId]: value }))}
            onSave={saveRecord}
          />
        </div>
      </section>

      <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Paso 6</p>
        <h2 className="mt-1 text-2xl font-bold">Resumen de aprendizaje</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p><span className="font-semibold">Idea elegida: </span>{getTemplateLabel(progress.selectedTemplate)}</p>
          <p><span className="font-semibold">Pantalla: </span>{progress.screenTitle || "Pendiente"}</p>
          <p><span className="font-semibold">Campos: </span>{progress.fields.map((field) => field.label).join(", ")}</p>
          <p><span className="font-semibold">Datos de prueba: </span>{progress.sampleRecords.length}</p>
          <p><span className="font-semibold">Pasos completados: </span>{progress.completedSteps.length}</p>
          <p><span className="font-semibold">Puntos actuales: </span>{state.points}</p>
        </div>
        <p className="mt-4 rounded-md bg-[#eefaf6] p-4 text-sm leading-6 text-[#064f41]">
          Siguiente recomendación: vuelve a tu bitácora, exporta tu aprendizaje y revisa qué partes ya entiendes antes
          de pasar a un constructor real de apps.
        </p>
        <button
          type="button"
          className={stepButtonClass}
          onClick={() => {
            actions.completeFirstLocalAppStep("paso-6", firstLocalAppLearnedConceptIds);
            actions.completeMission("mision-11");
          }}
        >
          Completar resumen
        </button>
      </section>
    </div>
  );
}
