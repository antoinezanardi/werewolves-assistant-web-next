import { Then } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the user should be on game page with any id$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.waitForURL(url(`/game/*`));
});