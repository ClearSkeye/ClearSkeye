import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StackGrid } from "./stack-grid";

describe("<StackGrid />", () => {
  it("renders the full stack list with names, versions, and links", () => {
    render(<StackGrid />);

    const expected = [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Turbopack",
      "Vercel",
    ] as const;

    for (const name of expected) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(expected.length);
    for (const link of links) {
      expect(link).toHaveAttribute("href", expect.stringMatching(/^https?:\/\//));
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    }
  });
});
