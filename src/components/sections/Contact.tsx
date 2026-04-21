import { useId, useMemo, useState } from 'react'
import { submitContact } from '../../lib/contact'
import { Button } from '../ui/Button'

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export function Contact() {
  const nameId = useId()
  const emailId = useId()
  const companyId = useId()
  const websiteId = useId()
  const messageId = useId()
  const honeypotId = useId()

  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [website, setWebsite] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const canSubmit = useMemo(() => {
    if (status.kind === 'submitting') return false
    return name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0
  }, [email, message, name, status.kind])

  return (
    <section id="contact" className="py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Talk to us.
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-slate-700">
            Send a note and we’ll reply quickly. This form posts to a Vercel
            serverless endpoint, so you can keep your inbox private.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-950">
              What happens next
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              <li>We read your message and route it to the right person.</li>
              <li>You get a reply within 1–2 business days.</li>
              <li>If it’s a fit, we’ll schedule a short call.</li>
            </ul>
          </div>
        </div>

        <form
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          onSubmit={async (e) => {
            e.preventDefault()
            setStatus({ kind: 'submitting' })
            try {
              await submitContact({
                name,
                email,
                company: company || undefined,
                website: website || undefined,
                message,
                honeypot,
              })
              setStatus({ kind: 'success' })
              setName('')
              setEmail('')
              setCompany('')
              setWebsite('')
              setMessage('')
              setHoneypot('')
            } catch (err) {
              const message =
                err instanceof Error ? err.message : 'Something went wrong.'
              setStatus({ kind: 'error', message })
            }
          }}
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor={nameId} className="text-sm font-medium text-slate-950">
                Name
              </label>
              <input
                id={nameId}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-950 shadow-sm outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2"
                placeholder="Your name"
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor={emailId} className="text-sm font-medium text-slate-950">
                Email
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-950 shadow-sm outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor={companyId} className="text-sm font-medium text-slate-950">
                  Company <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  id={companyId}
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-950 shadow-sm outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2"
                  placeholder="Company"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor={websiteId} className="text-sm font-medium text-slate-950">
                  Website <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  id={websiteId}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-950 shadow-sm outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2"
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor={messageId} className="text-sm font-medium text-slate-950">
                Message
              </label>
              <textarea
                id={messageId}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-28 resize-y rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2"
                placeholder="What would you like to build?"
                required
              />
            </div>

            <div className="hidden">
              <label htmlFor={honeypotId}>Do not fill</label>
              <input
                id={honeypotId}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={!canSubmit}>
                {status.kind === 'submitting' ? 'Sending…' : 'Send message'}
              </Button>

              {status.kind === 'success' ? (
                <p className="text-sm font-medium text-emerald-700">
                  Thanks — we’ll get back to you.
                </p>
              ) : status.kind === 'error' ? (
                <p className="text-sm font-medium text-rose-700">
                  {status.message}
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  By submitting, you agree to be contacted.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

