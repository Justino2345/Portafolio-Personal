// =============================================================
//  CONFIG DEL SITIO — única fuente de verdad para tus datos.
//  Campos con { es, en } son bilingües. Los planos son iguales en ambos idiomas.
//  Los textos de la UI (botones, labels) están en src/i18n/strings.js.
// =============================================================

export const site = {
  name: 'Justino Santos',
  // Se parte por espacio para apilar las palabras en el hero.
  nameLines: ['Justino', 'Santos'],

  role: {
    es: 'Estudiante de Ingeniería en Sistemas de Información',
    en: 'Information Systems Engineering student',
  },
  eyebrow: {
    es: 'Estudiante de 3er Año de Ingeniería en Sistemas de Información',
    en: '3rd Year Information Systems Engineering student',
  },

  // Línea principal del hero.
  lead: {
    es: 'Desarrollador en formación con interés en frontend y diseño de interfaces.',
    en: 'Junior web developer with interest in frontend and interface design.',
  },

  // Bloque meta (columna mono del intro).
  location: 'Armstrong, Santa Fe', // igual en ambos idiomas
  studies: {
    es: 'UTN — Ingeniería en Sistemas de Información',
    en: 'UTN — Information Systems Engineering',
  },
  stack: 'React · TypeScript · Node.js · Express · PostgreSQL', // igual en ambos idiomas

  // Foto para la sección "Sobre mí". Dejá el archivo en la carpeta public/ y
  // referenciá la ruta. Ej: public/justino.jpg  ->  photo: '/justino.jpg'
  photo: '/justino.jpg',

  // Bio de la sección "Sobre mí".
  bio: {
    es: [
      'Estudiante de 3er Año de Ingeniería en Sistemas de Información (UTN) y desarrollador web principiante enfocado en frontend.',
      'Me muevo cómodo tanto en proyectos funcionales —con lógica y datos— como en sitios puramente visuales donde la estética manda. Trabajo principalmente con React.',
    ],
    en: [
      '3rd Year Information Systems Engineering student (UTN) and junior web developer focused on frontend.',
      "I'm equally at home in functional projects —logic and data— and purely visual sites where aesthetics lead. I work mainly with React.",
    ],
  },

  // ¿Abierto a propuestas? Muestra el sticker "DISPONIBLE".
  available: true,

  // Contacto. El email ya está cargado; confirmá GitHub y LinkedIn.
  email: 'justinosantos.utn@gmail.com',

  // WhatsApp en formato internacional, SOLO dígitos (sin +, espacios ni guiones).
  whatsapp: '5493471344387',

  social: {
    github: 'https://github.com/justinosantosutn',
    linkedin: 'https://www.linkedin.com/in/justino-santos-a662b9373/',
    instagram: 'https://www.instagram.com/justi.santoss/',
  },

  // Texto del status bar inferior.
  build: 'BUILD 2026.06',

  // Palabras del marquee (ticker inferior).
  marquee: {
    es: [
      'Disponible para proyectos',
      'React',
      'Interfaces',
      'Frontend',
      'Animación',
      'Diseño',
      'UX',
      'Tailwind',
      'Framer',
      'Node.js',
      'JavaScript',
    ],
    en: [
      'Available for projects',
      'React',
      'Interfaces',
      'Frontend',
      'Animation',
      'Design',
      'UX',
      'Tailwind',
      'Framer',
      'Node.js',
      'JavaScript',
    ],
  },
}
