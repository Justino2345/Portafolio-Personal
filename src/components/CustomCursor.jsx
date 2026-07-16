import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { spring } from '../lib/motion.js'
import { useI18n } from '../i18n/i18n.jsx'

// Cursor custom: punto lima + anillo con retardo elástico.
// Cambia de estado sobre elementos interactivos y sobre las "placas" de proyecto.
export default function CustomCursor({ mouse }) {
  const ringX = useSpring(mouse.x, spring.cursor)
  const ringY = useSpring(mouse.y, spring.cursor)
  const [variant, setVariant] = useState('default') // default | hover | plate
  const { t } = useI18n()

  useEffect(() => {
    document.body.classList.add('custom-cursor')
    const onOver = (e) => {
      const el = e.target?.closest?.('[data-cursor], a, button')
      if (!el) {
        setVariant('default')
        return
      }
      setVariant(el.getAttribute('data-cursor') === 'plate' ? 'plate' : 'hover')
    }
    window.addEventListener('pointerover', onOver)
    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[7px] w-[7px] rounded-full bg-accent"
        style={{ x: mouse.x, y: mouse.y, marginLeft: -3.5, marginTop: -3.5 }}
        animate={{ scale: variant === 'plate' ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 rounded-full border"
        style={{ x: ringX, y: ringY, marginLeft: -16, marginTop: -16 }}
        animate={{
          scale: variant === 'default' ? 1 : 1.6,
          opacity: variant === 'plate' ? 0 : 1,
          borderColor: variant === 'default' ? 'var(--border-hover)' : 'var(--accent)',
        }}
        transition={spring.cursor}
      />
      <motion.div
        className="mono-micro pointer-events-none fixed left-0 top-0 z-[60] text-accent"
        style={{ x: ringX, y: ringY, marginLeft: 16, marginTop: -6 }}
        animate={{ opacity: variant === 'plate' ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        {t('nav.cursor.more')}
      </motion.div>
    </>
  )
}
