"use client";

import { MissionCard } from "@/components/mission-card";
import { missions } from "@/lib/missions";
import { useLearn } from "@/components/learn-context";

export default function MissionsPage() {
  const { state, actions } = useLearn();

  return (
    <>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">Sistema de misiones</p>
        <h1 className="mt-2 text-3xl font-bold">Completa misiones y desbloquea tu ruta</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
          Misión significa una tarea pequeña con recompensa. Sirve para avanzar sin saturarte. Ejemplo:
          completar el mapa desbloquea el reto de mejorar tu primer prompt.
        </p>
      </div>
      <div className="grid gap-4">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} state={state} onComplete={actions.completeMission} />
        ))}
      </div>
      {state.completedMissions.length ? (
        <p className="mt-5 rounded-lg border border-[#9bd8c9] bg-[#eefaf6] p-4 font-semibold text-[#064f41]">
          Bien: cada misión completada ya guardó puntos, insignia y evento en tu bitácora local.
        </p>
      ) : null}
    </>
  );
}
