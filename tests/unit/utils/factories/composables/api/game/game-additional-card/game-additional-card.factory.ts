import { faker } from "@faker-js/faker";

import { GAME_ADDITIONAL_CARDS_RECIPIENTS } from "~/composables/api/game/constants/game-additional-card/game-additional-card.constants";
import { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import { ROLE_NAMES } from "~/composables/api/role/constants/role.constants";

function createFakeGameAdditionalCard(gameAdditionalCard: Partial<GameAdditionalCard> = {}): GameAdditionalCard {
  return GameAdditionalCard.create({
    _id: gameAdditionalCard._id ?? faker.string.uuid(),
    roleName: gameAdditionalCard.roleName ?? faker.helpers.arrayElement(ROLE_NAMES),
    recipient: gameAdditionalCard.recipient ?? faker.helpers.arrayElement(GAME_ADDITIONAL_CARDS_RECIPIENTS),
    isUsed: gameAdditionalCard.isUsed ?? faker.datatype.boolean(),
  });
}

export { createFakeGameAdditionalCard };