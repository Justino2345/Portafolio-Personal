import { useState } from 'react'
import { site } from '../data/site.js'
import { useI18n } from '../i18n/i18n.jsx'

const TIPO_KEYS = ['functional', 'visual', 'other']

const inputCls =
  'w-full rounded-md border border-line bg-surface-alt px-4 py-3 text-[0.95rem] text-primary placeholder:text-muted transition-colors focus:border-accent focus:outline-none'

// Arma un mensaje pre-cargado y abre wa.me hacia el número del sitio.
// Sin backend ni API oficial: usa el click-to-chat link de WhatsApp.
export default function WhatsAppForm() {
  const { t } = useI18n()
  const [nombre, setNombre] = useState('')
  const [tipoKey, setTipoKey] = useState('functional')
  const [mensaje, setMensaje] = useState('')

  const numero = (site.whatsapp || '').replace(/\D/g, '')
  const configurado = numero.length >= 8
  const listo = configurado && nombre.trim().length > 0

  const enviar = (e) => {
    e.preventDefault()
    if (!listo) return
    const partes = [
      t('whatsapp.msg.greeting', { nombre: nombre.trim() }),
      t('whatsapp.msg.projectType', { tipo: t(`whatsapp.tipo.opt.${tipoKey}`) }),
    ]
    if (mensaje.trim()) partes.push(mensaje.trim())
    const text = encodeURIComponent(partes.join('\n\n'))
    window.open(`https://wa.me/${numero}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={enviar} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="mono-micro mb-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {t('whatsapp.heading')}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="mono-micro">{t('whatsapp.nombre.label')}</span>
          <input
            className={inputCls}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={t('whatsapp.nombre.placeholder')}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="mono-micro">{t('whatsapp.tipo.label')}</span>
          <select className={inputCls} value={tipoKey} onChange={(e) => setTipoKey(e.target.value)}>
            {TIPO_KEYS.map((k) => (
              <option key={k} value={k}>
                {t(`whatsapp.tipo.opt.${k}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2">
        <span className="mono-micro">{t('whatsapp.mensaje.label')}</span>
        <textarea
          className={`${inputCls} min-h-[96px] resize-y`}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder={t('whatsapp.mensaje.placeholder')}
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!listo}
          className="mono inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-[0.8125rem] uppercase tracking-label text-bg transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t('whatsapp.submit')}
        </button>
        {!configurado && <span className="mono-micro text-amber">{t('whatsapp.notConfigured')}</span>}
      </div>
    </form>
  )
}
