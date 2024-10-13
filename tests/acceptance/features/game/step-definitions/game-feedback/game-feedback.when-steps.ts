import { When } from "@cucumber/cucumber";

import { fillInputWithLabel } from "@tests/acceptance/features/playwright/helpers/inputs/playwright-inputs.when-steps-helpers";
import { clickOnLabel } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user sets rating's score to (?<score>[12345]) in game feedback submitter$/u, async function(this: CustomWorld, score: string): Promise<void> {
  const ratingIndex = parseInt(score) - 1;
  await this.page.locator("div").filter({ hasText: /^What is your rating for this game\?/u }).locator("svg").nth(ratingIndex).click();
});

When(/^the user sets that the game has encountered an error in game feedback submitter$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnLabel(this, "Was everything all right during the game?");
});

When(/^the user sets the review to "(?<text>.+?)" in game feedback submitter$/u, async function(this: CustomWorld, text: string): Promise<void> {
  const label = "This is optional but will help us a lot to improve the Werewolves Assistant";
  await fillInputWithLabel(this, label, text, true);
});