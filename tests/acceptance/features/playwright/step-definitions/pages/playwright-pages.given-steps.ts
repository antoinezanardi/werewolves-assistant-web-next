import { Given } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user is on (?<page>.+) page$/u, async function(this: CustomWorld, page: string): Promise<void> {
  const pageName = page === "home" ? "" : page;
  await this.page.goto(url(`/${pageName}`));
  await this.page.waitForLoadState("networkidle");
});

Given(/^the user is about to open a page on new tab$/u, function(this: CustomWorld): void {
  this.newPagePromise = this.context.waitForEvent("page");
});