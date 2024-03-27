import { Given } from "@cucumber/cucumber";

import { goOnPage } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user is on (?<page>.+) page$/u, async function(this: CustomWorld, page: string): Promise<void> {
  const pageName = page === "home" ? "" : page;
  await goOnPage(this, pageName);
});

Given(/^the user is about to open a page on new tab$/u, function(this: CustomWorld): void {
  this.newPagePromise = this.context.waitForEvent("page");
});