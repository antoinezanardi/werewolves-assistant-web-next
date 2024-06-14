import { When } from "@cucumber/cucumber";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user clicks on the top left corner of the screen$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.mouse.click(0, 0);
});