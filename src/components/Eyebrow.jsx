// Eyebrow mono con punto de estado pulsante.
export default function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-1.5 w-1.5 animate-dotpulse rounded-full bg-accent" />
      <span className="mono-label">{children}</span>
    </div>
  )
}
