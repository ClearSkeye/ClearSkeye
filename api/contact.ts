import { Resend } from 'resend'
import { z } from 'zod'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  message: z.string().min(1).max(4000),
  company: z.string().max(200).optional(),
  website: z.string().max(200).optional(),
  honeypot: z.string().max(0).optional(),
})

function readEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.end('Method Not Allowed')
    return
  }

  try {
    const body = ContactSchema.parse(req.body ?? {})

    if (body.honeypot) {
      res.statusCode = 200
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify({ ok: true }))
      return
    }

    const resend = new Resend(readEnv('RESEND_API_KEY'))
    const to = readEnv('CONTACT_TO_EMAIL')
    const from = readEnv('CONTACT_FROM_EMAIL')

    const subject = `[${body.company ?? 'Website'}] New message from ${body.name}`
    const text = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      body.company ? `Company: ${body.company}` : null,
      body.website ? `Website: ${body.website}` : null,
      '',
      body.message,
    ]
      .filter(Boolean)
      .join('\n')

    await resend.emails.send({
      to,
      from,
      subject,
      replyTo: body.email,
      text,
    })

    res.statusCode = 200
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bad Request'
    const statusCode = message.startsWith('Missing environment variable') ? 500 : 400
    res.statusCode = statusCode
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.end(message)
  }
}

