import { CreateGamePlayerSideDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-side.dto";

function createFakeCreateGamePlayerSideDto(createGamePlayerSideDto: Partial<CreateGamePlayerSideDto> = {}): CreateGamePlayerSideDto {
  return CreateGamePlayerSideDto.create({
    original: createGamePlayerSideDto.original ?? undefined,
    current: createGamePlayerSideDto.current ?? undefined,
  });
}

export { createFakeCreateGamePlayerSideDto };