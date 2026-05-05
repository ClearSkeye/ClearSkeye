// Stub for the `server-only` package used during unit tests, where there's no
// React Server Component runtime. The real module throws when imported from a
// client/test context, which trips up jsdom-based suites.
export {};
