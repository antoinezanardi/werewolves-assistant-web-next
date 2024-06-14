import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";

function createFakeCreateGameDto(createGameDto: Partial<CreateGameDto> = {}): CreateGameDto {
  return CreateGameDto.create({
    players: createGameDto.players ?? [],
    additionalCards: createGameDto.additionalCards ?? undefined,
    options: createFakeGameOptions(createGameDto.options),
  });
}

export { createFakeCreateGameDto };