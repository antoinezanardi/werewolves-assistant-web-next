import { When } from "@cucumber/cucumber";
import { clickOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user mutes the audio in navigation bar$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnRoleWithText(this, "button", "Mute", true);
});

When(/^the user unmutes the audio in navigation bar$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnRoleWithText(this, "button", "Unmute", true);
});