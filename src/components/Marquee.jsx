import { site } from '../data/site.js'
import { useI18n } from '../i18n/i18n.jsx'

// Ticker mono infinito con separadores lima.
export default function Marquee({ reduced }) {
  const { L } = useI18n()
  const items = L(site.marquee)
  const seq = [...items, ...items]
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-line py-3.5">
      <div className={`flex w-max ${reduced ? '' : 'animate-marquee'}`}>
        {seq.map((tt, i) => (
          <span key={i} className="mono-label flex items-center whitespace-nowrap">
            <span className="px-7 text-secondary">{tt}</span>
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
