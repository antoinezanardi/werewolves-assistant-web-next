import { plainToInstance } from "class-transformer";

import { CreateGamePlayerRoleDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-role.dto";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

function createFakeCreateGamePlayerRoleDto(createGamePlayerRoleDto: Partial<CreateGamePlayerRoleDto> = {}): CreateGamePlayerRoleDto {
  return plainToInstance(CreateGamePlayerRoleDto, { name: createGamePlayerRoleDto.name ?? undefined }, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
}

export { createFakeCreateGamePlayerRoleDto };