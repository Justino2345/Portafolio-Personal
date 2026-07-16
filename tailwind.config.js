/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        'surface-elevated': 'var(--surface-elevated)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-alt': 'var(--accent-alt)',
        amber: 'var(--amber)',
        line: 'var(--border)',
        'line-hover': 'var(--border-hover)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.12em',
        tight2: '-0.02em',
        tight4: '-0.04em',
      },
      maxWidth: {
        content: '1320px',
      },
      boxShadow: {
        glow: '0 24px 70px -40px var(--accent-glow)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        dotpulse: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        dotpulse: 'dotpulse 1.6s ease-in-out infinite',
        caret: 'caret 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
