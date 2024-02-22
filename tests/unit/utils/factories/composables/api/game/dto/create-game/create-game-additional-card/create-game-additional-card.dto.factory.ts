import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { GAME_ADDITIONAL_CARDS_RECIPIENTS } from "~/composables/api/game/constants/game-additional-card/game-additional-card.constants";
import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

function createFakeCreateGameAdditionalCardDto(createGameAdditionalCardDto: Partial<CreateGameAdditionalCardDto> = {}): CreateGameAdditionalCardDto {
  return plainToInstance(CreateGameAdditionalCardDto, {
    roleName: createGameAdditionalCardDto.roleName ?? faker.helpers.arrayElement(Object.values(RoleNames)),
    recipient: createGameAdditionalCardDto.recipient ?? faker.helpers.arrayElement(Object.values(GAME_ADDITIONAL_CARDS_RECIPIENTS)),
  }, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
}

export { createFakeCreateGameAdditionalCardDto };