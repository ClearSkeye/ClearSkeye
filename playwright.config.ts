import { defineConfig, devices } from "@playwright/test";
import { homedir } from "node:os";
import { join } from "node:path";

// Pin the browser cache to the canonical macOS / Linux location so stray env
// vars (e.g. from a sandboxed shell) can't redirect Playwright at a stale path.
if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
  process.env.PLAYWRIGHT_BROWSERS_PATH =
    process.platform === "darwin"
      ? join(homedir(), "Library", "Caches", "ms-playwright")
      : join(homedir(), ".cache", "ms-playwright");
}

const PORT = Number(process.env.PORT ?? 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
const isCI = !!process.env.CI;

type ProjectName = "chromium" | "firefox" | "webkit";
const ALL_PROJECTS: ReadonlyArray<ProjectName> = ["chromium", "firefox", "webkit"];

const DEVICE_BY_PROJECT: Record<ProjectName, keyof typeof devices> = {
  chromium: "Desktop Chrome",
  firefox: "Desktop Firefox",
  webkit: "Desktop Safari",
};

/**
 * Browser selection. The CI workflow runs each engine in its own
 * matrix shard so they parallelise across runners; locally we
 * exercise all three by default. Override examples:
 *   PLAYWRIGHT_BROWSERS=chromium      pnpm test:e2e
 *   PLAYWRIGHT_BROWSERS=firefox,webkit pnpm test:e2e
 *   PLAYWRIGHT_BROWSERS=all            pnpm test:e2e
 */
const browsers: ProjectName[] = (() => {
  const requested = process.env.PLAYWRIGHT_BROWSERS;
  if (!requested || requested.toLowerCase() === "all") return [...ALL_PROJECTS];
  const parsed = requested
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value): value is ProjectName =>
      (ALL_PROJECTS as ReadonlyArray<string>).includes(value),
    );
  return parsed.length > 0 ? parsed : [...ALL_PROJECTS];
})();

/**
 * Web server command. Default is the safe build-then-start. CI can
 * pass `pnpm start` once a `.next` artefact has been downloaded so a
 * matrix of shards does not each rebuild from scratch.
 */
const webServerCommand = process.env.PLAYWRIGHT_WEB_SERVER ?? "pnpm build && pnpm start";

/**
 * Reporter selection.
 * - In CI, default is GitHub annotations plus a static HTML report
 *   per matrix shard.
 * - When PLAYWRIGHT_BLOB_REPORT=1 (used when sharding within a single
 *   browser job), emit the blob format so a downstream merge job can
 *   stitch them into one HTML report.
 * - Locally we use the friendly `list` reporter.
 */
const reporter = isCI
  ? process.env.PLAYWRIGHT_BLOB_REPORT
    ? ([["blob"]] as const)
    : ([["github"], ["html", { open: "never" }]] as const)
  : ("list" as const);

export default defineConfig({
  testDir: "./e2e",
  outputDir: ".playwright/results",

  // Allow tests in the same file to run in parallel. Combined with
  // multiple workers, this gives a small suite a flat tail latency.
  fullyParallel: true,

  // Reject .only commits in CI but allow them when iterating locally.
  forbidOnly: isCI,

  // One retry papers over genuine flakes (e.g. cold-start streaming
  // jitters) without trebling worst-case wall time on a real failure.
  retries: isCI ? 1 : 0,

  // Saturate the runner. Playwright's default is
  // `os.availableParallelism()`, which on GitHub-hosted ubuntu-latest
  // (4 vCPUs) gives 4 workers. The previous `workers: 1` on CI was
  // the single biggest performance hit in this suite.
  //   workers: undefined → Playwright default

  reporter: reporter as unknown as Parameters<typeof defineConfig>[0]["reporter"],

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: browsers.map((name) => ({
    name,
    use: { ...devices[DEVICE_BY_PROJECT[name]] },
  })),

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: webServerCommand,
        url: baseURL,
        timeout: 180_000,
        reuseExistingServer: !isCI,
        stdout: "pipe",
        stderr: "pipe",
      },
});
