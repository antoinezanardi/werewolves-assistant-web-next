import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";

describe("Create Game Dto", () => {
  describe("create", () => {
    it("should create a game when called.", () => {
      const players = [
        createFakeCreateGamePlayerDto({
          name: "Player 1",
          role: { name: "werewolf" },
        }),
      ];
      const options = createFakeGameOptions();
      const createGameDto = CreateGameDto.create({
        players,
        options,
        extra: "Extra",
      } as CreateGameDto);
      const expectedCreateGameDto = new CreateGameDto();
      expectedCreateGameDto.players = players;
      expectedCreateGameDto.options = options;

      expect(createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });
  });
});