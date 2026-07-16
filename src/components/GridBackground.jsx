import { motion, useMotionTemplate } from 'framer-motion'

const CELL = '64px 64px'
const baseGrid = {
  backgroundImage:
    'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
  backgroundSize: CELL,
}
const litGrid = {
  backgroundImage:
    'linear-gradient(var(--grid-line-lit) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-lit) 1px, transparent 1px)',
  backgroundSize: CELL,
}

// Capa fija de grilla modular + spotlight que sigue al puntero.
export default function GridBackground({ mouse, reduced }) {
  const mask = useMotionTemplate`radial-gradient(240px circle at ${mouse.x}px ${mouse.y}px, #000 0%, transparent 70%)`

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0" style={baseGrid} />
      {!reduced && (
        <motion.div
          className="absolute inset-0"
          style={{ ...litGrid, maskImage: mask, WebkitMaskImage: mask }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 130% at 50% 0%, transparent 52%, var(--vignette) 100%)',
        }}
      />
    </div>
  )
}
