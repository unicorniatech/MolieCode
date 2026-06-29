import type { Concept, UserLevel } from "./types";

export const userLevels: UserLevel[] = [
  {
    id: "principiante",
    title: "Principiante",
    description: "Estoy empezando desde cero.",
    receives: "Recibirás explicaciones pausadas, ejemplos cotidianos y misiones pequeñas.",
  },
  {
    id: "constructor",
    title: "Constructor",
    description: "Ya he usado herramientas digitales o IA.",
    receives: "Recibirás retos más prácticos para convertir ideas en estructuras claras.",
  },
  {
    id: "arquitecto",
    title: "Arquitecto",
    description: "Ya sé programar o diseño sistemas.",
    receives: "Recibirás contexto técnico y decisiones de producto para pensar como lead builder.",
  },
];

export const appConcepts: Concept[] = [
  {
    id: "idea",
    name: "Idea",
    meaning: "Es la intención inicial de lo que quieres crear.",
    purpose: "Sirve para enfocar el problema antes de pensar en pantallas o código.",
    example: "Una app para organizar pedidos de una fonda.",
  },
  {
    id: "usuario",
    name: "Usuario",
    meaning: "Es la persona que va a usar la app.",
    purpose: "Sirve para decidir qué funciones sí importan y cuáles pueden esperar.",
    example: "La dueña de la fonda que necesita ver pedidos rápido.",
  },
  {
    id: "mvp",
    name: "MVP",
    meaning: "MVP significa Producto Mínimo Viable: una primera versión simple para probar una idea sin construir todo.",
    purpose: "Sirve para aprender rápido si la app tiene valor real.",
    example: "Primero solo catálogo, carrito y registro manual de pedidos.",
  },
  {
    id: "frontend",
    name: "Frontend",
    meaning: "Frontend significa la parte visual de una app: pantallas, botones, textos y formularios.",
    purpose: "Sirve para que el usuario pueda ver, tocar y entender la app.",
    example: "La pantalla donde eliges tacos y agregas al carrito.",
  },
  {
    id: "backend",
    name: "Backend",
    meaning: "Backend significa la parte invisible de una app: reglas, lógica, permisos y procesamiento.",
    purpose: "Sirve para que la app tome decisiones y procese información.",
    example: "Validar que un pedido tenga nombre, dirección y productos.",
  },
  {
    id: "base-datos",
    name: "Base de datos",
    meaning: "Base de datos significa el lugar donde se guarda la información.",
    purpose: "Sirve para recordar usuarios, pedidos, productos o mensajes.",
    example: "Una tabla con todos los pedidos del día.",
  },
  {
    id: "auth",
    name: "Auth",
    meaning: "Auth significa autenticación: el sistema para saber quién entra a la app.",
    purpose: "Sirve para proteger cuentas y mostrar información correcta a cada persona.",
    example: "Entrar con correo para ver solo tus pedidos.",
  },
  {
    id: "api",
    name: "API",
    meaning: "API significa una forma en que dos sistemas se comunican.",
    purpose: "Sirve para pedir o enviar datos entre partes de una app.",
    example: "El frontend pide al backend la lista de productos.",
  },
  {
    id: "storage",
    name: "Storage",
    meaning: "Storage significa almacenamiento de archivos como fotos, documentos o audios.",
    purpose: "Sirve para guardar archivos que no son solo texto.",
    example: "Fotos de los platillos del menú.",
  },
  {
    id: "roles",
    name: "Roles",
    meaning: "Roles significa permisos de cada tipo de usuario.",
    purpose: "Sirve para decidir quién puede ver, crear, editar o borrar algo.",
    example: "Cliente compra; admin cambia precios.",
  },
  {
    id: "deploy",
    name: "Deploy",
    meaning: "Deploy significa publicar la app para que otras personas puedan usarla.",
    purpose: "Sirve para pasar de tu computadora a una dirección web real.",
    example: "Subir la app para compartirla con clientes.",
  },
  {
    id: "logs",
    name: "Logs",
    meaning: "Logs significa registros de lo que pasa dentro de la app.",
    purpose: "Sirve para encontrar errores y entender el comportamiento del sistema.",
    example: "Ver que un pedido falló porque faltó el teléfono.",
  },
  {
    id: "tests",
    name: "Tests",
    meaning: "Tests significa pruebas para verificar que algo funciona.",
    purpose: "Sirve para reducir errores cuando haces cambios.",
    example: "Probar que el carrito suma bien el total.",
  },
  {
    id: "git",
    name: "Git",
    meaning: "Git significa herramienta para guardar el historial de cambios del código.",
    purpose: "Sirve para regresar a versiones anteriores y colaborar con orden.",
    example: "Guardar un cambio con un commit antes de seguir editando.",
  },
  {
    id: "localstorage",
    name: "localStorage",
    meaning: "localStorage es una memoria pequeña del navegador para guardar datos en tu computadora.",
    purpose: "Sirve para conservar progreso local sin usar servidor.",
    example: "Guardar tus puntos aunque cierres la pestaña.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    meaning: "TypeScript es JavaScript con tipos claros para describir mejor los datos.",
    purpose: "Sirve para detectar errores antes de correr la app.",
    example: "Indicar que los puntos siempre deben ser un número.",
  },
];

export const getConcept = (id: string) => appConcepts.find((concept) => concept.id === id);
