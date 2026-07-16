// =============================================================
//  PROYECTOS — agregá objetos a este array a medida que tengas más.
//  Campos con { es, en } son bilingües; los planos son iguales en ambos idiomas.
//  motif: 'dots' | 'scan' | 'rings' | 'mesh'  (textura generativa de fondo)
//  status: 'live' | 'wip'
//  previewUrl (opcional): vista previa en vivo del sitio (iframe).
//  repo (opcional): 'usuario/repo' para mostrar datos en vivo de GitHub.
// =============================================================

export const projects = [
  {
    id: 'la-fabrica-de-contenido',
    index: '01',
    title: 'La Fábrica de Contenido', // nombre propio: igual en ambos idiomas
    desc: {
      es: 'Generador de contenido para redes sociales con IA: crea variantes de posts, guiones y prompts de imagen a partir del contexto de tu marca.',
      en: 'AI-powered social media content generator: creates post variants, scripts and image prompts from your brand context.',
    },
    type: { es: 'App / Funcional', en: 'App / Functional' },
    tags: ['React', 'IA', 'Node.js'],
    year: '2026',
    status: 'live',
    motif: 'dots',
    caption: 'la fábrica de contenido',
    previewUrl: 'https://lafabricadecontenido.vercel.app/',
    // repo: 'justinosantosutn/la-fabrica-de-contenido', // ← descomentá con tu repo público para datos en vivo
    repo: '',
    links: { demo: 'https://lafabricadecontenido.vercel.app/', code: 'https://github.com/justinosantosutn/LaFabricaDeContenido.' },
  },
]
