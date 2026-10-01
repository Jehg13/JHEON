export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  summary?: string;
  screenshots?: ProjectScreenshot[];
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  apk?: string;
  featured?: boolean;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  label: string;
};

export const projects: Project[] = [
  {
    id: "001",
    title: "Mova",
    category: "FINANZAS PERSONALES",
    description:
      "Una aplicación móvil para tomar el control de tus finanzas del día a día: registra gastos e ingresos y organiza tu ahorro con metas claras, desde una experiencia sencilla e intuitiva.",
    summary:
      "Controla tus gastos, organiza tus ingresos y avanza hacia tus metas de ahorro.",
    technologies: ["Dart", "Flutter", "MySQLite"],
    image: "/images/mova.png",
    featured: true,
  },
  {
    id: "002",
    title: "DevControl",
    category: "GESTIÓN DE PROYECTOS",
    description:
      "Un sistema de gestión y control de proyectos que centraliza su organización y seguimiento, para mantener el trabajo del equipo ordenado y tener una visión clara de cada iniciativa.",
    summary:
      "Organiza proyectos y mantén el avance del equipo visible en un solo lugar.",
    technologies: ["Laravel", "Tailwind CSS", "Python", "JavaScript", "AJAX"],
    image: "",
    featured: true,
  },
  {
    id: "003",
    title: "TicketPro",
    category: "SOPORTE TÉCNICO",
    description:
      "Una plataforma integral para registrar, organizar y dar seguimiento a tickets de soporte e incidencias, ayudando a mantener cada solicitud visible durante su atención.",
    summary:
      "Centraliza solicitudes e incidencias para dar seguimiento a cada caso.",
    technologies: ["Laravel", "Tailwind CSS", "JavaScript", "AJAX"],
    image: "/images/ticketpro.png",
    featured: true,
  },
  {
    id: "004",
    title: "AztecApps",
    category: "DESARROLLO WEB",
    description:
      "Una landing page para un grupo de profesionales independientes dedicado al desarrollo web, con una presencia digital que presenta su trabajo y su enfoque de ingeniería digital.",
    summary:
      "Una landing page moderna para presentar los servicios y el trabajo del equipo.",
    technologies: ["React", "Tailwind CSS"],
    image: "/images/aztecapps.png",
  },
  {
    id: "005",
    title: "SH Fragances",
    category: "COMERCIO ELECTRÓNICO",
    description:
      "Un ecommerce especializado en perfumes por pedido, diseñado para reunir la oferta de productos y facilitar la gestión de sus ventas en un solo lugar.",
    summary:
      "Una tienda en línea para descubrir fragancias y gestionar ventas por pedido.",
    technologies: ["Quasar", "Vue.js", "JavaScript", "MySQL", "Axios", "Tailwind CSS"],
    image: "/images/sh-fragances.png",
  },
  {
    id: "006",
    title: "Ideon",
    category: "IDEACIÓN DE SOFTWARE",
    description:
      "Un espacio ágil para capturar, organizar y desarrollar ideas de software antes de convertirlas en proyectos reales. Ideon ayuda a dar forma a cada idea desde sus primeras notas.",
    summary:
      "Un espacio para capturar y dar estructura a ideas de software antes de desarrollarlas.",
    technologies: ["Dart", "Flutter", "MySQLite"],
    image: "/images/ideon.png",
  },
  {
    id: "007",
    title: "GymOS",
    category: "ENTRENAMIENTO",
    description:
      "Una plataforma para planificar rutinas y registrar el progreso en un solo lugar: ejercicios, fuerza, marcas personales, peso, cardio, recuperación, objetivos y logros.",
    summary:
      "Rutinas, entrenamiento y seguimiento del progreso reunidos en una sola plataforma.",
    technologies: ["Dart", "Flutter", "MySQLite"],
    image: "/images/gymos.png",
  },
  {
    id: "008",
    title: "GameZone",
    category: "VIDEOJUEGOS",
    description:
      "Una landing page dedicada al mundo de los videojuegos, con una experiencia web enfocada en presentar su temática y contenido con una identidad visual propia.",
    summary:
      "Una landing page temática para presentar contenido del mundo de los videojuegos.",
    technologies: ["Astro", "CSS"],
    image: "/images/gamezone.png",
  },
];
