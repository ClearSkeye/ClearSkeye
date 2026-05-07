export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="bg-paper grid min-h-svh place-items-center">
      <p className="eyebrow text-sightline flex items-center gap-3">
        <span aria-hidden className="bg-sightline inline-block h-px w-8" />
        Loading
      </p>
    </div>
  );
}
