import { Then } from "@cucumber/cucumber";

import { expectTooltipWithTextToBeHidden, expectTooltipWithTextToBeVisible } from "@tests/acceptance/features/playwright/helpers/tooltips/playwright-tooltips.then-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the tooltip with text "(?<text>.+)" should be visible$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expectTooltipWithTextToBeVisible(this, name, true);
});

Then(/^the tooltip with text "(?<text>.+)" should be hidden$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expectTooltipWithTextToBeHidden(this, name, true);
});