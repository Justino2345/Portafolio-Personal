import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { site } from '../data/site.js'
import { revealUp } from '../lib/motion.js'
import { useMouseCoords } from '../lib/hooks.js'
import { useI18n } from '../i18n/i18n.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import StickerTag from '../components/StickerTag.jsx'
import { HeroBlock } from '../components/HeroName.jsx'

function Meta({ k, v }) {
  return (
    <div className="flex flex-col items-end">
      <span className="mono-micro text-muted">{k}</span>
      <span className="mono text-[0.8125rem] text-secondary">{v}</span>
    </div>
  )
}

const pad = (n) => String(Math.round(n)).padStart(4, '0')

export default function Intro({ bootDone, nav, reduced }) {
  const ref = useRef(null)
  const { t, L } = useI18n()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.12])
  const coords = useMouseCoords()
  const show = bootDone ? 'show' : 'hidden'

  return (
    <section id="intro" ref={ref} className="relative min-h-screen w-full">
      {/* centro: nombre (posición idéntica a la del loader) */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 grid place-items-center px-6">
        <HeroBlock lead="animate" bootDone={bootDone} />
      </motion.div>

      {/* eyebrow + sticker, arriba a la izquierda */}
      <motion.div
        variants={revealUp}
        initial="hidden"
        animate={show}
        custom={0}
        className="absolute left-5 top-24 flex flex-col items-start gap-3 sm:left-8"
      >
        <Eyebrow>{L(site.eyebrow)}</Eyebrow>
        {site.available && (
          <StickerTag animate={bootDone} delay={0.3}>
            {t('intro.sticker.available')}
          </StickerTag>
        )}
      </motion.div>

      {/* bloque meta, arriba a la derecha */}
      <motion.div
        variants={revealUp}
        initial="hidden"
        animate={show}
        custom={1}
        className="absolute right-5 top-24 hidden flex-col items-end gap-3 sm:flex sm:right-8"
      >
        <Meta k={t('intro.meta.location.label')} v={site.location} />
        <Meta k={t('intro.meta.studies.label')} v={L(site.studies)} />
        <Meta k={t('intro.meta.stack.label')} v={site.stack} />
        <div className="mono-micro mt-1 tnum text-muted">
          x:{pad(coords.x)} y:{pad(coords.y)}
        </div>
      </motion.div>

      {/* CTAs hacia las dos pantallas */}
      <motion.div
        variants={revealUp}
        initial="hidden"
        animate={show}
        custom={2}
        className="absolute inset-x-0 bottom-28 flex flex-wrap justify-center gap-4 px-6"
      >
        <button
          onClick={() => nav('#proyectos')}
          className="mono inline-flex items-center gap-2 rounded-md border border-line-hover px-5 py-3 text-[0.8125rem] uppercase tracking-label text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {t('intro.cta.projects')} <span aria-hidden>↓</span>
        </button>
        <button
          onClick={() => nav('#contacto')}
          className="mono inline-flex items-center gap-2 rounded-md border border-line-hover px-5 py-3 text-[0.8125rem] uppercase tracking-label text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {t('intro.cta.contact')} <span aria-hidden>↓</span>
        </button>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        variants={revealUp}
        initial="hidden"
        animate={show}
        custom={3}
        className="absolute inset-x-0 bottom-12 flex justify-center"
      >
        <div className="mono-micro flex flex-col items-center gap-2">
          <span>{t('intro.scroll')}</span>
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            {!reduced && (
              <motion.span
                className="absolute left-0 top-0 h-3 w-px bg-accent"
                animate={{ y: [-12, 32] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
              />
            )}
          </span>
        </div>
      </motion.div>
    </section>
  )
}
