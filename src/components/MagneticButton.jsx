import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { spring } from '../lib/motion.js'

// Botón con atracción magnética hacia el cursor.
export default function MagneticButton({
  children,
  as = 'button',
  href,
  onClick,
  variant = 'primary',
  reduced = false,
  ...rest
}) {
  const ref = useRef(null)
  const x = useSpring(0, spring.magnetic)
  const y = useSpring(0, spring.magnetic)

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const styles =
    variant === 'primary'
      ? 'bg-accent text-bg'
      : 'border border-line-hover text-primary hover:border-accent'

  const Comp = motion[as]

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={`mono inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[0.8125rem] uppercase tracking-label transition-colors ${styles}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}
