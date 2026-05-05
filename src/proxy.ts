import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy demo (formerly `middleware.ts` — renamed in Next.js 16):
 *  - tags every response with a request id (great for log correlation)
 *  - exposes a coarse geo hint via a custom header
 *  - keeps the matcher narrow so we don't run on _next/static, images, etc.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export function proxy(request: NextRequest) {
  const requestId =
    request.headers.get("x-request-id") ??
    globalThis.crypto?.randomUUID?.() ??
    Math.random().toString(36).slice(2);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-request-id", requestId);

  // request.geo is provided by Vercel's edge network at runtime.
  const geo = (request as NextRequest & { geo?: { country?: string } }).geo;
  if (geo?.country) {
    response.headers.set("x-geo-country", geo.country);
  }

  return response;
}

export const config = {
  matcher: [
    // Run on everything except Next.js internals, static files, and image optimization.
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|manifest.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};
