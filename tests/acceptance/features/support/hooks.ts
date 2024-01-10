import { Before } from "@cucumber/cucumber";
import { createPage, setup } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

// eslint-disable-next-line func-names,@typescript-eslint/require-await,prefer-arrow-callback
Before(async function(this: CustomWorld): Promise<void> {
  await setup({ runner: "vitest" });

  this.page = await createPage("/");
});