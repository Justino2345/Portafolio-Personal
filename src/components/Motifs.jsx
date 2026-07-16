import { motion } from 'framer-motion'

// Texturas generativas para las placas de proyecto (reemplazan a las imágenes).

function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.16] transition-opacity duration-500 group-hover/plate:opacity-30"
      style={{
        backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1.5px)',
        backgroundSize: '16px 16px',
      }}
    />
  )
}

function Scanline({ reduced }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--grid-line) 0 1px, transparent 1px 11px)',
        }}
      />
      {!reduced && (
        <motion.div
          className="absolute inset-x-0 h-1/3"
          style={{ background: 'linear-gradient(transparent, var(--scanline), transparent)' }}
          initial={{ y: '-120%' }}
          animate={{ y: '230%' }}
          transition={{ duration: 3.4, ease: 'linear', repeat: Infinity }}
        />
      )}
    </div>
  )
}

function ConcentricRings() {
  return (
    <div
      className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover/plate:opacity-90"
      style={{
        backgroundImage:
          'repeating-radial-gradient(circle at 50% 50%, var(--border) 0 1px, transparent 1px 22px)',
      }}
    />
  )
}

function Mesh() {
  return (
    <div
      className="absolute inset-0 transition-transform duration-700 group-hover/plate:scale-110"
      style={{
        background:
          'radial-gradient(60% 60% at 25% 30%, rgba(200,255,61,0.10), transparent 70%), radial-gradient(55% 55% at 80% 72%, rgba(125,211,252,0.10), transparent 70%)',
      }}
    />
  )
}

export default function Motif({ type, reduced }) {
  switch (type) {
    case 'dots':
      return <DotGrid />
    case 'scan':
      return <Scanline reduced={reduced} />
    case 'rings':
      return <ConcentricRings />
    case 'mesh':
      return <Mesh />
    default:
      return null
  }
}
