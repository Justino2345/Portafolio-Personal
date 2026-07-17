import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValue } from 'framer-motion'
import Lenis from 'lenis'

// En táctil no hay puntero que seguir, pero el arrastre del scroll SÍ emite
// pointermove: sin este guard, cada gesto dispara trabajo por frame
// (re-renders / escrituras de MotionValue) sin ningún efecto visible.
const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

// Posición del puntero como MotionValues (para cursor, spotlight, etc).
// Throttle con requestAnimationFrame.
export function useMouseMotion() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  useEffect(() => {
    if (isCoarsePointer()) return undefined
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        x.set(e.clientX)
        y.set(e.clientY)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [x, y])
  return { x, y }
}

// Coordenadas del puntero como estado numérico (para el readout del intro).
export function useMouseCoords() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (isCoarsePointer()) return undefined
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setCoords({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
  return coords
}

// ¿Es un dispositivo táctil / puntero grueso?
export function useIsTouch() {
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    setTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])
  return touch
}

// Reloj local en vivo (hh:mm:ss).
export function useClock() {
  const [time, setTime] = useState(() => formatTime(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function formatTime(d) {
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

// Política del sitio sobre prefers-reduced-motion: IGNORARLA (decisión de
// diseño del dueño, 2026-07): en Android el ahorro de batería activa esa
// preferencia y dejaba el sitio 100% estático (marquee quieto, modo auto
// deshabilitado) para una gran parte de los visitantes móviles.
// Para volver a respetarla: devolver `!!useReducedMotion()` de framer-motion
// y restaurar el bloque @media (prefers-reduced-motion) en index.css.
export function useSiteReducedMotion() {
  return false
}

// Lenis smooth scroll. Devuelve scrollTo(target). Se desactiva con `enabled=false`.
export function useLenis(enabled = true) {
  const lenisRef = useRef(null)
  useEffect(() => {
    if (!enabled) return undefined
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenisRef.current = lenis
    let raf = 0
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  const scrollTo = useCallback((target) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) })
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return scrollTo
}

// Tema claro/oscuro. Lee el atributo data-theme (que setea el script inline del
// index.html para evitar parpadeo) y persiste la elección en localStorage.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'dark',
  )
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('theme', next)
      } catch (e) {
        /* ignore */
      }
      return next
    })
  }, [])
  return { theme, toggle }
}
