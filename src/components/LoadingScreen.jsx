import { useEffect, useState } from 'react'
import { animate, AnimatePresence, motion } from 'framer-motion'
import { ease } from '../lib/motion.js'
import { useI18n } from '../i18n/i18n.jsx'
import { HeroBlock } from './HeroName.jsx'
import SplitFlapCounter from './SplitFlapCounter.jsx'

const LOG_LINES = [
  '> init portfolio.justino',
  '> loading [ react · framer · tailwind ]',
  '> mounting components…',
  '> fetching projects…',
  '> compiling ui…',
  '> ready.',
]

// Typewriter secuencial para las líneas del log.
function useTypewriter(lines, active, speed = 22, linePause = 170) {
  const [out, setOut] = useState(lines.map(() => ''))
  useEffect(() => {
    if (!active) return undefined
    let li = 0
    let ci = 0
    let cancelled = false
    const buf = lines.map(() => '')
    const tick = () => {
      if (cancelled || li >= lines.length) return
      const line = lines[li]
      if (ci <= line.length) {
        buf[li] = line.slice(0, ci)
        setOut([...buf])
        ci += 1
        setTimeout(tick, speed)
      } else {
        li += 1
        ci = 0
        setTimeout(tick, linePause)
      }
    }
    const id = setTimeout(tick, 200)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  return out
}

export default function LoadingScreen({ onDone, reduced }) {
  const { t } = useI18n()

  // Modo: full (primera visita) | quick (ya se vio esta sesión) | reduced.
  const [mode] = useState(() => {
    if (reduced) return 'reduced'
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('booted')) return 'quick'
    return 'full'
  })

  const [stage, setStage] = useState('init') // init -> name -> lift
  const [count, setCount] = useState(0)
  const typed = useTypewriter(LOG_LINES, mode === 'full' && stage === 'init', 16, 95)

  // Contador + paso a la fase del nombre.
  useEffect(() => {
    if (mode === 'full') {
      const controls = animate(0, 100, {
        duration: 3.4,
        ease: [0.45, 0, 0.15, 1],
        onUpdate: (v) => setCount(v),
        onComplete: () => setStage('name'),
      })
      return () => controls.stop()
    }
    setCount(100)
    const t = setTimeout(() => setStage('name'), mode === 'quick' ? 120 : 200)
    return () => clearTimeout(t)
  }, [mode])

  // Fase del nombre -> lift-off.
  useEffect(() => {
    if (stage !== 'name') return undefined
    const delay = mode === 'full' ? 2100 : mode === 'quick' ? 520 : 800
    const t = setTimeout(() => setStage('lift'), delay)
    return () => clearTimeout(t)
  }, [stage, mode])

  const progress = Math.min(100, Math.round(count)) / 100

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: 'var(--bg)' }}
      initial={{ y: 0 }}
      animate={{ y: stage === 'lift' ? '-100%' : 0 }}
      transition={{ duration: 0.7, ease: ease.wipe }}
      onAnimationComplete={() => {
        if (stage === 'lift') {
          try {
            sessionStorage.setItem('booted', '1')
          } catch (e) {
            /* ignore */
          }
          onDone()
        }
      }}
    >
      {/* grilla tenue del loader */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* FASE INIT: log + barra + contador */}
      <AnimatePresence>
        {stage === 'init' && mode === 'full' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: ease.out }}
          >
            <div className="w-full max-w-xl">
              <div className="mono space-y-1.5 text-[0.8125rem] text-secondary">
                {LOG_LINES.map((line, i) => (
                  <div key={i} className="flex">
                    <span>{typed[i]}</span>
                    {typed[i]?.length > 0 && typed[i].length < line.length && (
                      <span className="ml-0.5 inline-block w-2 animate-caret bg-accent text-transparent">.</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-end justify-between gap-6">
                <div className="flex-1">
                  <div className="mono-micro mb-3">{t('loader.loading')}</div>
                  <div className="h-px w-full bg-line">
                    <motion.div
                      className="h-px origin-left bg-accent"
                      style={{ scaleX: progress }}
                    />
                  </div>
                </div>
                <SplitFlapCounter value={count} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FASE NAME: el nombre se ensambla en la posición exacta del intro */}
      {(stage === 'name' || stage === 'lift') && (
        <div className="absolute inset-0 grid place-items-center px-6">
          <HeroBlock assemble underline lead="hidden" />
        </div>
      )}
    </motion.div>
  )
}
