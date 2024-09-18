import { expect } from "@playwright/test";
import { Then } from "@cucumber/cucumber";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the changed game options badge should display (?<count>\d+) in the lobby$/u, async function(this: CustomWorld, count: string): Promise<void> {
  const gameOptionsButtonBadge = this.page.getByTestId("changed-game-options-count-badge");

  await expect(gameOptionsButtonBadge).toHaveText(count);
});