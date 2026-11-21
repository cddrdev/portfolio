import portrait from '../assets/carlos-de-diego.webp';

const portfolio = {
  metadata: {
    title: 'Carlos de Diego Rodríguez · Desarrollador full stack',
    description:
      'Portfolio de Carlos de Diego Rodríguez, desarrollador full stack junior con experiencia en desarrollo web e integración de IA.',
    socialDescription:
      'Desarrollador full stack junior. Proyectos web con React, Node.js y Python e integración de IA para recomendar productos según las preferencias del cliente.',
    twitterDescription:
      'Proyectos, experiencia y tecnologías de Carlos de Diego Rodríguez, desarrollador full stack junior.',
    locale: 'es_ES',
  },
  ui: {
    skipLink: 'Saltar al contenido',
    analytics: {
      title: 'Estadísticas del portfolio',
      description: '¿Me permites usar Google Analytics para conocer las visitas y los clics en proyectos y contacto? Es opcional y puedes cambiar tu elección en el pie de página.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      close: 'Cerrar',
      details: 'Información de privacidad',
      settings: 'Preferencias de privacidad',
      privacy: 'Carlos de Diego Rodríguez utiliza Google Analytics para medir el uso de este portfolio. Si aceptas, Google recibe datos de navegación, dispositivo y procedencia del tráfico, y guarda cookies de analítica con una duración configurada de hasta 180 días. No se envían nombres ni direcciones de correo y las funciones publicitarias están desactivadas. La elección se recuerda en este navegador durante 180 días. Puedes retirar el permiso aquí en cualquier momento; esto detiene nuevas mediciones y elimina las cookies de analítica accesibles desde esta web, sin borrar los datos ya enviados a Google.',
      googlePrivacy: 'Cómo utiliza Google estos datos',
    },
    header: {
      navigation: 'Navegación principal',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      darkMode: 'Modo oscuro',
      enableDarkMode: 'Activar modo oscuro',
      enableLightMode: 'Activar modo claro',
      switchLanguage: 'Switch to English',
    },
    hero: { projects: 'Ver proyectos', experience: 'Mi experiencia' },
    sections: {
      projects: 'Proyectos',
      experience: 'Experiencia profesional',
      skills: 'Tecnologías',
      education: 'Formación',
      languages: 'Idiomas',
      contact: 'Contacto',
    },
    footer: { profiles: 'Perfiles profesionales', backToTop: 'Volver arriba' },
  },
  profile: {
    name: {
      firstLine: 'Carlos de Diego',
      secondLine: 'Rodríguez',
    },
    initials: 'CD',
    role: 'Desarrollador full stack junior',
    summary:
      'Desarrollo aplicaciones web e integro funcionalidades de inteligencia artificial. Soy técnico superior en DAW y estudio Ingeniería Informática en la Universidad de Burgos.',
    portrait,
  },
  navigation: [
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Experiencia', href: '#experiencia' },
    { label: 'Tecnologías', href: '#tecnologias' },
    { label: 'Formación', href: '#formacion' },
    { label: 'Contacto', href: '#contacto' },
  ],
  projects: [
    {
      id: 'eurozona',
      title: 'eurozona.org',
      category: 'Prácticas · 2025',
      description:
        'Participé en el desarrollo de eurozona.org, desde la maquetación de interfaces en React hasta el desarrollo del servidor y la base de datos.',
      technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
      link: { label: 'Visitar eurozona.org', href: 'https://eurozona.org/' },
    },
    {
      id: 'integracion-ia',
      title: 'Recomendador de productos con IA',
      category: 'Proyecto técnico',
      description:
        'Desarrollé un recomendador de productos con IA, integrado en una aplicación web mediante un servidor en Python y Flask. Generaba recomendaciones según las preferencias del cliente utilizando únicamente el campo de palabras clave de cada producto en la base de datos.',
      technologies: ['Python', 'Flask', 'Integración de IA'],
    },
  ],
  experience: [
    {
      id: 'practicas',
      role: 'Desarrollador full stack en prácticas',
      organization: 'Proyecto eurozona.org',
      period: '2025 · 3 meses',
      responsibilities: [
        'Maqueté y desarrollé interfaces con HTML, CSS, JavaScript y React.',
        'Trabajé en el backend con Node.js, Express y PostgreSQL.',
        'Colaboré en el mantenimiento, la mejora de funcionalidades y la resolución de incidencias.',
      ],
    },
    {
      id: 'amazon',
      role: 'Mozo de almacén',
      organization: 'Amazon',
      period: '2024–2025 · 8 meses',
      responsibilities: [
        'Gestioné y preparé pedidos siguiendo los protocolos de seguridad del almacén.',
        'Trabajé en equipo para cumplir los objetivos durante los picos de actividad.',
      ],
    },
  ],
  skills: [
    {
      title: 'Frontend',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Next.js', 'Bootstrap', 'Tailwind CSS'],
    },
    {
      title: 'Backend',
      technologies: ['Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'Flask', 'PHP', 'C#'],
    },
    {
      title: 'Bases de datos',
      technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server'],
    },
    {
      title: 'Herramientas',
      technologies: ['Git', 'GitHub', 'Postman', 'npm', 'Vite', 'Figma'],
    },
    {
      title: 'Cloud y sistemas',
      technologies: ['Docker', 'AWS', 'Microsoft Azure', 'Linux'],
    },
    {
      title: 'Integración',
      technologies: ['APIs', 'JSON', 'IA en aplicaciones web'],
    },
  ],
  education: [
    {
      id: 'ingenieria',
      title: 'Grado en Ingeniería Informática',
      institution: 'Universidad de Burgos',
      period: 'En curso',
    },
    {
      id: 'daw',
      title: 'Técnico Superior en Desarrollo de Aplicaciones Web',
      institution: 'IES Azarquiel',
      period: '2025',
    },
    {
      id: 'bachillerato',
      title: 'Bachillerato Científico',
      institution: 'IES La Cañuela',
      period: '2022',
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'B2' },
  ],
  contact: {
    intro:
      'Si tienes una oferta o quieres comentar un proyecto, escríbeme y te respondo lo antes posible.',
    items: [
      {
        id: 'correo',
        label: 'Correo',
        value: 'cddrdev@outlook.es',
        href: 'mailto:cddrdev@outlook.es',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/carlos-de-diego',
        href: 'https://www.linkedin.com/in/carlos-de-diego-70406527b',
      },
    ],
  },
  links: [{ label: 'GitHub', href: 'https://github.com/cddrdev' }],
};

export default portfolio;
