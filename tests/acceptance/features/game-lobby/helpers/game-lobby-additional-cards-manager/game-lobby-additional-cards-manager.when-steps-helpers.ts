import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";
import type { RoleName } from "~/composables/api/role/types/role.types";

async function setAdditionalCardsForRecipientInAdditionalCardsManager(world: CustomWorld, recipient: GameAdditionalCardRecipientRoleName, additionalCardRoleNames: RoleName[]):
Promise<void> {
  const additionalCardsButton = world.page.getByTestId(`recipient-role-additional-cards-multi-select-${recipient}`);
  await additionalCardsButton.locator("div").nth(1).click();
  for (const roleName of additionalCardRoleNames) {
    const lowerRoleName = roleName.toLowerCase();
    await world.page.getByTestId(`recipient-role-additional-cards-multi-select-option-${lowerRoleName}-for-${recipient}`).click();
  }
  await additionalCardsButton.blur();
}

export {
  setAdditionalCardsForRecipientInAdditionalCardsManager,
};