import { motion } from 'framer-motion'
import { site } from '../data/site.js'
import { ease, letterContainer, letterChild } from '../lib/motion.js'
import { useI18n } from '../i18n/i18n.jsx'

const HERO_STYLE = {
  // El cap por altura (vh) evita que en pantallas anchas pero bajas el nombre
  // crezca tanto que se solape con los CTAs o el cluster superior. Al ser una
  // constante compartida por loader e intro, la continuidad del boot se mantiene.
  fontSize: 'min(clamp(3.5rem, 14vw, 11rem), 16vh)',
  lineHeight: 0.92,
  letterSpacing: '-0.04em',
}

// El nombre. `assemble` activa el ensamble letra por letra (loader).
// La versión estática (intro) usa exactamente los mismos estilos => continuidad.
export function HeroName({ assemble = false }) {
  return (
    <h1
      className="select-none text-center font-display font-bold text-primary"
      style={HERO_STYLE}
      aria-label={site.name}
    >
      {site.nameLines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {assemble ? (
            <motion.span
              className="inline-block"
              variants={letterContainer}
              initial="hidden"
              animate="show"
              custom={0.05 + li * 0.18}
              aria-hidden="true"
            >
              {line.split('').map((ch, ci) => (
                <motion.span key={ci} className="inline-block" variants={letterChild}>
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          ) : (
            <span aria-hidden="true">{line}</span>
          )}
        </span>
      ))}
    </h1>
  )
}

// Bloque hero completo (nombre + subrayado + lead) con layout idéntico en
// loader e intro para que el traspaso no produzca ningún salto.
export function HeroBlock({ assemble = false, underline = false, lead = 'visible', bootDone = false }) {
  const { L } = useI18n()
  const leadAnim =
    lead === 'animate'
      ? { opacity: bootDone ? 1 : 0, y: bootDone ? 0 : 16 }
      : { opacity: lead === 'visible' ? 1 : 0, y: 0 }

  return (
    <div className="flex flex-col items-center">
      <HeroName assemble={assemble} />

      <div className="flex h-8 items-center">
        <motion.div
          className="h-px w-32 bg-accent"
          style={{ originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: underline ? 1 : 0 }}
          transition={{ duration: 0.45, ease: ease.out, delay: underline ? 0.55 : 0 }}
        />
      </div>

      <motion.p
        className="px-6 text-center font-display font-medium text-secondary"
        style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.6rem)', maxWidth: '26ch' }}
        initial={false}
        animate={leadAnim}
        transition={{ duration: 0.7, ease: ease.std, delay: 0.25 }}
        aria-hidden={lead === 'hidden'}
      >
        {L(site.lead)}
      </motion.p>
    </div>
  )
}
