import { When } from "@cucumber/cucumber";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user presses the escape key$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.keyboard.press("Escape");
});