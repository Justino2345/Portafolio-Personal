import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS, emailjsConfigured } from '../lib/emailjs.js'
import { useI18n } from '../i18n/i18n.jsx'

const inputCls =
  'w-full rounded-md border border-line bg-surface-alt px-4 py-3 text-[0.95rem] text-primary placeholder:text-muted transition-colors focus:border-accent focus:outline-none'

// Formulario que envía un email REAL con EmailJS (client-side, sin backend).
// Los name="" de los inputs deben coincidir con las {{variables}} del template.
export default function EmailForm() {
  const { t } = useI18n()
  const formRef = useRef(null)
  const [estado, setEstado] = useState('idle') // idle | sending | ok | error

  const enviar = async (e) => {
    e.preventDefault()
    if (!emailjsConfigured || estado === 'sending') return
    setEstado('sending')
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, {
        publicKey: EMAILJS.publicKey,
      })
      setEstado('ok')
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setEstado('error')
    }
  }

  return (
    <form ref={formRef} onSubmit={enviar} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="mono-micro mb-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {t('email.heading')}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="mono-micro">{t('email.nombre.label')}</span>
          <input className={inputCls} type="text" name="name" placeholder={t('email.nombre.placeholder')} required />
        </label>
        <label className="flex flex-col gap-2">
          <span className="mono-micro">{t('email.email.label')}</span>
          <input className={inputCls} type="email" name="email" placeholder={t('email.email.placeholder')} required />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2">
        <span className="mono-micro">{t('email.mensaje.label')}</span>
        <textarea
          className={`${inputCls} min-h-[96px] resize-y`}
          name="message"
          placeholder={t('email.mensaje.placeholder')}
          required
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!emailjsConfigured || estado === 'sending'}
          className="mono inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-[0.8125rem] uppercase tracking-label text-bg transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {estado === 'sending' ? t('email.sending') : t('email.submit')}
        </button>
        {!emailjsConfigured && <span className="mono-micro text-amber">{t('email.notConfigured')}</span>}
        {estado === 'ok' && <span className="mono-micro text-accent">{t('email.ok')}</span>}
        {estado === 'error' && <span className="mono-micro text-amber">{t('email.error')}</span>}
      </div>
    </form>
  )
}
