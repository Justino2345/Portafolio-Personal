import { useEffect, useState } from 'react'

// Datos en vivo de un repo público de GitHub. `fullName` = 'usuario/repo'.
// Cachea 6h en localStorage para no gastar el rate-limit (60 req/h por IP sin token).
const CACHE_TTL = 1000 * 60 * 60 * 6

export function useRepo(fullName) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(!!fullName)

  useEffect(() => {
    if (!fullName) {
      setLoading(false)
      return undefined
    }

    const cacheKey = `repo:${fullName}`
    try {
      const raw = localStorage.getItem(cacheKey)
      if (raw) {
        const cached = JSON.parse(raw)
        if (cached.t && Date.now() - cached.t < CACHE_TTL) {
          setData(cached.d)
          setLoading(false)
          return undefined
        }
      }
    } catch (e) {
      /* ignore */
    }

    const ctrl = new AbortController()
    setLoading(true)
    setError(null)

    fetch(`https://api.github.com/repos/${fullName}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: ctrl.signal,
    })
      .then(async (res) => {
        if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
          throw new Error('rate-limit')
        }
        if (!res.ok) throw new Error(`github ${res.status}`)
        return res.json()
      })
      .then((repo) => {
        const d = {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          pushedAt: repo.pushed_at,
          url: repo.html_url,
        }
        setData(d)
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d }))
        } catch (e) {
          /* ignore */
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => ctrl.abort()
  }, [fullName])

  return { data, error, loading }
}
