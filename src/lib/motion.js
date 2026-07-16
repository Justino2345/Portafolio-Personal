// Presets de movimiento compartidos por toda la app.

export const ease = {
  out: [0.16, 1, 0.3, 1], // editorial easeOut
  wipe: [0.76, 0, 0.24, 1], // exit / paneles
  std: [0.22, 1, 0.36, 1], // estándar
}

export const spring = {
  reveal: { type: 'spring', stiffness: 200, damping: 30 },
  letter: { type: 'spring', stiffness: 220, damping: 26 },
  magnetic: { type: 'spring', stiffness: 150, damping: 15 },
  cursor: { type: 'spring', stiffness: 300, damping: 30 },
  sticker: { type: 'spring', stiffness: 400, damping: 12 },
}

// Aparición simple hacia arriba.
export const revealUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.std, delay: i * 0.08 },
  }),
}

// Reveal pronunciado de abajo hacia arriba (opacity + y).
// Evitamos animar clip-path con framer: no lo interpola de forma fiable y al
// fallar aborta toda la animación. El efecto "wipe" real se logra con
// overflow-hidden + translateY donde hace falta (ver HeroName).
export const clipRevealUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out, delay: i * 0.09 },
  }),
}

// Ensamble de letras (loader / hero).
export const letterContainer = {
  hidden: {},
  show: (delay = 0) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
}

// Las letras arrancan debajo de su línea (overflow-hidden) y suben: máscara real.
export const letterChild = {
  hidden: { y: '115%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { ...spring.letter },
  },
}
