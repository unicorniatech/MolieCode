# Molie Code Learn

Molie Code Learn es una app web educativa, gamificada y local-first para enseñar a personas principiantes cómo se crea una app usando IA. La Alpha ayuda a entender conceptos básicos, completar misiones, mejorar un prompt, diseñar un MVP y consultar una bitácora de avance.

## Qué significa Alpha

Alpha significa una primera versión temprana del producto. No está terminada, pero sirve para probar la idea, aprender del uso real y decidir qué construir después.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Componentes propios simples
- Persistencia local con `localStorage`

No incluye login, base de datos externa, pagos, APIs externas, modelos de IA reales ni edición real de archivos.

## Cómo instalar

```bash
npm install
```

## Cómo correr localmente

```bash
npm run dev
```

La app abre por defecto en `http://localhost:3000`.

## Cómo hacer build

```bash
npm run build
```

## Verificación

```bash
npm run lint
npm run build
```

## Estructura del proyecto

```text
app/
  page.tsx
  layout.tsx
  globals.css
  learn/page.tsx
  map/page.tsx
  missions/page.tsx
  builder/page.tsx
  mvp/page.tsx
  progress/page.tsx
  journal/page.tsx
components/
  app-shell.tsx
  badge-card.tsx
  concept-card.tsx
  learn-context.tsx
  mission-card.tsx
  mvp-designer.tsx
  progress-card.tsx
  prompt-improver.tsx
lib/
  gamification.ts
  learning-content.ts
  missions.ts
  prompt-improver.ts
  storage.ts
  types.ts
  use-learn-state.ts
```

## Decisiones técnicas

- La Alpha es local-first: el progreso se guarda en `localStorage` bajo una estructura tipada.
- El mejorador de prompts no usa IA real; aplica reglas locales para convertir una idea simple en una instrucción más clara.
- El estado global vive en un provider de React para que navegación, páginas y tarjeta de progreso se actualicen al instante.
- Cada concepto técnico se presenta con significado, utilidad y ejemplo sencillo en español de México.

## Próximos pasos

- Agregar evaluación guiada de prompts con más reglas locales.
- Permitir exportar la bitácora como archivo.
- Crear proyectos de práctica por categoría.
- Diseñar una ruta futura para IA real, auth y base de datos cuando la Alpha valide el flujo educativo.
