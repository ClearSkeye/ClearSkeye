export type GhostPost = {
  id: string
  title: string
  url: string
  excerpt?: string | null
  published_at?: string | null
}

export async function fetchLatestGhostPosts(): Promise<GhostPost[]> {
  const res = await fetch('/api/ghost-posts', { method: 'GET' })
  if (res.status === 204) return []
  if (!res.ok) throw new Error(`Ghost posts unavailable (${res.status})`)
  const json = (await res.json()) as { posts?: GhostPost[] }
  return Array.isArray(json.posts) ? json.posts : []
}

