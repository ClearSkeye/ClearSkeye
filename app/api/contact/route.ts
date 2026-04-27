import { Resend } from 'resend'
import { z } from 'zod'

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

export async function POST(req: Request) {
  try {
    const body = ContactSchema.parse(await req.json())

    if (body.honeypot) {
      return Response.json({ ok: true })
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

    return Response.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bad Request'
    const status = message.startsWith('Missing environment variable') ? 500 : 400
    return new Response(message, {
      status,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }
}

export async function GET() {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  })
}
