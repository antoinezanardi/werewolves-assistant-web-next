import { When } from "@cucumber/cucumber";
import { clickOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user creates a new game with same players in game over$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnRoleWithText(this, "button", "Create another game");
  const confirmSamePlayersAlertDialog = this.page.getByRole("alertdialog");
  await clickOnRoleWithText(confirmSamePlayersAlertDialog, "button", "Yes");
});

When(/^the user creates a new game with new players in game over$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnRoleWithText(this, "button", "Create another game");
  const confirmSamePlayersAlertDialog = this.page.getByRole("alertdialog");
  await clickOnRoleWithText(confirmSamePlayersAlertDialog, "button", "No");
});