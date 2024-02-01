import { Given } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user is on home page$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.goto(url("/"));
});

Given(/^the user is on about page$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.goto(url("/about"));
});

Given(/^the user is about to open a page on new tab$/u, function(this: CustomWorld): void {
  this.newPagePromise = this.context.waitForEvent("page");
});