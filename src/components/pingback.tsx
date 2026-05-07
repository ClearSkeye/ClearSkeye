"use client";

import { useActionState } from "react";

import { ping, type PingState } from "@/app/actions";

const initialState: PingState = { status: "idle" };

/**
 * The contact form.
 *
 * Brand discipline:
 *   - Single column, one field per row.
 *   - Label above, in Söhne small, Sightline.
 *   - Field border 1 pixel in Rule. Focus border 2 pixels in Ink,
 *     no coloured glow.
 *   - Errors set in Halt as a full sentence.
 *   - Submit reads as a sentence. No icon, no arrow; the brand
 *     dislikes motion beyond underlines.
 *
 * The success message echoes the user's note so the reader knows
 * the firm saw what they wrote, then promises a reply. No
 * milliseconds, no infrastructure chatter.
 */
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
      <div className="flex flex-col gap-4">
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
          className="border-rule bg-paper-light text-body text-ink placeholder:text-sightline focus:border-ink data-[invalid=true]:border-halt w-full rounded-xs border px-4 py-4 font-sans focus:border-2 focus:outline-none"
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
          className="bg-ink text-body text-paper hover:bg-meridian focus-visible:outline-horizon inline-flex items-center justify-center rounded-sm px-8 py-6 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending" : "Send the note"}
        </button>
      </div>

      <div id="pingback-status" aria-live="polite" role="status" className="text-small min-h-6">
        {state.status === "ok" && (
          <p className="text-affirm">
            Received. We have your note,{" "}
            <span className="text-ink font-semibold">&ldquo;{state.echoed}&rdquo;</span>. We will
            reply.
          </p>
        )}
        {state.status === "error" && <p className="text-halt">{state.message}</p>}
      </div>
    </form>
  );
}
