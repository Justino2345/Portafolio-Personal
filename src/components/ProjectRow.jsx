import { motion } from 'framer-motion'
import { clipRevealUp } from '../lib/motion.js'
import { useRepo } from '../lib/useRepo.js'
import { useI18n } from '../i18n/i18n.jsx'
import ProjectPlate from './ProjectPlate.jsx'

function StatusDot({ status, t }) {
  const live = status === 'live'
  return (
    <span className="mono-micro flex items-center gap-1.5" style={{ color: live ? 'var(--accent)' : 'var(--amber)' }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: live ? 'var(--accent)' : 'var(--amber)' }} />
      {live ? t('projects.status.live') : t('projects.status.wip')}
    </span>
  )
}

// Datos en vivo del repo (solo si el proyecto tiene `repo`).
function RepoStats({ repo }) {
  const { t, lang } = useI18n()
  const { data, loading } = useRepo(repo)
  if (!repo || loading || !data) return null

  const fmt = new Intl.DateTimeFormat(lang === 'es' ? 'es-AR' : 'en-US', { dateStyle: 'medium' }).format(
    new Date(data.pushedAt),
  )

  return (
    <div className="mono-micro mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted">
      {data.language && (
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {data.language}
        </span>
      )}
      <span>★ {data.stars}</span>
      <span>⑂ {data.forks}</span>
      <span>
        {t('projects.repo.updated')}: {fmt}
      </span>
    </div>
  )
}

export default function ProjectRow({ project, i, reduced }) {
  const { t, L } = useI18n()

  return (
    <motion.article
      variants={clipRevealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={i}
      className="group grid grid-cols-1 gap-8 border-t border-line py-12 md:grid-cols-[1fr_minmax(0,46%)] md:items-center"
    >
      {/* texto */}
      <div className="order-2 transition-transform duration-500 ease-out group-hover:-translate-y-1 md:order-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="mono text-sm text-accent">{project.index}</span>
          <span className="mono-micro">{L(project.type)}</span>
          <StatusDot status={project.status} t={t} />
        </div>

        <h3
          className="mt-4 font-display text-4xl font-medium text-primary transition-transform duration-500 ease-out group-hover:translate-x-3 sm:text-5xl"
          style={{ letterSpacing: '-0.02em' }}
        >
          {L(project.title)}
        </h3>

        <p className="mt-4 max-w-md text-secondary">{L(project.desc)}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="mono-micro rounded-sm border border-line px-2 py-1">
              {tag}
            </span>
          ))}
          <span className="mono-micro text-muted">· {project.year}</span>
        </div>

        <RepoStats repo={project.repo} />

        <div className="mono mt-7 flex gap-6 text-[0.8125rem] uppercase tracking-label">
          <a href={project.links.demo} className="text-primary transition-colors hover:text-accent">
            {t('projects.row.demo')}
          </a>
          <a href={project.links.code} className="text-secondary transition-colors hover:text-accent">
            {t('projects.row.code')}
          </a>
        </div>
      </div>

      {/* placa */}
      <div className="order-1 rounded-lg transition-shadow duration-500 group-hover:shadow-glow md:order-2">
        <ProjectPlate project={project} reduced={reduced} />
      </div>
    </motion.article>
  )
}
