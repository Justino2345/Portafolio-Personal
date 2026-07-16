import { site } from '../data/site.js'
import { useI18n } from '../i18n/i18n.jsx'

const initials = site.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

const Corner = ({ glyph, pos }) => (
  <span className={`mono-micro absolute z-10 text-muted ${pos}`}>{glyph}</span>
)

// Retrato con frame al estilo del diseño. Muestra la foto si está cargada en
// site.photo; si no, un placeholder elegante con las iniciales.
export default function Portrait() {
  const { t } = useI18n()
  const hasPhoto = !!site.photo

  return (
    <div className="group/portrait relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-surface-alt">
      {hasPhoto ? (
        <img
          src={site.photo}
          alt={t('portrait.alt', { name: site.name })}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-500 ease-out group-hover/portrait:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span className="select-none font-display text-7xl font-bold text-primary opacity-[0.08]">
            {initials}
          </span>
          <span className="mono-micro absolute bottom-3 left-3 text-muted">
            {t('portrait.placeholder')}
          </span>
        </div>
      )}

      <Corner glyph="┌" pos="left-2 top-2" />
      <Corner glyph="┐" pos="right-2 top-2" />
      <Corner glyph="└" pos="bottom-2 left-2" />
      <Corner glyph="┘" pos="bottom-2 right-2" />
    </div>
  )
}
