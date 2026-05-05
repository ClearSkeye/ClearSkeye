"use client";

import { useActionState } from "react";

import { ping, type PingState } from "@/app/actions";

const initialState: PingState = { status: "idle" };

export function Pingback() {
  const [state, formAction, isPending] = useActionState(ping, initialState);

  return (
    <form
      action={formAction}
      className="border-foreground/10 bg-background/60 flex flex-col gap-4 rounded-3xl border p-6 backdrop-blur sm:p-8"
    >
      <label
        htmlFor="message"
        className="text-foreground/60 font-mono text-xs tracking-widest uppercase"
      >
        Send a message to the server
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="message"
          name="message"
          required
          minLength={1}
          maxLength={120}
          placeholder="Hello from the edge"
          autoComplete="off"
          className="border-foreground/15 bg-background/80 text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-accent/30 flex-1 rounded-full border px-5 py-3 font-mono text-sm transition outline-none focus:ring-2"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Pinging…" : "Ping server"}
        </button>
      </div>

      <output
        aria-live="polite"
        className="border-foreground/15 bg-background/40 text-foreground/80 min-h-12 rounded-2xl border border-dashed px-4 py-3 font-mono text-xs"
      >
        {state.status === "idle" && <span className="text-foreground/50">Waiting for input…</span>}
        {state.status === "ok" && (
          <span>
            <span className="text-emerald-500">200</span> · echoed{" "}
            <span className="text-foreground font-semibold">{state.echoed}</span> in {state.tookMs}
            ms — handled by <span className="text-foreground/70">{state.handledBy}</span>
          </span>
        )}
        {state.status === "error" && (
          <span>
            <span className="text-rose-500">{state.code}</span> · {state.message}
          </span>
        )}
      </output>
    </form>
  );
}
