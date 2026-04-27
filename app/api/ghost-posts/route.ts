import { z } from 'zod'

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

export async function GET() {
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
      return new Response(`Ghost request failed (${r.status})`, {
        status: 502,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })
    }

    const json = GhostPostsResponseSchema.parse(await r.json())
    return Response.json({ posts: json.posts })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bad Request'
    const status = message.startsWith('Missing environment variable') ? 204 : 400
    return new Response(message, {
      status,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }
}

export async function POST() {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET' },
  })
}
