import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  ANALYZE: z
    .union([z.literal("true"), z.literal("false")])
    .optional()
    .default("false")
    .transform((v) => v === "true"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://clearskeye.vercel.app"),
});

const merged = z.object({ ...serverEnvSchema.shape, ...clientEnvSchema.shape });

const parsed = merged.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  ANALYZE: process.env.ANALYZE,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", z.prettifyError(parsed.error));
  throw new Error("Invalid environment variables. See above for details.");
}

export const env = parsed.data;

export type Env = typeof env;
