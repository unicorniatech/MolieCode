import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase text-[var(--accent)]">Alpha educativa</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Molie Code Learn</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Aprende a crear apps con IA construyendo proyectos reales paso a paso.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="focus-ring rounded-md bg-[var(--brand)] px-5 py-3 text-center font-semibold text-white" href="/learn">
            Empezar mi primera app
          </Link>
          <Link
            className="focus-ring rounded-md border border-[var(--line)] bg-white px-5 py-3 text-center font-semibold"
            href="/map"
          >
            Ver mapa de aprendizaje
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Alpha",
            text: "Alpha significa una primera versión temprana del producto. No está terminada, pero sirve para probar la idea.",
            example: "Como abrir una cocina de prueba antes del restaurante completo.",
          },
          {
            title: "Local-first",
            text: "Local-first significa que la app funciona primero en tu computadora o navegador, sin depender de servidores externos.",
            example: "Tu progreso se guarda en este navegador con localStorage.",
          },
          {
            title: "Gamificación",
            text: "Gamificación significa usar misiones, puntos, niveles, insignias, rachas y progreso para motivar el aprendizaje.",
            example: "Completar una misión desbloquea la siguiente.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">{item.text}</p>
            <p className="mt-3 rounded-md bg-[#f6f5fb] p-3 text-sm">{item.example}</p>
          </article>
        ))}
      </section>
    </>
  );
}
