import { Given } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user goes on the home page$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.goto(url("/"));
});