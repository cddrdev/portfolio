import portrait from '../assets/carlos-de-diego.png';

const portfolio = {
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
