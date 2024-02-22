import type { Page } from "playwright-core";

type LocatorRole = Parameters<Page["getByRole"]>[0];

export type { LocatorRole };