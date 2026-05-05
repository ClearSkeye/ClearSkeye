import { describe, expect, it } from "vitest";

import { ping } from "./actions";

function buildFormData(message: string | null) {
  const fd = new FormData();
  if (message !== null) fd.set("message", message);
  return fd;
}

describe("ping server action", () => {
  it("echoes a valid message and reports timing", async () => {
    const result = await ping({ status: "idle" }, buildFormData("hello world"));

    expect(result.status).toBe("ok");
    if (result.status !== "ok") return;
    expect(result.echoed).toBe("hello world");
    expect(result.tookMs).toBeGreaterThanOrEqual(0);
    expect(result.handledBy).toMatch(/^Node /);
  });

  it("trims whitespace before validating", async () => {
    const result = await ping({ status: "idle" }, buildFormData("   hi   "));
    expect(result.status).toBe("ok");
    if (result.status === "ok") expect(result.echoed).toBe("hi");
  });

  it("rejects empty messages", async () => {
    const result = await ping({ status: "idle" }, buildFormData("   "));
    expect(result).toEqual(expect.objectContaining({ status: "error", code: "400" }));
  });

  it("rejects messages over 120 characters", async () => {
    const result = await ping({ status: "idle" }, buildFormData("x".repeat(121)));
    expect(result).toEqual(expect.objectContaining({ status: "error", code: "400" }));
  });

  it("rejects missing input", async () => {
    const result = await ping({ status: "idle" }, buildFormData(null));
    expect(result.status).toBe("error");
  });
});
