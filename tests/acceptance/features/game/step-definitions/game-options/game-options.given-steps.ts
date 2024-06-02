import { Given } from "@cucumber/cucumber";
import { closeDialogWithHeaderButton } from "~/tests/acceptance/features/playwright/helpers/dialogs/playwright-dialogs.when-steps-helpers";
import { goOnPage } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import { clickOnRoleWithText } from "~/tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user disables the sheriff in game options$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game-lobby");
  await clickOnRoleWithText(this, "button", "Game options");
  const isSheriffEnabledSwitch = this.page.locator("#game-lobby-options-hub-roles-tab-sheriff-is-sheriff-enabled-input").getByRole("switch");
  await isSheriffEnabledSwitch.uncheck();
  await closeDialogWithHeaderButton(this);
});