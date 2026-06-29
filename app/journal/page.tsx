"use client";

import { ConceptCard } from "@/components/concept-card";
import { useLearn } from "@/components/learn-context";

export default function JournalPage() {
  const { state, learnedConceptDetails, actions } = useLearn();
  const lastPrompt = state.promptHistory[0];

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
        <button
          type="button"
          onClick={actions.resetProgress}
          className="focus-ring rounded-md border border-[var(--line)] bg-white px-5 py-3 font-semibold"
        >
          Reiniciar progreso
        </button>
      </div>

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
                <p className="text-sm font-semibold uppercase text-[var(--muted)]">{event.type}</p>
                <h3 className="font-bold">{event.title}</h3>
                <p className="mt-1 text-sm">{event.detail}</p>
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
