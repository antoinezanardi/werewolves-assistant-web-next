import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";

async function setAdditionalCardsForRecipientInAdditionalCardsManager(world: CustomWorld, recipient: GameAdditionalCardRecipientRoleName, additionalCardRoleNames: string[]):
Promise<void> {
  const additionalCardsButton = world.page.getByTestId(`recipient-role-additional-cards-multi-select-${recipient}`);
  await additionalCardsButton.locator("div").nth(1).click();
  for (const roleName of additionalCardRoleNames) {
    await world.page.getByLabel(roleName).getByRole("checkbox").check();
  }
  await additionalCardsButton.blur();
}

export {
  setAdditionalCardsForRecipientInAdditionalCardsManager,
};