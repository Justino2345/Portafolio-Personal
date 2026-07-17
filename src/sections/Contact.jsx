import { motion } from 'framer-motion'
import { revealUp, clipRevealUp } from '../lib/motion.js'
import { site } from '../data/site.js'
import { useI18n } from '../i18n/i18n.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import CopyEmailButton from '../components/CopyEmailButton.jsx'
import GlitchLink from '../components/GlitchLink.jsx'
import WhatsAppForm from '../components/WhatsAppForm.jsx'
import EmailForm from '../components/EmailForm.jsx'

export default function Contact({ nav, reduced }) {
  const { t } = useI18n()
  const subject = encodeURIComponent(t('contact.mailSubject'))
  const mailto = `mailto:${site.email}?subject=${subject}`
  // Link directo a la ventana de redacción de Gmail (no al cliente por defecto).
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${subject}`

  return (
    <section id="contacto" className="relative w-full">
      <div className="mx-auto flex min-h-screen max-w-content flex-col justify-center px-5 pb-28 pt-28 sm:px-8">
        <div className="mono-label flex items-baseline justify-between">
          <span>
            <span className="text-accent">04</span> / {t('contact.label')}
          </span>
          <span className="mono-micro">{t('contact.tag')}</span>
        </div>

        <motion.h2
          variants={clipRevealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 font-display font-bold text-primary"
          style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', lineHeight: 0.95, letterSpacing: '-0.04em' }}
        >
          {t('contact.heading').replace(/\.$/, '')}
          <span className="text-accent">.</span>
        </motion.h2>

        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="mt-6 max-w-lg text-lg text-secondary"
        >
          {t('contact.lead')}
        </motion.p>

        {/* dos vías: WhatsApp (instantáneo) y email real */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="mt-10 grid gap-5 lg:grid-cols-2"
        >
          <WhatsAppForm />
          <EmailForm />
        </motion.div>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
          className="mt-6 flex flex-wrap items-center gap-4"
        >
          <span className="mono-micro text-muted">{t('contact.alt')}</span>
          <MagneticButton as="a" href={gmail} target="_blank" rel="noreferrer" variant="secondary" reduced={reduced}>
            {t('contact.sendEmail')}
          </MagneticButton>
          <CopyEmailButton reduced={reduced} />
        </motion.div>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
          className="mt-16 max-w-2xl"
        >
          <GlitchLink href={site.social.github} label="GitHub" sub="github.com" reduced={reduced} />
          <GlitchLink href={site.social.linkedin} label="LinkedIn" sub="linkedin.com" reduced={reduced} />
          {site.social.instagram && (
            <GlitchLink href={site.social.instagram} label="Instagram" sub="instagram.com" reduced={reduced} />
          )}
          <GlitchLink href={mailto} label="Email" sub={site.email} reduced={reduced} />
        </motion.div>

        <div className="mt-16 flex items-center justify-between">
          <button onClick={() => nav('#intro')} className="mono-label transition-colors hover:text-accent">
            {t('contact.backTop')}
          </button>
          <span className="mono-micro">© 2026 {site.name}</span>
        </div>
      </div>
    </section>
  )
}
