import type { ButtonHTMLAttributes, ReactNode } from 'react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:pointer-events-none'

const variants = {
  primary:
    'bg-slate-950 text-white shadow-sm hover:bg-slate-900 active:bg-slate-950',
  secondary:
    'bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-slate-50 active:bg-white',
  ghost:
    'bg-transparent text-slate-950 hover:bg-slate-50 active:bg-transparent',
} as const

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: keyof typeof variants
}) {
  return (
    <button
      {...props}
      className={[base, variants[variant], className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  )
}

