import { GamePlayEligibleTargets } from "~/composables/api/game/types/game-play/game-play-eligible-targets/game-play-eligible-targets.class";
import { createFakeGamePlayEligibleTargetsBoundaries } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/game-play-eligible-targets-boundaries/game-play-eligible-targets-boundaries.factory";
import { createFakeInteractablePlayer } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/interactable-player.factory";

describe("Game Play Eligible Targets", () => {
  describe("create", () => {
    it("should create a game play eligible targets when called.", () => {
      const interactablePlayers = [createFakeInteractablePlayer()];
      const boundaries = createFakeGamePlayEligibleTargetsBoundaries();
      const createdGamePlayEligibleTargets = GamePlayEligibleTargets.create({
        interactablePlayers,
        boundaries,
        extra: "Extra",
      } as GamePlayEligibleTargets);
      const expectedGamePlayEligibleTargets = new GamePlayEligibleTargets();
      expectedGamePlayEligibleTargets.interactablePlayers = interactablePlayers;
      expectedGamePlayEligibleTargets.boundaries = boundaries;

      expect(createdGamePlayEligibleTargets).toStrictEqual<GamePlayEligibleTargets>(expectedGamePlayEligibleTargets);
    });
  });
});