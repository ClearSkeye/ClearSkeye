"use client";

import { useOptimistic, useTransition } from "react";

import { likeAction } from "@/app/actions";

export function LikeButton({ initial }: { initial: number }) {
  const [isPending, startTransition] = useTransition();
  const [optimistic, addOptimistic] = useOptimistic(
    initial,
    (state, delta: number) => state + delta,
  );

  function onClick() {
    startTransition(async () => {
      addOptimistic(1);
      await likeAction();
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      aria-label={`Mark this page noted, current count ${optimistic}`}
      className="border-ink bg-paper text-body text-ink hover:bg-ink hover:text-paper focus-visible:outline-horizon inline-flex items-center gap-3 rounded-xs border px-5 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
    >
      <span aria-hidden className="text-small font-mono tabular-nums">
        {String(optimistic).padStart(3, "0")}
      </span>
      <span className="text-small font-semibold tracking-[0.1em] uppercase">Noted</span>
    </button>
  );
}
