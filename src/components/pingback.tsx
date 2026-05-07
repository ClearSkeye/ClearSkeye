"use client";

import { useActionState } from "react";

import { ping, type PingState } from "@/app/actions";
import { ArrowRightIcon } from "@/components/icons";

const initialState: PingState = { status: "idle" };

export function Pingback() {
  const [state, formAction, isPending] = useActionState(ping, initialState);

  const isError = state.status === "error";

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-8"
      aria-describedby="pingback-status"
    >
      <div className="flex flex-col gap-3">
        <label
          htmlFor="message"
          className="text-small text-sightline font-semibold tracking-[0.1em] uppercase"
        >
          Your note
        </label>
        <input
          id="message"
          name="message"
          required
          minLength={1}
          maxLength={120}
          autoComplete="off"
          aria-invalid={isError ? "true" : undefined}
          placeholder="What are you trying to look at?"
          className="border-rule bg-paper-light text-body text-ink placeholder:text-sightline focus:border-ink data-[invalid=true]:border-halt w-full rounded-xs border px-5 py-4 font-sans focus:border-2 focus:outline-none"
          data-invalid={isError ? "true" : "false"}
        />
        <p className="text-small text-sightline">
          One sentence is enough. We answer to a person, never a form queue.
        </p>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="group bg-ink text-body text-paper hover:bg-meridian focus-visible:outline-horizon inline-flex items-center justify-center gap-3 rounded-sm px-6 py-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending" : "Send the note"}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div id="pingback-status" aria-live="polite" role="status" className="text-small min-h-6">
        {state.status === "ok" && (
          <p className="text-affirm">
            Received. Echoed{" "}
            <span className="text-ink font-semibold">&ldquo;{state.echoed}&rdquo;</span> in{" "}
            {state.tookMs} milliseconds.
          </p>
        )}
        {state.status === "error" && <p className="text-halt">{state.message}</p>}
      </div>
    </form>
  );
}
