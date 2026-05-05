import type { Instrumentation } from "next/dist/server/instrumentation/types";

/**
 * Next.js calls `register()` once when the server boots.
 * This is the place to wire up OpenTelemetry, Sentry, custom logging, etc.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const startedAt = new Date().toISOString();
    console.log(`[instrumentation] node runtime ready · ${process.version} · ${startedAt}`);
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    console.log("[instrumentation] edge runtime ready");
  }
}

/**
 * Captures unhandled errors thrown from React Server Components, Server Actions,
 * route handlers, and middleware. Forward these to Sentry / Datadog / etc. here.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation#onrequesterror-optional
 */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  console.error("[instrumentation] request error", {
    message: (error as Error).message,
    digest: (error as { digest?: string }).digest,
    path: request.path,
    method: request.method,
    routerKind: context.routerKind,
    routePath: context.routePath,
    routeType: context.routeType,
    revalidateReason: context.revalidateReason,
  });
};
