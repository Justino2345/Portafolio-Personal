import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { ease, revealUp, spring } from '../lib/motion.js'
import { services } from '../data/services.js'
import { useI18n } from '../i18n/i18n.jsx'
import { useIsTouch, useSiteReducedMotion } from '../lib/hooks.js'

// Segundos que el modo auto muestra cada etapa antes de avanzar.
const DWELL = 5.2

const pad2 = (n) => String(n).padStart(2, '0')

// Palabra que rota verticalmente al cambiar (auto/manual, contador del pie).
function RollingWord({ value, reduced, className = '' }) {
  return (
    <span className={`inline-grid overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="tnum [grid-area:1/1]"
          initial={reduced ? { opacity: 0 } : { y: '110%' }}
          animate={reduced ? { opacity: 1 } : { y: '0%' }}
          exit={reduced ? { opacity: 0 } : { y: '-110%' }}
          transition={{ duration: 0.28, ease: ease.std }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// Línea de prompt que se "tipea" en cada cambio de etapa.
function PromptLine({ text, reduced }) {
  const [n, setN] = useState(reduced ? text.length : 0)
  useEffect(() => {
    if (reduced) {
      setN(text.length)
      return undefined
    }
    setN(0)
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id)
          return v
        }
        return v + 1
      })
    }, 18)
    return () => clearInterval(id)
  }, [text, reduced])

  return (
    <p className="mono-micro relative z-10 flex items-baseline normal-case" aria-hidden="true">
      <span className="text-accent">&gt;&nbsp;</span>
      <span className="text-muted">{text.slice(0, n)}</span>
      <span className="ml-1 inline-block h-[1em] w-[0.55em] animate-caret bg-accent" />
    </p>
  )
}

// Título con máscara por palabra (overflow-hidden + translateY, nunca clip-path).
function MaskTitle({ text, reduced }) {
  const words = text.split(' ')
  return (
    <h4
      className="relative z-10 mt-4 max-w-md font-display font-medium text-primary"
      style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.08 }}
    >
      {words.map((w, i) => (
        <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 0 } : { y: '115%' }}
            animate={reduced ? { opacity: 1 } : { y: '0%' }}
            transition={reduced ? { duration: 0.2 } : { ...spring.letter, delay: 0.08 + i * 0.045 }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </h4>
  )
}

// Numeral fantasma: contorno estático + copia acento que se "llena" desde abajo.
// La máscara baja (ventana) y el texto interior contra-traslada: solo transforms.
function GhostNumeral({ nn, fillMaskY, fillTextY }) {
  return (
    <div
      aria-hidden="true"
      className="tnum pointer-events-none absolute right-4 top-9 z-0 select-none font-display font-medium sm:right-8"
      style={{ fontSize: 'clamp(6rem, 13vw, 11rem)', lineHeight: 0.85, letterSpacing: '-0.04em' }}
    >
      <span className="block" style={{ WebkitTextStroke: '1px var(--ghost-stroke)', color: 'transparent' }}>
        {nn}
      </span>
      <motion.span className="absolute inset-0 overflow-hidden" style={{ y: fillMaskY }}>
        <motion.span className="block text-accent" style={{ y: fillTextY, opacity: 'var(--ghost-fill-opacity)' }}>
          {nn}
        </motion.span>
      </motion.span>
    </div>
  )
}

// Cronómetro t+MM:SS.d desde que se seleccionó la etapa activa.
function Elapsed({ activeKey, run, reduced }) {
  const [ticks, setTicks] = useState(0)
  useEffect(() => {
    setTicks(0)
    if (reduced || !run) return undefined
    const id = setInterval(() => setTicks((v) => v + 1), 100)
    return () => clearInterval(id)
  }, [activeKey, run, reduced])
  const s = Math.floor(ticks / 10)
  return (
    <span className="mono-micro tnum normal-case text-muted" aria-hidden="true">
      t+{pad2(Math.floor(s / 60))}:{pad2(s % 60)}.{ticks % 10}
    </span>
  )
}

// Escuadras de esquina del panel de lectura (encuadre blueprint).
function CornerMarks() {
  const pos = [
    'left-3 top-3 border-l border-t',
    'right-3 top-3 border-r border-t',
    'bottom-3 left-3 border-b border-l',
    'bottom-3 right-3 border-b border-r',
  ]
  return pos.map((p) => (
    <span key={p} aria-hidden="true" className={`pointer-events-none absolute z-10 h-2 w-2 border-line-hover ${p}`} />
  ))
}

function StatusCell({ state, ui }) {
  if (state === 'done')
    return (
      <span className="mono-micro whitespace-nowrap text-muted">
        <span aria-hidden="true" className="text-accent">
          ✓
        </span>{' '}
        {ui.done}
      </span>
    )
  if (state === 'run')
    return (
      <span className="mono-micro flex items-center gap-1.5 whitespace-nowrap text-accent">
        <span className="h-1 w-1 animate-dotpulse rounded-full bg-accent" />
        {ui.run}
      </span>
    )
  return <span className="mono-micro whitespace-nowrap text-muted opacity-60">{ui.queue}</span>
}

export default function Services() {
  const { t, lang } = useI18n()
  const s = services[lang] || services.es
  const { steps, ui } = s
  const reduced = useSiteReducedMotion()
  const isTouch = useIsTouch()

  const [active, setActive] = useState(0)
  const [mode, setMode] = useState('auto')

  const frameRef = useRef(null)
  const rowRefs = useRef([])
  const controlsRef = useRef(null)
  // `amount: 'some'`: en móvil el marco apilado mide 2-3 viewports; un umbral
  // de 0.25 nunca se alcanza de forma estable y el ciclo auto se congela.
  const inView = useInView(frameRef, { amount: 'some' })
  const inViewRef = useRef(false)

  // Un solo motion value gobierna la línea de progreso y el llenado del numeral.
  const dwell = useMotionValue(0)
  const fillMaskY = useTransform(dwell, (v) => `${(1 - v) * 100}%`)
  const fillTextY = useTransform(dwell, (v) => `${(v - 1) * 100}%`)

  // Con reduced-motion no hay ciclo automático: arranca en manual, gauge lleno.
  useEffect(() => {
    if (reduced) setMode('manual')
  }, [reduced])

  // Arranca una pasada del gauge por etapa/modo. La visibilidad NO está en las
  // deps a propósito: en móvil la barra de URL redimensiona el viewport al
  // scrollear y hace "aletear" al IntersectionObserver; si cada toggle
  // reiniciara el efecto, dwell volvería a 0 una y otra vez y el modo auto
  // jamás completaría sus 5.2s (el bug). Visibilidad = pausa/reanuda, no reset.
  useEffect(() => {
    if (reduced) {
      dwell.set(1)
      return undefined
    }
    dwell.set(0)
    const controls =
      mode === 'auto'
        ? animate(dwell, 1, {
            duration: DWELL,
            ease: 'linear',
            onComplete: () => setActive((a) => (a + 1) % steps.length),
          })
        : animate(dwell, 1, { duration: 0.9, ease: ease.out })
    if (mode === 'auto' && !inViewRef.current) controls.pause()
    controlsRef.current = controls
    return () => {
      controlsRef.current = null
      controls.stop()
    }
  }, [active, mode, reduced, steps.length, dwell])

  // Pausa/reanuda el reloj auto según visibilidad, preservando el progreso.
  useEffect(() => {
    inViewRef.current = inView
    if (reduced || mode !== 'auto') return
    if (inView) controlsRef.current?.play()
    else controlsRef.current?.pause()
  }, [inView, mode, reduced])

  const select = (i) => {
    setMode('manual')
    setActive(i)
  }

  // Hover sobre el panel o foco de teclado dentro del marco pausan el reloj auto.
  const pauseAuto = () => {
    if (mode === 'auto') controlsRef.current?.pause()
  }
  const resumeAuto = () => {
    if (mode === 'auto' && inViewRef.current) controlsRef.current?.play()
  }
  const onFrameBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) resumeAuto()
  }

  // Navega desde la fila donde está el foco, no desde la activa (pueden divergir).
  const onKeyDown = (e, i) => {
    let next = null
    if (e.key === 'ArrowDown') next = (i + 1) % steps.length
    else if (e.key === 'ArrowUp') next = (i - 1 + steps.length) % steps.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = steps.length - 1
    if (next === null) return
    e.preventDefault()
    select(next)
    rowRefs.current[next]?.focus()
  }

  const step = steps[active]
  const nn = pad2(active + 1)
  const statusFor = (i) => (i < active ? 'done' : i === active ? 'run' : 'queue')

  return (
    <section id="servicios" className="mx-auto max-w-content px-5 py-28 sm:px-8">
      <div className="flex items-baseline justify-between">
        <h2 className="mono-label">
          <span className="text-accent">03</span> / {t('services.label')}
        </h2>
        <span className="mono-micro">{t('services.tag')}</span>
      </div>

      <motion.div
        className="mt-6 h-px origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ease.out }}
      />

      {/* marco tipo consola */}
      <motion.div
        ref={frameRef}
        className="mt-12 rounded-lg border border-line"
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        onFocus={pauseAuto}
        onBlur={onFrameBlur}
      >
        {/* barra superior */}
        <div className="flex h-10 items-center justify-between border-b border-line px-4 sm:px-5">
          <span className="mono-micro normal-case text-muted">
            <span className="text-accent">~</span>/{ui.system}
          </span>
          <span className="mono-micro flex items-center gap-2 text-muted">
            {ui.mode}:
            <RollingWord value={mode === 'auto' ? ui.auto : ui.manual} reduced={reduced} className="text-primary" />
            <span
              className={`ml-1 h-1.5 w-1.5 rounded-full ${mode === 'auto' ? 'animate-dotpulse bg-accent' : 'bg-amber'}`}
              style={mode === 'auto' ? { boxShadow: '0 0 10px var(--accent-glow)' } : undefined}
            />
          </span>
        </div>

        <div className="grid md:grid-cols-[minmax(0,380px)_1fr]">
          {/* columna izquierda: título + tabla de proceso */}
          <div className="flex flex-col border-b border-line md:border-b-0 md:border-r">
            <div className="p-5 sm:p-6">
              <h3
                className="font-display font-medium text-primary"
                style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
              >
                {s.title}
              </h3>
              <p className="mt-4 max-w-sm text-secondary" style={{ lineHeight: 1.7 }}>
                {s.intro}
              </p>
            </div>

            <motion.div
              role="tablist"
              aria-orientation="vertical"
              aria-label={s.title}
              className="mt-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {steps.map((st, i) => (
                <motion.button
                  key={st.slug}
                  ref={(el) => {
                    rowRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`proc-tab-${i}`}
                  aria-controls="proc-panel"
                  aria-selected={active === i}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  variants={revealUp}
                  custom={i}
                  whileHover={!isTouch && !reduced ? { x: 4 } : undefined}
                  whileTap={reduced ? undefined : { scale: 0.99 }}
                  className={`relative flex h-[52px] w-full items-center gap-3 border-t border-line px-4 text-left transition-colors last:border-b sm:px-5 ${
                    active === i ? 'bg-surface' : 'hover:bg-surface-alt'
                  }`}
                  style={active === i ? { boxShadow: '0 24px 70px -40px var(--accent-glow)' } : undefined}
                >
                  {active === i &&
                    (reduced ? (
                      <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-accent" />
                    ) : (
                      <motion.span
                        layoutId="proc-active-bar"
                        className="absolute bottom-0 left-0 top-0 w-[2px] bg-accent"
                        transition={spring.reveal}
                      />
                    ))}
                  {/* flash del divisor: el "clic" mecánico al cambiar de etapa */}
                  {active === i && !reduced && (
                    <motion.span
                      key={`flash-${active}`}
                      className="pointer-events-none absolute inset-x-0 -top-px h-px bg-accent"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`mono hidden w-4 text-xs sm:block ${active === i ? 'text-accent' : 'text-muted'}`}
                  >
                    {active === i ? '▸' : i === steps.length - 1 ? '└' : '├'}
                  </span>
                  <span className={`mono tnum text-sm ${active === i ? 'text-accent' : 'text-muted'}`}>
                    {pad2(i + 1)}
                  </span>
                  <span
                    className={`mono min-w-0 flex-1 truncate text-xs uppercase tracking-label transition-colors ${
                      active === i ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {st.title}
                  </span>
                  <StatusCell state={statusFor(i)} ui={ui} />
                </motion.button>
              ))}
            </motion.div>

            <p className="mono-micro px-4 py-3 text-muted sm:px-5">
              [ {mode === 'auto' ? ui.hintAuto : isTouch ? ui.hintManualTouch : ui.hintManual} ]
            </p>
          </div>

          {/* panel de lectura */}
          <div
            role="tabpanel"
            id="proc-panel"
            aria-labelledby={`proc-tab-${active}`}
            className="flex flex-col"
            onPointerEnter={isTouch ? undefined : pauseAuto}
            onPointerLeave={isTouch ? undefined : resumeAuto}
          >
            {/* anuncio para lectores de pantalla solo en manual: el ticker y el
                typewriter quedan fuera (aria-hidden) para no spamear */}
            <span className="sr-only" aria-live={mode === 'manual' ? 'polite' : 'off'}>
              {ui.stage} {nn}: {step.title}. {step.desc}
            </span>
            <div className="relative min-h-[360px] flex-1 md:min-h-[420px]">
              {/* línea de progreso del ciclo auto */}
              {mode === 'auto' && !reduced && (
                <motion.div
                  className="absolute inset-x-0 top-0 z-10 h-px origin-left bg-accent"
                  style={{ scaleX: dwell }}
                />
              )}
              <CornerMarks />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  className="relative flex h-full flex-col p-6 sm:p-8 lg:p-10"
                  style={{ paddingRight: 'clamp(8.5rem, 23vw, 13rem)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={
                    reduced
                      ? { opacity: 0, transition: { duration: 0.15 } }
                      : { opacity: 0, y: -10, transition: { duration: 0.18, ease: ease.wipe } }
                  }
                >
                  <GhostNumeral nn={nn} fillMaskY={fillMaskY} fillTextY={fillTextY} />

                  <PromptLine text={`${ui.path}/${nn}-${step.slug}`} reduced={reduced} />
                  <MaskTitle text={step.title} reduced={reduced} />
                  <motion.div
                    className="relative z-10 mt-4 h-px w-16 origin-left bg-accent"
                    initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
                    animate={reduced ? { opacity: 1 } : { scaleX: 1 }}
                    transition={{ duration: 0.5, ease: ease.out, delay: 0.25 }}
                  />
                  <motion.p
                    className="relative z-10 mt-5 max-w-md text-secondary"
                    style={{ lineHeight: 1.7 }}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: ease.std, delay: 0.15 }}
                  >
                    {step.desc}
                  </motion.p>

                  {/* al llegar a la última etapa, puente hacia contacto */}
                  {active === steps.length - 1 && (
                    <motion.a
                      href="#contacto"
                      className="mono relative z-10 mt-7 inline-flex w-fit items-center gap-2 text-[0.8125rem] uppercase tracking-label text-accent transition-opacity hover:opacity-80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      [ {ui.cta} ] <span aria-hidden="true">↘</span>
                    </motion.a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* pie del panel: telemetría */}
            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 sm:px-5">
              <span className="mono-micro text-muted">
                {ui.stage} <RollingWord value={nn} reduced={reduced} className="text-primary" /> /{' '}
                {pad2(steps.length)}
              </span>
              <Elapsed activeKey={active} run={inView} reduced={reduced} />
            </div>
          </div>
        </div>

        {/* barra inferior */}
        <div className="flex h-9 items-center justify-between border-t border-line px-4 sm:px-5">
          <span className="mono-micro text-muted">{ui.meta}</span>
          <div className="flex items-center gap-1" aria-hidden="true">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-[3px] w-4 transition-colors duration-300 ${i <= active ? 'bg-accent' : 'bg-line'}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
