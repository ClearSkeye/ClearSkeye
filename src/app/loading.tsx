export default function Loading() {
  return (
    <div className="grid min-h-svh place-items-center">
      <div className="text-foreground/60 flex items-center gap-3">
        <span className="bg-foreground/60 size-2 animate-pulse rounded-full" />
        <span className="font-mono text-sm tracking-widest uppercase">Loading…</span>
      </div>
    </div>
  );
}
