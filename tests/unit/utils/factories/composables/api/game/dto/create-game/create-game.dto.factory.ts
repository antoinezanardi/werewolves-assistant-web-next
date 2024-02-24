import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";

function createFakeCreateGameDto(createGameDto: Partial<CreateGameDto> = {}): CreateGameDto {
  return CreateGameDto.create({
    players: createGameDto.players ?? [],
    additionalCards: createGameDto.additionalCards ?? undefined,
  });
}

export { createFakeCreateGameDto };