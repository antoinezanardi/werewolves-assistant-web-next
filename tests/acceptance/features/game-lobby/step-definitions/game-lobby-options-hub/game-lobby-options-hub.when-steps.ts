import { When } from "@cucumber/cucumber";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user hovers the changed game options badge in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  const gameOptionsButtonBadge = this.page.getByTestId("changed-game-options-count-badge");
  await gameOptionsButtonBadge.hover();
});