import { createPinia, setActivePinia } from "pinia";

import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

describe("Create Game Dto Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const createGameDtoStore = useCreateGameDtoStore();
    const expectedCreateGameDto = createFakeCreateGameDto();

    expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
  });

  describe("setCreateGameDto", () => {
    it("should set createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
        ],
      });

      createGameDtoStore.setCreateGameDto(expectedCreateGameDto);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });
  });

  describe("addPlayerToCreateGameDto", () => {
    it("should add player to createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const player = createFakeCreateGamePlayerDto();
      const expectedCreateGameDto = createFakeCreateGameDto({ players: [player] });

      createGameDtoStore.addPlayerToCreateGameDto(player);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });
  });

  describe("removePlayerFromCreateGameDto", () => {
    it("should remove player from createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ name: "player1" }),
        createFakeCreateGamePlayerDto({ name: "player2" }),
        createFakeCreateGamePlayerDto({ name: "player3" }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [
          players[0],
          players[2],
        ],
      });
      createGameDtoStore.removePlayerFromCreateGameDto(players[1].name);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });

    it("should not remove player from createGameDto when player not found.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ name: "player1" }),
        createFakeCreateGamePlayerDto({ name: "player2" }),
        createFakeCreateGamePlayerDto({ name: "player3" }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const expectedCreateGameDto = createFakeCreateGameDto({ players });

      createGameDtoStore.removePlayerFromCreateGameDto("player4");

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });
  });
});