import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { createFakeCreateGamePlayerRoleDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

function createFakeCreateGamePlayerDto(createPlayerDto: Partial<CreateGamePlayerDto> = {}): CreateGamePlayerDto {
  return plainToInstance(CreateGamePlayerDto, {
    name: createPlayerDto.name ?? faker.person.firstName(),
    role: createFakeCreateGamePlayerRoleDto(createPlayerDto.role),
  }, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
}

export { createFakeCreateGamePlayerDto };