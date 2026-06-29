import type { Mission } from "./types";

export const missions: Mission[] = [
  {
    id: "mision-1",
    title: "Entiende qué es una app",
    description: "Reconoce que una app combina idea, usuario, interfaz y reglas.",
    education: "Una app no empieza con código: empieza con un problema claro y una persona a la que quieres ayudar.",
    reward: 60,
    badge: "Primera Misión",
  },
  {
    id: "mision-2",
    title: "Elige tu nivel",
    description: "Define tu punto de partida para recibir una ruta más adecuada.",
    education: "Elegir nivel no mide tu valor; solo ajusta la profundidad de las explicaciones.",
    reward: 60,
    badge: "Primer Nivel Elegido",
  },
  {
    id: "mision-3",
    title: "Conoce el mapa de una app",
    description: "Explora las piezas principales que forman un producto digital.",
    education: "El mapa evita que todo suene a una masa técnica rara: cada parte tiene una función clara.",
    reward: 90,
    badge: "Primer Mapa Entendido",
  },
  {
    id: "mision-4",
    title: "Mejora tu primer prompt",
    description: "Convierte una idea vaga en una instrucción útil para trabajar con IA.",
    education: "Un buen prompt dice contexto, usuario, funciones y qué respuesta esperas primero.",
    reward: 120,
    badge: "Primer Prompt Mejorado",
  },
  {
    id: "mision-5",
    title: "Diseña tu primer MVP",
    description: "Define qué sí entra y qué no entra en una primera versión.",
    education: "Un MVP te protege de construir de más antes de validar si la idea vale la pena.",
    reward: 140,
    badge: "Primer MVP Diseñado",
  },
  {
    id: "mision-6",
    title: "Revisa tu progreso",
    description: "Consulta tu bitácora para ver lo que ya hiciste y aprendiste.",
    education: "La bitácora convierte acciones sueltas en evidencia de aprendizaje.",
    reward: 100,
    badge: "Builder Local",
  },
];
