import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      runtime: `node ${process.version}`,
      version: process.env.npm_package_version ?? "0.0.0",
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      env: process.env.NODE_ENV,
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
