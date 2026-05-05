import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6">
      <div className="text-center">
        <p className="text-foreground/60 font-mono text-xs tracking-widest uppercase">
          404 · Not Found
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          That page got lost in the mesh.
        </h1>
        <p className="text-foreground/70 mt-4">
          The URL you tried doesn&rsquo;t map to anything in this app.
        </p>
        <Link
          href="/"
          className="bg-foreground text-background hover:bg-foreground/90 mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition"
        >
          Take me home
        </Link>
      </div>
    </main>
  );
}
