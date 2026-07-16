import { motion } from 'framer-motion'
import { ease } from '../lib/motion.js'

function Digit({ d, dim }) {
  return (
    <span className="inline-block overflow-hidden" style={{ height: '1em', width: '0.62em' }}>
      <motion.span
        className="block"
        animate={{ y: `-${d}em` }}
        transition={{ duration: 0.22, ease: ease.out }}
        style={{ color: dim ? 'var(--text-muted)' : 'var(--accent)' }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} className="block text-center" style={{ height: '1em' }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

// Contador 0–100 con dígitos enmascarados estilo split-flap.
export default function SplitFlapCounter({ value }) {
  const v = Math.min(100, Math.max(0, Math.round(value)))
  const chars = String(v).padStart(3, '0').split('')

  let leading = true
  const digits = chars.map((c, i) => {
    const isLeadingZero = leading && c === '0' && i < chars.length - 1
    if (c !== '0') leading = false
    return { d: Number(c), dim: isLeadingZero }
  })

  return (
    <div
      className="mono tnum flex font-medium leading-none"
      style={{ fontSize: 'clamp(2.4rem, 6vw, 3.6rem)' }}
      aria-hidden="true"
    >
      {digits.map((g, i) => (
        <Digit key={i} d={g.d} dim={g.dim} />
      ))}
    </div>
  )
}
