import portrait from '../assets/carlos-de-diego.webp';

const portfolio = {
  metadata: {
    title: 'Carlos de Diego Rodríguez · Full stack developer',
    description:
      'Portfolio of Carlos de Diego Rodríguez, a junior full stack developer with experience in web development and AI integration.',
    socialDescription:
      'Junior full stack developer. Web projects with React, Node.js and Python, and AI integration for product recommendations based on customer preferences.',
    twitterDescription:
      'Projects, experience and technologies of Carlos de Diego Rodríguez, junior full stack developer.',
    locale: 'en_GB',
  },
  ui: {
    skipLink: 'Skip to content',
    analytics: {
      title: 'Portfolio analytics',
      description: 'May I use Google Analytics to measure visits and clicks on projects and contact links? This is optional. You can change your choice in the footer.',
      accept: 'Accept',
      reject: 'Reject',
      close: 'Close',
      details: 'Privacy information',
      settings: 'Privacy preferences',
      privacy: 'Carlos de Diego Rodríguez uses Google Analytics to measure how this portfolio is used. If you accept, Google receives browsing, device and traffic source data, and stores analytics cookies configured to last up to 180 days. Names and email addresses are not sent, and advertising features are disabled. Your choice is remembered in this browser for 180 days. You can withdraw permission here at any time; this stops new measurements and removes analytics cookies accessible from this website, without deleting data already sent to Google.',
      googlePrivacy: 'How Google uses this data',
    },
    header: {
      navigation: 'Main navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      darkMode: 'Dark mode',
      enableDarkMode: 'Switch to dark mode',
      enableLightMode: 'Switch to light mode',
      switchLanguage: 'Cambiar a español',
    },
    hero: { projects: 'View projects', experience: 'My experience' },
    sections: {
      projects: 'Projects',
      experience: 'Professional experience',
      skills: 'Technologies',
      education: 'Education',
      languages: 'Languages',
      contact: 'Contact',
    },
    footer: { profiles: 'Professional profiles', backToTop: 'Back to top' },
  },
  profile: {
    name: {
      firstLine: 'Carlos de Diego',
      secondLine: 'Rodríguez',
    },
    initials: 'CD',
    role: 'Junior full stack developer',
    summary:
      'I develop web applications and integrate artificial intelligence features. I hold an Advanced Vocational Diploma in Web Application Development and I am studying Computer Engineering at the University of Burgos.',
    portrait,
  },
  navigation: [
    { label: 'Projects', href: '#proyectos' },
    { label: 'Experience', href: '#experiencia' },
    { label: 'Technologies', href: '#tecnologias' },
    { label: 'Education', href: '#formacion' },
    { label: 'Contact', href: '#contacto' },
  ],
  projects: [
    {
      id: 'eurozona',
      title: 'eurozona.org',
      category: 'Internship · 2025',
      description:
        'I contributed to the development of eurozona.org, from building interfaces in React to developing the server and database.',
      technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
      link: { label: 'Visit eurozona.org', href: 'https://eurozona.org/' },
    },
    {
      id: 'integracion-ia',
      title: 'AI product recommender',
      category: 'Technical project',
      description:
        'I developed an AI product recommender, integrated into a web application through a Python and Flask server. It generated recommendations based on customer preferences, using only each product’s keywords field in the database.',
      technologies: ['Python', 'Flask', 'AI integration'],
    },
  ],
  experience: [
    {
      id: 'practicas',
      role: 'Full stack developer intern',
      organization: 'eurozona.org project',
      period: '2025 · 3 months',
      responsibilities: [
        'Built and styled interfaces with HTML, CSS, JavaScript and React.',
        'Worked on the backend with Node.js, Express and PostgreSQL.',
        'Collaborated on maintenance, feature improvements and troubleshooting.',
      ],
    },
    {
      id: 'amazon',
      role: 'Warehouse associate',
      organization: 'Amazon',
      period: '2024–2025 · 8 months',
      responsibilities: [
        'Processed and prepared orders following warehouse safety protocols.',
        'Worked as part of a team to meet targets during peak periods.',
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
      title: 'Databases',
      technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server'],
    },
    {
      title: 'Tools',
      technologies: ['Git', 'GitHub', 'Postman', 'npm', 'Vite', 'Figma'],
    },
    {
      title: 'Cloud and systems',
      technologies: ['Docker', 'AWS', 'Microsoft Azure', 'Linux'],
    },
    {
      title: 'Integration',
      technologies: ['APIs', 'JSON', 'AI in web applications'],
    },
  ],
  education: [
    {
      id: 'ingenieria',
      title: 'Bachelor’s Degree in Computer Engineering',
      institution: 'University of Burgos',
      period: 'In progress',
    },
    {
      id: 'daw',
      title: 'Advanced Vocational Diploma in Web Application Development',
      institution: 'IES Azarquiel',
      period: '2025',
    },
    {
      id: 'bachillerato',
      title: 'Science Baccalaureate',
      institution: 'IES La Cañuela',
      period: '2022',
    },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'B2' },
  ],
  contact: {
    intro:
      'If you have a job opportunity or would like to discuss a project, get in touch and I’ll reply as soon as possible.',
    items: [
      {
        id: 'correo',
        label: 'Email',
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
