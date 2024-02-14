import { plainToInstance } from "class-transformer";

import { CreateGamePlayerSideDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-side.dto";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

function createFakeCreateGamePlayerSideDto(createGamePlayerSideDto: Partial<CreateGamePlayerSideDto> = {}): CreateGamePlayerSideDto {
  return plainToInstance(CreateGamePlayerSideDto, {
    original: createGamePlayerSideDto.original ?? undefined,
    current: createGamePlayerSideDto.current ?? undefined,
  }, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
}

export { createFakeCreateGamePlayerSideDto };