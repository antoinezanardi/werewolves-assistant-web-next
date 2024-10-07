import { When } from "@cucumber/cucumber";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user moves his mouse away$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.mouse.move(-1, -1);
});