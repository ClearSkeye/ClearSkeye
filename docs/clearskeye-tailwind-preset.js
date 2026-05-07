/**
 * ClearSkeye Tailwind preset
 * Version 1.0
 * Sight before design.
 *
 * Usage:
 *   // tailwind.config.js
 *   const clearskeye = require('./clearskeye-tailwind-preset');
 *   module.exports = {
 *     presets: [clearskeye],
 *     content: ['./src/**\/*.{html,jsx,tsx,vue,svelte}'],
 *   };
 *
 * The preset disables Tailwind's default colour, font and spacing
 * scales so that only ClearSkeye tokens are available. This is
 * deliberate; it prevents drift. If a value you need is not here,
 * raise it in review and update this file in the same change.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // Replace, do not extend. Forces all design decisions through tokens.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",

      // Primary palette
      ink: "#0F1E2A",
      meridian: "#1E3340",
      sightline: "#6E7C85",
      horizon: "#C9A35B",
      paper: "#F4F0E8",
      "paper-light": "#FAF8F2",
      rule: "#D8D2C4",
      white: "#FFFFFF",

      // Functional, digital only
      affirm: "#4F7A5F",
      caution: "#B8924A",
      halt: "#8B3A3A",
    },

    fontFamily: {
      serif: ['"Tiempos Headline"', '"Spectral"', "Georgia", "serif"],
      sans: ['"Söhne"', '"Inter"', "system-ui", "-apple-system", "sans-serif"],
      mono: ['"Söhne Mono"', '"JetBrains Mono"', '"IBM Plex Mono"', "Consolas", "monospace"],
    },

    fontWeight: {
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
    },

    // Type scale: [size, { lineHeight, letterSpacing }]
    fontSize: {
      "display-1": ["4.0rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      "display-2": ["3.0rem", { lineHeight: "1.10", letterSpacing: "-0.02em" }],
      "heading-1": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      "heading-2": ["1.75rem", { lineHeight: "1.20", letterSpacing: "-0.01em" }],
      "heading-3": ["1.375rem", { lineHeight: "1.30", letterSpacing: "0" }],
      "body-large": ["1.125rem", { lineHeight: "1.60", letterSpacing: "0" }],
      body: ["1.0rem", { lineHeight: "1.65", letterSpacing: "0" }],
      small: ["0.875rem", { lineHeight: "1.55", letterSpacing: "0" }],
      mono: ["0.875rem", { lineHeight: "1.55", letterSpacing: "0" }],
      eyebrow: ["0.875rem", { lineHeight: "1.55", letterSpacing: "0.10em" }],
    },

    // Eight point spacing scale. Indexes match design token names (cs-space-1 etc).
    spacing: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "48px",
      7: "64px",
      8: "96px",
      9: "128px",
      px: "1px",
    },

    // Layout maxima
    maxWidth: {
      none: "none",
      reading: "720px",
      content: "1280px",
      full: "100%",
    },

    borderRadius: {
      none: "0px",
      xs: "2px",
      sm: "4px",
      md: "8px",
    },

    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      1: "1px",
      2: "2px",
    },

    boxShadow: {
      none: "none",
      // The brand uses shadows almost never. The single allowed value is
      // a near invisible hairline used for inputs and cards on bright surfaces.
      hairline: "0 1px 0 rgba(15, 30, 42, 0.05)",
    },

    transitionDuration: {
      DEFAULT: "400ms",
      calm: "400ms",
      slower: "600ms",
    },

    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.20, 0.00, 0.00, 1.00)",
      calm: "cubic-bezier(0.20, 0.00, 0.00, 1.00)",
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    extend: {
      // Reusable component classes can be composed via @apply.
      keyframes: {
        "cs-rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "cs-rise": "cs-rise 400ms cubic-bezier(0.20, 0.00, 0.00, 1.00) both",
      },
    },
  },

  plugins: [
    // Component recipes that match the canonical design system.
    // Authors should prefer these classes over re-implementing the same
    // patterns with utilities, so that visual drift cannot accumulate.
    function ({ addComponents, theme }) {
      addComponents({
        ".btn-primary": {
          display: "inline-block",
          padding: `${theme("spacing.4")} ${theme("spacing.5")}`,
          backgroundColor: theme("colors.ink"),
          color: theme("colors.paper"),
          fontFamily: theme("fontFamily.sans").join(", "),
          fontWeight: theme("fontWeight.semibold"),
          fontSize: theme("fontSize.body[0]"),
          borderRadius: theme("borderRadius.sm"),
          textDecoration: "none",
          cursor: "pointer",
          transition: "background-color 400ms cubic-bezier(0.20, 0.00, 0.00, 1.00)",
          "&:hover": { backgroundColor: theme("colors.meridian") },
          "&:focus-visible": {
            outline: `2px solid ${theme("colors.horizon")}`,
            outlineOffset: "2px",
          },
        },
        ".btn-secondary": {
          display: "inline-block",
          padding: `${theme("spacing.3")} 0`,
          background: "none",
          color: theme("colors.ink"),
          fontFamily: theme("fontFamily.sans").join(", "),
          fontSize: theme("fontSize.body[0]"),
          borderBottom: `1px solid ${theme("colors.ink")}`,
          textDecoration: "none",
          cursor: "pointer",
          "&:hover": { borderBottomWidth: "2px" },
        },
        ".link": {
          color: theme("colors.ink"),
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textUnderlineOffset: "4px",
          "&:hover": { textDecorationThickness: "2px" },
        },
        ".input": {
          display: "block",
          width: "100%",
          padding: `${theme("spacing.3")} ${theme("spacing.3")}`,
          backgroundColor: theme("colors.white"),
          color: theme("colors.ink"),
          fontFamily: theme("fontFamily.sans").join(", "),
          fontSize: theme("fontSize.body[0]"),
          border: `1px solid ${theme("colors.rule")}`,
          borderRadius: theme("borderRadius.xs"),
          "&:focus": {
            outline: "none",
            borderColor: theme("colors.ink"),
            borderWidth: "2px",
          },
        },
        ".eyebrow": {
          fontFamily: theme("fontFamily.sans").join(", "),
          fontSize: theme("fontSize.eyebrow[0]"),
          letterSpacing: theme("fontSize.eyebrow[1].letterSpacing"),
          textTransform: "uppercase",
          fontWeight: theme("fontWeight.semibold"),
          color: theme("colors.sightline"),
        },
        ".lead": {
          fontFamily: theme("fontFamily.serif").join(", "),
          fontSize: theme("fontSize.heading-3[0]"),
          lineHeight: "1.5",
          color: theme("colors.ink"),
        },
        ".reading-column": {
          maxWidth: theme("maxWidth.reading"),
        },
        ".container-cs": {
          width: "100%",
          maxWidth: theme("maxWidth.content"),
          marginInline: "auto",
          paddingInline: theme("spacing.4"),
          "@screen md": { paddingInline: theme("spacing.6") },
          "@screen lg": { paddingInline: theme("spacing.8") },
        },
      });
    },
  ],
};
