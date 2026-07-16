import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/i18n.jsx'

// Vista previa en vivo: renderiza el sitio en un iframe a 1280px y lo escala
// para que entre como thumbnail. pointer-events-none => no atrapa el scroll;
// el click lo maneja el <a> de la card.
const BASE_W = 1280
const BASE_H = BASE_W * (10 / 16) // 16:10 -> 800

export default function ProjectPreview({ url, title }) {
  const { t } = useI18n()
  const ref = useRef(null)
  const [scale, setScale] = useState(0.4)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const update = () => setScale(el.clientWidth / BASE_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-surface-alt">
      <iframe
        src={url}
        title={t('projects.preview.aria', { title })}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        className="pointer-events-none origin-top-left border-0"
        style={{ width: `${BASE_W}px`, height: `${BASE_H}px`, transform: `scale(${scale})` }}
      />
    </div>
  )
}
