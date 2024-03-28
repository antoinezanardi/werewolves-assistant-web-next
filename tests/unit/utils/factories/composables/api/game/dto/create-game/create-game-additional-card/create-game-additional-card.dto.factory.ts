import { faker } from "@faker-js/faker";

import { GAME_ADDITIONAL_CARDS_RECIPIENTS } from "~/composables/api/game/constants/game-additional-card/game-additional-card.constants";
import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { ROLE_NAMES } from "~/composables/api/role/constants/role.constants";

function createFakeCreateGameAdditionalCardDto(createGameAdditionalCardDto: Partial<CreateGameAdditionalCardDto> = {}): CreateGameAdditionalCardDto {
  return CreateGameAdditionalCardDto.create({
    roleName: createGameAdditionalCardDto.roleName ?? faker.helpers.arrayElement(ROLE_NAMES),
    recipient: createGameAdditionalCardDto.recipient ?? faker.helpers.arrayElement(GAME_ADDITIONAL_CARDS_RECIPIENTS),
  });
}

export { createFakeCreateGameAdditionalCardDto };