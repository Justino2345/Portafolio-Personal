// =============================================================
//  SERVICIOS / CÓMO TRABAJO — contenido bilingüe, editable.
//  `slug` alimenta la línea de prompt del monitor de proceso.
//  `ui` son los rótulos del marco tipo consola (Services.jsx).
// =============================================================

export const services = {
  es: {
    title: 'Cómo trabajo',
    intro: 'Un método claro, sin vueltas. Charlamos, lo pensamos y lo construimos juntos.',
    steps: [
      { slug: 'charla', title: 'Charla inicial', desc: 'Nos juntamos a hablar. Entiendo qué necesitás, para quién es y qué querés lograr.' },
      { slug: 'propuesta', title: 'Propuesta y presupuesto', desc: 'Te paso alcance, tiempos y precio claros. Sin letra chica ni sorpresas.' },
      { slug: 'diseno', title: 'Diseño', desc: 'Bocetos la estructura y la estética. Definimos el look antes de escribir una línea.' },
      { slug: 'desarrollo', title: 'Desarrollo', desc: 'Lo codeo con React, prolijo y a medida. Te muestro avances para que no haya dudas.' },
      { slug: 'revision', title: 'Revisión', desc: 'Ajustamos juntos hasta que quede fino. Tus comentarios entran al toque.' },
      { slug: 'entrega', title: 'Entrega y soporte', desc: 'Publico el sitio y te acompaño después. Cualquier cosa, estoy.' },
    ],
    ui: {
      system: 'proc/06',
      mode: 'modo',
      auto: 'auto',
      manual: 'manual',
      stage: 'etapa',
      path: 'proceso',
      done: 'listo',
      run: 'activo',
      queue: 'en cola',
      hintAuto: 'auto-avanza · tocá y controlás',
      hintManual: 'modo manual · ↑ ↓ para navegar',
      hintManualTouch: 'modo manual · tocá otra etapa',
      meta: '06 etapas · utc-3',
      cta: 'proceso completo — hablemos',
    },
  },
  en: {
    title: 'How I work',
    intro: 'A clear method, no runaround. We talk it through, plan it, and build it together.',
    steps: [
      { slug: 'call', title: 'first call', desc: "We sit down to talk. I get what you need, who it's for, and what you want to achieve." },
      { slug: 'proposal', title: 'proposal and quote', desc: 'You get clear scope, timeline, and price. No fine print, no surprises.' },
      { slug: 'design', title: 'design', desc: 'I sketch the structure and the look. We lock the aesthetic before writing a line.' },
      { slug: 'development', title: 'development', desc: "I build it in React, clean and custom. I share progress so nothing's left to guess." },
      { slug: 'review', title: 'review', desc: "We polish it together until it's sharp. Your feedback goes in right away." },
      { slug: 'launch', title: 'launch and support', desc: "I ship the site and stick around after. Anything comes up, I'm here." },
    ],
    ui: {
      system: 'proc/06',
      mode: 'mode',
      auto: 'auto',
      manual: 'manual',
      stage: 'stage',
      path: 'process',
      done: 'done',
      run: 'run',
      queue: 'queued',
      hintAuto: 'auto-advances · tap to take over',
      hintManual: 'manual mode · ↑ ↓ to navigate',
      hintManualTouch: 'manual mode · tap another stage',
      meta: '06 stages · utc-3',
      cta: "process complete — let's talk",
    },
  },
}
