import { plainToInstance } from "class-transformer";

import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

function createFakeCreateGameDto(createGameDto: Partial<CreateGameDto> = {}): CreateGameDto {
  return plainToInstance(CreateGameDto, {
    players: createGameDto.players ?? [],
    additionalCards: createGameDto.additionalCards ?? undefined,
  }, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
}

export { createFakeCreateGameDto };