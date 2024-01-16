import type { UseFetchOptions } from "#app";

const DEFAULT_USE_FETCH_OPTIONS = { headers: { "Content-Type": "application/json" } } satisfies UseFetchOptions<unknown>;

export { DEFAULT_USE_FETCH_OPTIONS };