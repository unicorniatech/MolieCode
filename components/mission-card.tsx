"use client";

import { getMissionStatus } from "@/lib/gamification";
import type { LearnState, Mission } from "@/lib/types";

export function MissionCard({
  mission,
  state,
  onComplete,
}: {
  mission: Mission;
  state: LearnState;
  onComplete: (missionId: string) => void;
}) {
  const status = getMissionStatus(mission.id, state.completedMissions);
  const disabled = status !== "disponible";

  return (
    <article className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">{status}</p>
          <h3 className="mt-1 text-xl font-bold">{mission.title}</h3>
        </div>
        <span className="w-fit rounded-md bg-[#fff4e7] px-3 py-2 text-sm font-bold text-[#8a4c0b]">
          +{mission.reward} puntos
        </span>
      </div>
      <p className="mt-4 text-[var(--muted)]">{mission.description}</p>
      <p className="mt-3 rounded-md bg-[#f6f5fb] p-3 text-sm leading-6">{mission.education}</p>
      <button
        type="button"
        className="focus-ring mt-5 rounded-md bg-[var(--brand)] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#b9b5c8]"
        disabled={disabled}
        onClick={() => onComplete(mission.id)}
      >
        {status === "completada" ? "Completada" : status === "bloqueada" ? "Bloqueada" : "Completar misión"}
      </button>
    </article>
  );
}
