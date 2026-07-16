import Motif from './Motifs.jsx'
import ProjectPreview from './ProjectPreview.jsx'
import { useI18n } from '../i18n/i18n.jsx'

const Corner = ({ glyph, pos }) => (
  <span className={`mono-micro absolute z-10 text-muted ${pos}`}>{glyph}</span>
)

export default function ProjectPlate({ project, reduced }) {
  const { t, L } = useI18n()
  const title = L(project.title)
  const caption = L(project.caption)
  const hasPreview = !!project.previewUrl
  const demo = project.links?.demo && project.links.demo !== '#' ? project.links.demo : null
  const Wrapper = demo ? 'a' : 'div'
  const wrapperProps = demo
    ? { href: demo, target: '_blank', rel: 'noreferrer', 'aria-label': t('projects.plate.openAria', { title }) }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      data-cursor="plate"
      className="group/plate relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface-alt"
    >
      <Motif type={project.motif} reduced={reduced} />

      {hasPreview && <ProjectPreview url={project.previewUrl} title={title} />}

      {hasPreview && (
        <div
          className="absolute inset-0 z-[5]"
          style={{ background: 'linear-gradient(to top, rgba(10,11,13,0.6), transparent 42%)' }}
        />
      )}

      <Corner glyph="┌" pos="left-2 top-2" />
      <Corner glyph="┐" pos="right-2 top-2" />
      <Corner glyph="└" pos="bottom-2 left-2" />
      <Corner glyph="┘" pos="bottom-2 right-2" />

      {hasPreview ? (
        <>
          <span className="mono-micro absolute left-3 top-3 z-10 flex items-center gap-1.5 text-secondary">
            <span className="h-1.5 w-1.5 animate-dotpulse rounded-full bg-accent" />
            {t('projects.plate.live')}
          </span>
          <span className="mono-micro absolute bottom-3 left-3 z-10 text-secondary">{caption}</span>
          <span className="mono-micro absolute bottom-3 right-3 z-10 text-primary opacity-0 transition-opacity duration-300 group-hover/plate:opacity-100">
            {t('projects.plate.open')}
          </span>
        </>
      ) : (
        <>
          <span
            className="pointer-events-none absolute -bottom-4 left-3 z-10 select-none font-display font-bold leading-none text-primary"
            style={{ fontSize: '5.5rem', opacity: 0.05 }}
          >
            {project.index}
          </span>
          <span className="absolute right-3 top-3 z-10 h-1.5 w-1.5 rounded-full bg-accent opacity-70" />
          <span className="mono-micro absolute inset-0 z-10 grid place-items-center text-secondary">
            [ {caption} ]
          </span>
        </>
      )}

      <svg className="pointer-events-none absolute inset-[1px] z-10" width="100%" height="100%" preserveAspectRatio="none">
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="7"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          pathLength="1"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out group-hover/plate:[stroke-dashoffset:0]"
        />
      </svg>
    </Wrapper>
  )
}
