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
      aria-label={`Like — current count ${optimistic}`}
      className="group border-foreground/15 bg-background/60 text-foreground hover:border-foreground/40 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur transition disabled:cursor-not-allowed"
    >
      <span aria-hidden className="relative inline-flex size-6 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 text-rose-500 transition group-active:scale-90"
        >
          <path d="M12 21s-7.5-4.5-9.5-9.5C1 7 4.5 4 8 4c2 0 3.5 1 4 2 .5-1 2-2 4-2 3.5 0 7 3 5.5 7.5C19.5 16.5 12 21 12 21Z" />
        </svg>
      </span>
      <span className="font-mono text-base tabular-nums">{optimistic}</span>
      <span className="text-foreground/60">likes</span>
    </button>
  );
}
