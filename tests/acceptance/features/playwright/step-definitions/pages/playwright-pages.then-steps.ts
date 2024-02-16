import { Then } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";
import { expect } from "@playwright/test";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the user should be on (?<page>.+) page$/u, async function(this: CustomWorld, page: string): Promise<void> {
  const pageName = page === "home" ? "" : page;
  await this.page.waitForURL(url(`/${pageName}`));
});

Then(/^a new page should be opened with url "(?<url>.+)"$/u, async function(this: CustomWorld, fullUrl: string): Promise<void> {
  const newPage = await this.newPagePromise;

  expect(newPage.url()).toBe(fullUrl);
});