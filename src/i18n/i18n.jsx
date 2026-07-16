import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './strings.js'

const I18nContext = createContext(null)

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'es' || saved === 'en') return saved
  } catch (e) {
    /* ignore */
  }
  try {
    if (navigator.language && navigator.language.toLowerCase().startsWith('en')) return 'en'
  } catch (e) {
    /* ignore */
  }
  return 'es'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    const dict = strings[lang] || {}
    if (dict['seo.title']) document.title = dict['seo.title']
    const desc = document.querySelector('meta[name="description"]')
    if (desc && dict['seo.desc']) desc.setAttribute('content', dict['seo.desc'])
  }, [lang])

  const setLang = useCallback((l) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch (e) {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(() => setLang(lang === 'es' ? 'en' : 'es'), [lang, setLang])

  const value = useMemo(() => {
    // t(key, vars): texto de UI desde el diccionario, con interpolación de {vars}.
    const t = (key, vars) => {
      let s = (strings[lang] && strings[lang][key]) ?? key
      if (vars) {
        for (const k of Object.keys(vars)) s = s.split(`{${k}}`).join(vars[k])
      }
      return s
    }
    // L(value): elige el idioma de un dato bilingüe { es, en }. Si es plano, lo devuelve tal cual.
    const L = (v) => {
      if (v && typeof v === 'object' && !Array.isArray(v) && ('es' in v || 'en' in v)) {
        return v[lang] ?? v.es ?? v.en
      }
      return v
    }
    return { lang, setLang, toggle, t, L }
  }, [lang, setLang, toggle])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}
