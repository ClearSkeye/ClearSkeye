import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("opens with the conviction in the hero", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/ClearSkeye/);

    // The brand-approved homepage opener. The h1 carries the
    // conviction sentence; we match the second beat of it so that
    // the assertion is robust to wrapping or punctuation tweaks.
    await expect(
      page.getByRole("heading", { level: 1, name: /ClearSkeye reverses the order/i }),
    ).toBeVisible();
  });

  test("names the four word method", async ({ page }) => {
    await page.goto("/");

    // Purpose. Sight. Design. Practice. is the practice's signature.
    // The homepage section heading sets it as the editorial line.
    await expect(
      page.getByRole("heading", { level: 2, name: /Purpose\.\s*Sight\.\s*Design\.\s*Practice\./i }),
    ).toBeVisible();

    for (const step of ["Purpose.", "Sight.", "Design.", "Practice."] as const) {
      await expect(page.getByRole("heading", { level: 3, name: step })).toBeVisible();
    }
  });

  test("the footer carries the tagline and method line", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText("Sight before design.")).toBeVisible();
    await expect(footer.getByText("Purpose. Sight. Design. Practice.")).toBeVisible();
  });

  test("the contact form echoes a submitted note", async ({ page }) => {
    await page.goto("/");

    const message = page.getByLabel("Your note");
    await expect(message).toBeVisible();
    await message.fill("hello from the test runner");

    await page.getByRole("button", { name: /^Send the note$/i }).click();

    // The ping server action echoes the trimmed message back. We
    // assert on the affirm copy without binding to the exact
    // millisecond timing.
    const status = page.getByRole("status");
    await expect(status).toContainText(/Received/i);
    await expect(status).toContainText("hello from the test runner");
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
