import { type DataTable, When } from "@cucumber/cucumber";
import { setAdditionalCardsForRecipientInAdditionalCardsManager } from "@tests/acceptance/features/game-lobby/helpers/game-lobby-additional-cards-manager/game-lobby-additional-cards-manager.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";
import type { RoleName } from "~/composables/api/role/types/role.types";

When(/^the user sets the following additional cards for "(?<recipient>actor|thief)" in additional cards manager$/u, async function(
  this: CustomWorld,
  recipient: GameAdditionalCardRecipientRoleName,
  additionalCards: DataTable,
): Promise<void> {
  const additionalCardsData = additionalCards.rows();
  const additionalCardsRoleNames = additionalCardsData.map(row => row[0]) as RoleName[];
  await setAdditionalCardsForRecipientInAdditionalCardsManager(this, recipient, additionalCardsRoleNames);
});