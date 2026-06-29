import { getCurrentLevel, getNextLevel, getProgressPercent } from "@/lib/gamification";
import type { LearnState } from "@/lib/types";

export function ProgressCard({ state, hydrated }: { state: LearnState; hydrated: boolean }) {
  const currentLevel = getCurrentLevel(state.points);
  const nextLevel = getNextLevel(state.points);
  const progress = getProgressPercent(state.points);

  return (
    <section className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">Tu avance</p>
          <h2 className="mt-1 text-xl font-bold">{currentLevel.name}</h2>
        </div>
        <div className="rounded-md bg-[#eaf7f3] px-3 py-2 text-right">
          <p className="text-lg font-bold text-[#0b6d5a]">{hydrated ? state.points : 0}</p>
          <p className="text-xs text-[#0b6d5a]">puntos</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-3 overflow-hidden rounded-full bg-[#e9e7f0]">
          <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {nextLevel ? `${progress}% hacia ${nextLevel.name}` : "Llegaste al nivel más alto de la Alpha."}
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md bg-[#f6f5fb] p-3">
          <dt className="text-xs text-[var(--muted)]">Misiones</dt>
          <dd className="font-bold">{state.completedMissions.length}</dd>
        </div>
        <div className="rounded-md bg-[#f6f5fb] p-3">
          <dt className="text-xs text-[var(--muted)]">Insignias</dt>
          <dd className="font-bold">{state.badges.length}</dd>
        </div>
        <div className="rounded-md bg-[#f6f5fb] p-3">
          <dt className="text-xs text-[var(--muted)]">Racha</dt>
          <dd className="font-bold">{state.streak}</dd>
        </div>
      </dl>
    </section>
  );
}
