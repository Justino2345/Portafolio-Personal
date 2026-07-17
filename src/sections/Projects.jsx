import { motion } from 'framer-motion'
import { ease, revealUp } from '../lib/motion.js'
import { projects } from '../data/projects.js'
import { useI18n } from '../i18n/i18n.jsx'
import ProjectRow from '../components/ProjectRow.jsx'

export default function Projects({ reduced }) {
  const { t } = useI18n()

  return (
    <section id="proyectos" className="mx-auto max-w-content px-5 py-28 sm:px-8">
      <div className="flex items-baseline justify-between">
        <h2 className="mono-label">
          <span className="text-accent">02</span> / {t('projects.label')}
        </h2>
        <span className="mono-micro">
          [ {String(projects.length).padStart(2, '0')} {t('projects.count')} ]
        </span>
      </div>

      <motion.div
        className="mt-6 h-px origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ease.out }}
      />

      <div className="mt-2">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} i={i} reduced={reduced} />
        ))}
      </div>

      {/* Slot intencional de "próximamente" — no es un proyecto falso. */}
      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-14 text-center"
      >
        <span className="mono-micro text-muted">{t('projects.soon.tag')}</span>
        <p className="mono mt-4 text-secondary">
          {t('projects.soon.loading')}
          <span className="ml-1 inline-block w-2 animate-caret bg-accent text-transparent">.</span>
        </p>
        <p className="mt-3 max-w-sm text-sm text-muted">{t('projects.soon.pitch')}</p>
      </motion.div>
    </section>
  )
}
