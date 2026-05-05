import { describe, expect, it } from "vitest";

import { isTheme, THEMES } from "./theme";

describe("theme helpers", () => {
  it("exposes the three supported themes", () => {
    expect(THEMES).toEqual(["light", "dark", "system"]);
  });

  it("isTheme accepts only known values", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("system")).toBe(true);
  });

  it("isTheme rejects everything else", () => {
    for (const value of ["", "auto", "LIGHT", null, undefined, 1, {}, []]) {
      expect(isTheme(value)).toBe(false);
    }
  });
});
