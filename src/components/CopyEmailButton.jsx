import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { spring } from '../lib/motion.js'
import { site } from '../data/site.js'
import { useI18n } from '../i18n/i18n.jsx'
import MagneticButton from './MagneticButton.jsx'

// Copia el email y muestra un sticker "copiado ✓".
export default function CopyEmailButton({ reduced }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch (e) {
      window.prompt(t('contact.copyPrompt'), site.email)
    }
  }

  return (
    <div className="relative inline-flex">
      <MagneticButton variant="secondary" onClick={copy} reduced={reduced}>
        {t('contact.copyEmail')}
      </MagneticButton>
      <AnimatePresence>
        {copied && (
          <motion.span
            className="mono absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm px-2 py-1 text-[0.6875rem] uppercase tracking-label"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            initial={{ opacity: 0, scale: 0.8, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring.sticker}
          >
            {t('contact.copied')}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
