import { When } from "@cucumber/cucumber";
import { waitForPageLoadStates } from "@tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user clicks on the top left corner of the screen$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.mouse.click(0, 0);
});

When(/^the user reloads the page$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.reload();
  await waitForPageLoadStates(this);
});