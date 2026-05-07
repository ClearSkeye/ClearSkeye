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
      "Server Components, useActionState, useOptimistic, the use() hook, and the React Compiler. Manual memoisation is no longer needed.",
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
      "The all CSS engine. Theme tokens, the @tailwindcss/postcss plugin, container queries, OKLCH colour, and zero JavaScript configuration.",
    href: "https://tailwindcss.com/",
  },
  {
    name: "Turbopack",
    version: "Default",
    blurb:
      "Used for both development and production builds. Server Fast Refresh, sub resource integrity, and dynamic import tree shaking.",
    href: "https://turbo.build/pack",
  },
  {
    name: "Vercel",
    version: "Edge and Analytics",
    blurb:
      "Deployed on Vercel with @vercel/analytics and @vercel/speed-insights wired in for real user metrics.",
    href: "https://vercel.com/",
  },
];

export function StackGrid() {
  return (
    <ul className="border-rule grid gap-px border-t sm:grid-cols-2 lg:grid-cols-3">
      {stack.map((item) => (
        <li key={item.name} className="border-rule border-b lg:border-r">
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group bg-paper hover:bg-paper-light focus-visible:outline-horizon flex h-full flex-col gap-4 p-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-heading-3 text-ink font-serif font-light">{item.name}</h3>
              <span className="text-small text-sightline font-mono">{item.version}</span>
            </div>
            <p className="text-body text-meridian text-pretty">{item.blurb}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
