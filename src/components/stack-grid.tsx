type StackItem = {
  name: string;
  version: string;
  blurb: string;
  href: string;
};

const stack: ReadonlyArray<StackItem> = [
  {
    name: "Next.js",
    version: "16.2.4",
    blurb:
      "App Router, React Server Components, Server Actions, typed routes, cache components, and Turbopack as the default bundler.",
    href: "https://nextjs.org/blog/next-16-2",
  },
  {
    name: "React",
    version: "19.2.5",
    blurb:
      "Server Components, useActionState, useOptimistic, the use() hook, and the new React Compiler — no more manual useMemo / useCallback.",
    href: "https://react.dev/blog",
  },
  {
    name: "TypeScript",
    version: "6.0.3",
    blurb:
      "Strict mode by default with verbatimModuleSyntax, isolatedModules, and the bundler module resolution strategy.",
    href: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS",
    version: "4.2.4",
    blurb:
      "The all-CSS engine: @theme tokens, the @tailwindcss/postcss plugin, container queries, OKLCH colors, and zero JS config.",
    href: "https://tailwindcss.com/",
  },
  {
    name: "Turbopack",
    version: "Default",
    blurb:
      "Used for both dev and production builds. Server Fast Refresh, SRI, dynamic-import tree shaking — built into Next.js 16.",
    href: "https://turbo.build/pack",
  },
  {
    name: "Vercel",
    version: "Edge + Analytics",
    blurb:
      "Deployed on Vercel with @vercel/analytics and @vercel/speed-insights wired in for real-user metrics.",
    href: "https://vercel.com/",
  },
];

export function StackGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stack.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group border-foreground/10 bg-background/50 hover:border-foreground/30 relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border p-6 backdrop-blur transition"
          >
            <div
              aria-hidden
              className="via-foreground/40 absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition group-hover:opacity-100"
            />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
              <span className="text-foreground/60 font-mono text-xs tabular-nums">
                {item.version}
              </span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed text-pretty">{item.blurb}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
