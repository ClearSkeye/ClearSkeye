import { z } from 'zod'

export const ContactRequestSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  message: z.string().min(1).max(4000),
  company: z.string().max(200).optional(),
  website: z.string().max(200).optional(),
  honeypot: z.string().max(0).optional(),
})

export type ContactRequest = z.infer<typeof ContactRequestSchema>

export async function submitContact(input: ContactRequest) {
  const body = ContactRequestSchema.parse(input)

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Contact request failed (${res.status})`)
  }
}

