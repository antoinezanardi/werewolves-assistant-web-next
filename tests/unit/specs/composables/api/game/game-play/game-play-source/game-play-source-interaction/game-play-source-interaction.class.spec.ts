import { GamePlaySourceInteraction } from "~/composables/api/game/types/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Game Play Source Interaction Class", () => {
  describe("create", () => {
    it("should create a game play source interaction when called.", () => {
      const eligibleTargets = [
        createFakePlayer(),
        createFakePlayer(),
        createFakePlayer(),
      ];
      const createdGamePlaySourceInteraction = GamePlaySourceInteraction.create({
        type: "steal-role",
        source: "devoted-servant",
        eligibleTargets,
        boundaries: {
          min: 1,
          max: 1,
        },
        extra: "Extra",
      } as GamePlaySourceInteraction);
      const expectedGamePlaySourceInteraction = new GamePlaySourceInteraction();
      expectedGamePlaySourceInteraction.source = "devoted-servant";
      expectedGamePlaySourceInteraction.type = "steal-role";
      expectedGamePlaySourceInteraction.eligibleTargets = eligibleTargets;
      expectedGamePlaySourceInteraction.boundaries = {
        min: 1,
        max: 1,
      };

      expect(createdGamePlaySourceInteraction).toStrictEqual<GamePlaySourceInteraction>(expectedGamePlaySourceInteraction);
    });
  });
});