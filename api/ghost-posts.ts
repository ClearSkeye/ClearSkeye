import { z } from 'zod'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function readEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

const GhostPostsResponseSchema = z.object({
  posts: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
        excerpt: z.string().optional().nullable(),
        published_at: z.string().optional().nullable(),
      }),
    )
    .default([]),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET')
    res.end('Method Not Allowed')
    return
  }

  try {
    const ghostUrl = readEnv('GHOST_URL').replace(/\/+$/, '')
    const key = readEnv('GHOST_CONTENT_API_KEY')

    const url = new URL(`${ghostUrl}/ghost/api/content/posts/`)
    url.searchParams.set('key', key)
    url.searchParams.set('limit', '3')
    url.searchParams.set('fields', 'id,title,url,excerpt,published_at')
    url.searchParams.set('formats', 'plaintext')

    const r = await fetch(url, { headers: { accept: 'application/json' } })
    if (!r.ok) {
      res.statusCode = 502
      res.setHeader('content-type', 'text/plain; charset=utf-8')
      res.end(`Ghost request failed (${r.status})`)
      return
    }

    const json = GhostPostsResponseSchema.parse(await r.json())
    res.statusCode = 200
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ posts: json.posts }))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bad Request'
    res.statusCode = message.startsWith('Missing environment variable') ? 204 : 400
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.end(message)
  }
}

