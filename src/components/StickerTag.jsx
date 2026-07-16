import { motion } from 'framer-motion'
import { spring } from '../lib/motion.js'

// Etiqueta tipo sticker con rebote elástico al aparecer.
export default function StickerTag({ children, delay = 0, animate = true }) {
  return (
    <motion.span
      className="mono inline-flex items-center rounded-sm px-2 py-1 text-[0.6875rem] uppercase tracking-label"
      style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      initial={animate ? { opacity: 0, scale: 0.8, rotate: -4 } : false}
      animate={animate ? { opacity: 1, scale: 1, rotate: -3 } : undefined}
      transition={{ ...spring.sticker, delay }}
    >
      {children}
    </motion.span>
  )
}
