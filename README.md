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
  first-local-app/page.tsx
  builder/page.tsx
  mvp/page.tsx
  progress/page.tsx
  journal/page.tsx
components/
  app-shell.tsx
  badge-card.tsx
  concept-card.tsx
  first-local-app-guide.tsx
  form-builder.tsx
  learn-context.tsx
  local-records-preview.tsx
  mission-card.tsx
  mvp-designer.tsx
  progress-card.tsx
  prompt-improver.tsx
  screen-preview.tsx
  template-picker.tsx
lib/
  gamification.ts
  exporters.ts
  first-local-app.ts
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

## Exportación de bitácora

La bitácora se puede exportar desde `/journal` para usar el aprendizaje fuera de la app. Exportar significa guardar o descargar información en un archivo local.

Formatos disponibles:

- JSON: formato simple para guardar datos estructurados. Incluye progreso, puntos, misiones, prompts, MVP, conceptos aprendidos, eventos, `productName`, `exportVersion` y `exportedAt`.
- Markdown: formato de texto fácil de leer con títulos, listas y secciones. Resume nivel, puntos, insignias, conceptos, prompts, MVP y eventos principales.

Esto prepara el camino para un futuro dataset de entrenamiento. Dataset significa conjunto de datos que puede usarse después para análisis o entrenamiento. En esta Alpha todo se mantiene local-first: no se suben archivos, no hay backend y no se conectan APIs externas.

## Mi Primera App Local

Mi Primera App Local es el primer proyecto guiado educativo de la Alpha. Proyecto guiado significa una experiencia paso a paso donde el usuario aprende creando una app concreta.

Enseña:

- Cómo elegir una idea simple.
- Qué son pantalla, componente, estado, formulario, campo, registro, guardado local y vista previa.
- Cómo diseñar una pantalla inicial.
- Cómo definir un formulario con tres campos.
- Cómo simular el guardado de datos en `localStorage`.

Simula una experiencia de construcción dentro de Molie Code Learn. No exporta un proyecto real, no genera archivos de código para la app del usuario, no usa IA real, no conecta GitHub y no usa backend.

Esta práctica prepara el camino para un futuro constructor real de apps porque captura decisiones educativas: idea elegida, pantalla diseñada, campos definidos, registros de prueba, conceptos aprendidos y misiones completadas.

## Próximos pasos

- Agregar evaluación guiada de prompts con más reglas locales.
- Refinar las exportaciones con filtros por fecha o tipo de evento.
- Agregar más proyectos guiados por categoría.
- Diseñar una ruta futura para IA real, auth y base de datos cuando la Alpha valide el flujo educativo.
