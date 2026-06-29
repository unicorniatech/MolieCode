"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ProgressCard } from "./progress-card";
import { useLearnState } from "@/lib/use-learn-state";
import { LearnProvider } from "./learn-context";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/learn", label: "Nivel" },
  { href: "/map", label: "Mapa" },
  { href: "/missions", label: "Misiones" },
  { href: "/builder", label: "Prompt" },
  { href: "/mvp", label: "MVP" },
  { href: "/progress", label: "Progreso" },
  { href: "/journal", label: "Bitácora" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const learn = useLearnState();
  const { state, hydrated } = learn;

  return (
    <LearnProvider value={learn}>
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 -mx-4 border-b border-[var(--line)] bg-white/88 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="focus-ring w-fit rounded-md">
              <span className="block text-lg font-bold text-[var(--brand-strong)]">Molie Code Learn</span>
              <span className="text-xs text-[var(--muted)]">Alpha local-first</span>
            </Link>
            <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Navegación principal">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[var(--brand)] text-white"
                        : "bg-white text-[var(--foreground)] hover:bg-[#eef2ff]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>
        <main className="grid flex-1 gap-6 py-6 lg:grid-cols-[1fr_320px]">
          <section>{children}</section>
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <ProgressCard state={state} hydrated={hydrated} />
          </aside>
        </main>
      </div>
    </LearnProvider>
  );
}
