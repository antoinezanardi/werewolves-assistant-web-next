import { CreateGamePlayerRoleDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-role.dto";

function createFakeCreateGamePlayerRoleDto(createGamePlayerRoleDto: Partial<CreateGamePlayerRoleDto> = {}): CreateGamePlayerRoleDto {
  return CreateGamePlayerRoleDto.create({ name: createGamePlayerRoleDto.name ?? undefined });
}

export { createFakeCreateGamePlayerRoleDto };