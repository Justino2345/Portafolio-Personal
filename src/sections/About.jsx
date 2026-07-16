import { motion } from 'framer-motion'
import { ease, revealUp } from '../lib/motion.js'
import { site } from '../data/site.js'
import { useI18n } from '../i18n/i18n.jsx'
import Portrait from '../components/Portrait.jsx'

function Detail({ k, v }) {
  return (
    <div className="flex flex-col gap-1 border-t border-line py-3">
      <span className="mono-micro text-muted">{k}</span>
      <span className="mono text-[0.8125rem] text-secondary">{v}</span>
    </div>
  )
}

export default function About() {
  const { t, L } = useI18n()

  return (
    <section id="sobre-mi" className="mx-auto max-w-content px-5 py-28 sm:px-8">
      <div className="flex items-baseline justify-between">
        <h2 className="mono-label">
          <span className="text-accent">01</span> / {t('about.label')}
        </h2>
        <span className="mono-micro">{t('about.tag')}</span>
      </div>

      <motion.div
        className="mt-6 h-px origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ease.out }}
      />

      <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:gap-16">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Portrait />
        </motion.div>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <h3
            className="font-display font-medium text-primary"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            {t('about.heading')}
          </h3>

          <div className="mt-6 max-w-xl space-y-4 text-secondary" style={{ lineHeight: 1.7 }}>
            {L(site.bio).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 grid max-w-md grid-cols-1 gap-x-10 sm:grid-cols-2">
            <Detail k={t('about.detail.location.label')} v={site.location} />
            <Detail k={t('about.detail.studies.label')} v={L(site.studies)} />
            <Detail k={t('about.detail.stack.label')} v={site.stack} />
            <Detail
              k={t('about.detail.availability.label')}
              v={site.available ? t('about.detail.availability.available') : t('about.detail.availability.unavailable')}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
