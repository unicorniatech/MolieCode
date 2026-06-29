import type { Concept, FirstLocalAppProgress, FirstLocalAppTemplateId } from "./types";

export type FirstLocalAppTemplate = {
  id: FirstLocalAppTemplateId;
  title: string;
  description: string;
  example: string;
};

export const firstLocalAppTemplates: FirstLocalAppTemplate[] = [
  {
    id: "todo-list",
    title: "Lista de pendientes",
    description: "Simula una app para anotar tareas, marcarlas mentalmente y revisar lo que falta.",
    example: "Pendientes de una semana de trabajo.",
  },
  {
    id: "client-directory",
    title: "Directorio de clientes",
    description: "Simula una app para guardar contactos básicos y notas de seguimiento.",
    example: "Nombre, teléfono y nota de un cliente.",
  },
  {
    id: "order-log",
    title: "Registro de pedidos",
    description: "Simula una app para capturar pedidos sencillos y revisarlos en una lista.",
    example: "Pedido, cliente y estado.",
  },
  {
    id: "personal-journal",
    title: "Bitácora personal",
    description: "Simula una app para escribir entradas cortas sobre lo que hiciste o aprendiste.",
    example: "Fecha, tema y reflexión.",
  },
  {
    id: "small-inventory",
    title: "Inventario pequeño",
    description: "Simula una app para registrar productos, cantidades y notas rápidas.",
    example: "Producto, cantidad y ubicación.",
  },
];

export const firstLocalAppConcepts: Concept[] = [
  {
    id: "pantalla",
    name: "Pantalla",
    meaning: "Pantalla significa una vista de la app que la persona puede ver y usar.",
    purpose: "Sirve para organizar una tarea específica dentro de la app.",
    example: "Una pantalla para guardar clientes.",
  },
  {
    id: "componente",
    name: "Componente",
    meaning: "Componente significa una pieza reutilizable de una interfaz, como un botón, tarjeta o formulario.",
    purpose: "Sirve para construir pantallas con partes ordenadas.",
    example: "Una tarjeta de registro que se repite por cada dato guardado.",
  },
  {
    id: "estado",
    name: "Estado",
    meaning: "Estado significa información que cambia mientras usas una app.",
    purpose: "Sirve para recordar lo que escribiste, elegiste o guardaste.",
    example: "Los campos que cambian mientras capturas un formulario.",
  },
  {
    id: "formulario",
    name: "Formulario",
    meaning: "Formulario significa un bloque donde el usuario escribe información.",
    purpose: "Sirve para capturar datos antes de guardarlos.",
    example: "Un formulario con nombre, teléfono y nota.",
  },
  {
    id: "lista",
    name: "Lista",
    meaning: "Lista significa un conjunto de elementos mostrados en orden.",
    purpose: "Sirve para revisar varios registros sin perder contexto.",
    example: "La lista de pedidos guardados.",
  },
  {
    id: "guardado-local",
    name: "Guardado local",
    meaning: "Guardado local significa guardar datos en el navegador o computadora sin usar servidores externos.",
    purpose: "Sirve para conservar datos en una Alpha local-first.",
    example: "Guardar un cliente de prueba en localStorage.",
  },
];

export const firstLocalAppLearnedConceptIds = [
  "pantalla",
  "componente",
  "estado",
  "formulario",
  "campo",
  "registro",
  "guardado-local",
  "vista-previa",
];

export const initialFirstLocalAppProgress: FirstLocalAppProgress = {
  selectedTemplate: null,
  screenTitle: "",
  screenDescription: "",
  primaryButtonText: "",
  fields: [
    { id: "field-1", label: "nombre" },
    { id: "field-2", label: "teléfono" },
    { id: "field-3", label: "nota" },
  ],
  sampleRecords: [],
  completedSteps: [],
};

export const getTemplateLabel = (templateId: FirstLocalAppTemplateId | null) =>
  firstLocalAppTemplates.find((template) => template.id === templateId)?.title ?? "Pendiente";
