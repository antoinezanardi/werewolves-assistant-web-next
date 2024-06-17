import { When } from "@cucumber/cucumber";
import { skipGameEvent } from "@tests/acceptance/features/game/helpers/game-event/game-event.when-steps-helpers";
import { clickOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user skips all game events$/u, async function(this: CustomWorld): Promise<void> {
  let skipEventButton = this.page.getByRole("button", { name: "Skip" });
  await skipEventButton.waitFor({ state: "visible" });
  let isSkipButtonVisible = true;

  while (isSkipButtonVisible) {
    await skipGameEvent(this, true);
    skipEventButton = this.page.getByRole("button", { name: "Skip" });
    if (await skipEventButton.isHidden()) {
      return;
    }
    isSkipButtonVisible = await skipEventButton.isVisible();
  }
});

When(/^the user skips the game event$/u, async function(this: CustomWorld): Promise<void> {
  const skipEventButton = this.page.getByRole("button", { name: "Skip" });
  await skipEventButton.waitFor({ state: "visible" });
  await skipGameEvent(this);
});

When(/^the user goes to the next game event text$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnRoleWithText(this, "button", "Next event text");
});