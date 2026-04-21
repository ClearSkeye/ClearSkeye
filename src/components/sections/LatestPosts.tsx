import { useEffect, useState } from 'react'
import { fetchLatestGhostPosts, type GhostPost } from '../../lib/ghostPosts'

export function LatestPosts() {
  const [posts, setPosts] = useState<GhostPost[] | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchLatestGhostPosts()
      .then((p) => {
        if (!cancelled) setPosts(p.length ? p : null)
      })
      .catch(() => {
        if (!cancelled) setPosts(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!posts) return null

  return (
    <section className="py-12 sm:py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Latest from the blog
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Ideas worth stealing.
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {posts.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-sm font-semibold text-slate-950 group-hover:text-indigo-600">
              {p.title}
            </div>
            {p.excerpt ? (
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {p.excerpt}
              </p>
            ) : null}
            <div className="mt-4 text-xs font-medium text-slate-500">
              Read more →
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

