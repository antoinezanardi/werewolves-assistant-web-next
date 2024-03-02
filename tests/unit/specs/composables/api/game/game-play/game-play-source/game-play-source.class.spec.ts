import { GamePlaySource } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game Play Source Class", () => {
  describe("create", () => {
    it("should create a game play source when called.", () => {
      const players = [
        createFakePlayer(),
        createFakePlayer(),
        createFakePlayer(),
      ];
      const createdGamePlaySource = GamePlaySource.create({
        name: "sheriff",
        players,
        extra: "Extra",
      } as GamePlaySource);
      const expectedGamePlaySource = new GamePlaySource();
      expectedGamePlaySource.name = "sheriff";
      expectedGamePlaySource.players = players;

      expect(createdGamePlaySource).toStrictEqual<GamePlaySource>(expectedGamePlaySource);
    });
  });
});