import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders the hero, stack grid, and footer", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/ClearSkeye/);

    await expect(page.getByRole("heading", { level: 1, name: /shipped to/i })).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: /Pinned to the absolute latest/i }),
    ).toBeVisible();

    await expect(page.getByRole("contentinfo").getByText(/built with Next\.js 16/i)).toBeVisible();
  });

  test("the streamed Suspense card eventually renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Rendered at \(UTC\)/i, { exact: false })).toBeVisible({
      timeout: 10_000,
    });
  });

  test("the like button optimistically increments", async ({ page }) => {
    await page.goto("/");
    const like = page.getByRole("button", { name: /^Like —/i });
    await expect(like).toBeVisible();
    const before = Number(await like.locator("span.font-mono").innerText());
    await like.click();
    await expect(like.locator("span.font-mono")).toHaveText(String(before + 1));
  });
});

test.describe("API routes", () => {
  test("/api/health responds with status: ok", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(typeof body.uptime).toBe("number");
    expect(body.timestamp).toMatch(/T.*Z$/);
  });
});

test("the proxy adds x-request-id to every response", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-request-id"]).toBeTruthy();
});
