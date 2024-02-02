import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { CreateGamePlayerRoleDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-role.dto";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

function createFakeCreateGamePlayerRoleDto(createGamePlayerRoleDto: Partial<CreateGamePlayerRoleDto> = {}): CreateGamePlayerRoleDto {
  const randomRoleName = faker.helpers.arrayElement(Object.values(RoleNames));

  return plainToInstance(CreateGamePlayerRoleDto, { name: createGamePlayerRoleDto.name ?? randomRoleName }, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
}

export { createFakeCreateGamePlayerRoleDto };