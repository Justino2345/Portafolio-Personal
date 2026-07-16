import { useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#________'

// Link que "scramblea" sus caracteres una vez al hacer hover y dibuja un subrayado lima.
export default function GlitchLink({ href, label, sub, reduced }) {
  const [text, setText] = useState(label)
  const raf = useRef(0)

  const scramble = () => {
    if (reduced) return
    cancelAnimationFrame(raf.current)
    let frame = 0
    const run = () => {
      const out = label
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          return i < frame / 2 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setText(out)
      frame += 1
      if (frame / 2 < label.length) {
        raf.current = requestAnimationFrame(run)
      } else {
        setText(label)
      }
    }
    run()
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={scramble}
      className="group relative flex items-center justify-between border-b border-line py-5"
    >
      <span className="mono tnum text-lg text-primary transition-colors duration-200 group-hover:text-accent">
        {text}
      </span>
      <span className="mono-micro flex items-center gap-3">
        {sub && <span className="hidden text-muted sm:inline">{sub}</span>}
        <span className="inline-block text-secondary transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
          ↗
        </span>
      </span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  )
}
