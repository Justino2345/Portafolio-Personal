import { site } from '../data/site.js'
import { useClock, useTheme } from '../lib/hooks.js'
import { useI18n } from '../i18n/i18n.jsx'

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

// Barra de estado fija: build/ubicación · ONLINE · reloj + toggles de idioma y tema.
export default function StatusBar() {
  const time = useClock()
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang, t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line backdrop-blur-sm"
      style={{ background: 'var(--scrim)' }}
    >
      <div className="mono-micro mx-auto flex max-w-content items-center justify-between px-5 py-2">
        <span className="hidden sm:inline">
          {site.build} · {site.location.toUpperCase()}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-dotpulse rounded-full bg-accent" />
          {t('status.online')}
        </span>
        <div className="flex items-center gap-4">
          <span className="hidden tnum text-secondary sm:inline">{time}</span>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('status.lang.aria')}
            className="flex items-center gap-1 transition-colors hover:text-accent"
          >
            <span className={lang === 'es' ? 'text-accent' : 'text-muted'}>ES</span>
            <span className="text-muted">/</span>
            <span className={lang === 'en' ? 'text-accent' : 'text-muted'}>EN</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t('status.theme.ariaLight') : t('status.theme.ariaDark')}
            className="flex items-center gap-1.5 uppercase tracking-label text-secondary transition-colors hover:text-accent"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span className="hidden sm:inline">{isDark ? t('status.theme.light') : t('status.theme.dark')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
