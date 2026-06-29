"use client";

import { BadgeCard } from "@/components/badge-card";
import { useLearn } from "@/components/learn-context";
import { missions } from "@/lib/missions";

export default function ProgressPage() {
  const { state } = useLearn();
  const badges = missions.map((mission) => mission.badge);

  return (
    <>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">Progreso</p>
        <h1 className="mt-2 text-3xl font-bold">Tus puntos, niveles e insignias</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {badges.map((badge) => (
          <BadgeCard key={badge} name={badge} unlocked={state.badges.includes(badge)} />
        ))}
      </div>
    </>
  );
}
