"use client";

import { ConceptCard } from "@/components/concept-card";
import { useLearn } from "@/components/learn-context";
import { buildJournalJsonExport, buildJournalMarkdownExport, downloadTextFile } from "@/lib/exporters";

const exportDateSlug = () => new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");

export default function JournalPage() {
  const { state, learnedConceptDetails, actions } = useLearn();
  const lastPrompt = state.promptHistory[0];

  const handleJsonExport = () => {
    const content = JSON.stringify(buildJournalJsonExport(state), null, 2);
    downloadTextFile(`molie-code-learn-bitacora-${exportDateSlug()}.json`, content, "application/json;charset=utf-8");
    actions.recordExport("JSON");
  };

  const handleMarkdownExport = () => {
    const content = buildJournalMarkdownExport(state);
    downloadTextFile(`molie-code-learn-resumen-${exportDateSlug()}.md`, content, "text/markdown;charset=utf-8");
    actions.recordExport("Markdown");
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--accent)]">Bitácora</p>
          <h1 className="mt-2 text-3xl font-bold">Registro de lo que hiciste, aprendiste y construiste</h1>
          <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
            Bitácora significa registro de aprendizaje. Sirve para ver tu avance con evidencia concreta.
            Ejemplo: nivel elegido, prompts, MVP, misiones y conceptos aprendidos.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-56">
          <button
            type="button"
            onClick={handleJsonExport}
            className="focus-ring rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white"
          >
            Exportar bitácora JSON
          </button>
          <button
            type="button"
            onClick={handleMarkdownExport}
            className="focus-ring rounded-md bg-[var(--accent)] px-5 py-3 font-semibold text-white"
          >
            Exportar resumen Markdown
          </button>
          <button
            type="button"
            onClick={actions.resetProgress}
            className="focus-ring rounded-md border border-[var(--line)] bg-white px-5 py-3 font-semibold"
          >
            Reiniciar progreso
          </button>
        </div>
      </div>

      <section className="mb-6 rounded-lg border border-[#c7d8f6] bg-[#f3f7ff] p-5 shadow-sm">
        <h2 className="text-xl font-bold">Exportación de aprendizaje</h2>
        <div className="mt-4 grid gap-4 text-sm leading-6 md:grid-cols-2">
          <p>
            <span className="font-semibold">Bitácora</span> significa registro de lo que hiciste, aprendiste y
            construiste. Sirve para revisar tu avance con evidencia.
          </p>
          <p>
            <span className="font-semibold">Exportar</span> significa guardar o descargar información para usarla fuera
            de la app, por ejemplo en tus notas o en otra herramienta.
          </p>
          <p>
            <span className="font-semibold">JSON</span> significa formato simple para guardar datos estructurados. Es
            útil cuando otra app necesita leer tu progreso con orden.
          </p>
          <p>
            <span className="font-semibold">Markdown</span> significa formato de texto fácil de leer que usa símbolos
            simples para títulos, listas y secciones.
          </p>
          <p className="md:col-span-2">
            <span className="font-semibold">Dataset</span> significa conjunto de datos que puede usarse después para
            análisis o entrenamiento. En el futuro, estas exportaciones podrían ayudar a entrenar Molie Code con ejemplos
            reales de cómo aprende una persona, sin necesitar servidor en esta Alpha.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Resumen local</h2>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-sm font-semibold text-[var(--muted)]">Nivel elegido</dt>
              <dd>{state.selectedLevel ?? "Pendiente"}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[var(--muted)]">Misiones completadas</dt>
              <dd>{state.completedMissions.length}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[var(--muted)]">Puntos ganados</dt>
              <dd>{state.points}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[var(--muted)]">Insignias desbloqueadas</dt>
              <dd>{state.badges.length ? state.badges.join(", ") : "Pendiente"}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Último prompt</h2>
          {lastPrompt ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-semibold text-[var(--muted)]">Original</p>
              <p>{lastPrompt.original}</p>
              <p className="text-sm font-semibold text-[var(--muted)]">Mejorado</p>
              <p className="leading-7">{lastPrompt.improved}</p>
            </div>
          ) : (
            <p className="mt-4 text-[var(--muted)]">Todavía no has mejorado un prompt.</p>
          )}
        </article>
      </section>

      <section className="mt-6 rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">MVP diseñado</h2>
        {state.mvpDraft ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <p><span className="font-semibold">App: </span>{state.mvpDraft.appName || "Sin nombre"}</p>
            <p><span className="font-semibold">Usuario: </span>{state.mvpDraft.primaryUser || "Pendiente"}</p>
            <p className="md:col-span-2"><span className="font-semibold">Problema: </span>{state.mvpDraft.problem || "Pendiente"}</p>
            <p className="md:col-span-2">
              <span className="font-semibold">Funciones: </span>
              {state.mvpDraft.features.filter(Boolean).join(", ") || "Pendiente"}
            </p>
            <p className="md:col-span-2">
              <span className="font-semibold">Fuera de alcance: </span>
              {state.mvpDraft.outOfScope || "Pendiente"}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-[var(--muted)]">Todavía no has guardado un MVP.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Conceptos aprendidos</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {learnedConceptDetails.length ? (
            learnedConceptDetails.map((concept) => <ConceptCard key={concept.id} concept={concept} />)
          ) : (
            <p className="rounded-lg border border-[var(--line)] bg-white p-5 text-[var(--muted)]">
              Explora el mapa o mejora un prompt para guardar conceptos.
            </p>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Eventos de bitácora</h2>
        <div className="mt-4 space-y-3">
          {state.journalEvents.length ? (
            state.journalEvents.map((event) => (
              <article key={event.id} className="rounded-md bg-[#f6f5fb] p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold uppercase text-[var(--muted)]">{event.type}</p>
                  <time className="text-xs text-[var(--muted)]" dateTime={event.timestamp}>
                    {new Intl.DateTimeFormat("es-MX", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(event.timestamp))}
                  </time>
                </div>
                <h3 className="font-bold">{event.title}</h3>
                <p className="mt-1 text-sm">{event.description}</p>
                {typeof event.pointsDelta === "number" ? (
                  <p className="mt-2 text-xs font-semibold text-[#0b6d5a]">Puntos: +{event.pointsDelta}</p>
                ) : null}
                {event.learnedConcepts?.length ? (
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    Conceptos: {event.learnedConcepts.join(", ")}
                  </p>
                ) : null}
              </article>
            ))
          ) : (
            <p className="text-[var(--muted)]">Tu bitácora se llenará conforme uses la Alpha.</p>
          )}
        </div>
      </section>
    </>
  );
}
