import { Before } from "@cucumber/cucumber";
import { createPage, setup } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Before(async function(this: CustomWorld): Promise<void> {
  await setup({ runner: "vitest" });

  this.page = await createPage("/");
});