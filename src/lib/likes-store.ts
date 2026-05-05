import "server-only";

/**
 * In-memory like counter — fine for a demo. Swap for KV / a DB in production.
 * The Symbol.for() trick survives Hot Module Reloads in dev.
 */
const STORE_SYMBOL = Symbol.for("clearskeye.likes-store");

type Store = { count: number };

const globalStore = globalThis as typeof globalThis & {
  [STORE_SYMBOL]?: Store;
};

const store: Store = (globalStore[STORE_SYMBOL] ??= { count: 42 });

export async function getLikes(): Promise<number> {
  return store.count;
}

export async function bumpLikes(delta = 1): Promise<number> {
  // Simulate latency so the optimistic UI is visible.
  await new Promise((resolve) => setTimeout(resolve, 350));
  store.count += delta;
  return store.count;
}
