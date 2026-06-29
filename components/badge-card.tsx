export function BadgeCard({ name, unlocked }: { name: string; unlocked: boolean }) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        unlocked
          ? "border-[#9bd8c9] bg-[#eefaf6] text-[#064f41]"
          : "border-[var(--line)] bg-white text-[var(--muted)]"
      }`}
    >
      <p className="text-sm font-bold">{name}</p>
      <p className="mt-1 text-xs">{unlocked ? "Desbloqueada" : "Pendiente"}</p>
    </div>
  );
}
