import { GameVictory } from "~/composables/api/game/types/game-victory/game-victory.class";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game Victory Class", () => {
  describe("create", () => {
    it("should create a game victory when called.", () => {
      const winners = [
        createFakePlayer(),
        createFakePlayer(),
      ];
      const createdGameVictory = GameVictory.create({
        type: "werewolves",
        winners,
        extra: "Extra",
      } as GameVictory);
      const expectedGameVictory = new GameVictory();
      expectedGameVictory.type = "werewolves";
      expectedGameVictory.winners = winners;

      expect(createdGameVictory).toStrictEqual<GameVictory>(expectedGameVictory);
    });
  });
});