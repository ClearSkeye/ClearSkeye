"use server";

import { z } from "zod";

import { bumpLikes } from "@/lib/likes-store";

export type PingState =
  | { status: "idle" }
  | { status: "ok"; echoed: string; tookMs: number; handledBy: string }
  | { status: "error"; code: string; message: string };

const messageSchema = z
  .string()
  .trim()
  .min(1, "Message cannot be empty.")
  .max(120, "Message must be 120 characters or fewer.");

export async function ping(_prev: PingState, formData: FormData): Promise<PingState> {
  const start = performance.now();
  const parsed = messageSchema.safeParse(formData.get("message"));

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      status: "error",
      code: "400",
      message: first?.message ?? "Invalid input.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 250));

  const tookMs = Math.round(performance.now() - start);
  const handledBy = `Node ${process.version} · ${process.platform}/${process.arch}`;

  return { status: "ok", echoed: parsed.data, tookMs, handledBy };
}

export async function likeAction(): Promise<number> {
  return bumpLikes(1);
}
