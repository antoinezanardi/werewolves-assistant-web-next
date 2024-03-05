import { InteractablePlayer } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/interactable-player.class";
import { createFakePlayerInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.factory";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Interactable Player", () => {
  describe("create", () => {
    it("should create an interactable player when called.", () => {
      const interactions = [
        createFakePlayerInteraction(),
        createFakePlayerInteraction(),
        createFakePlayerInteraction(),
      ];
      const player = createFakePlayer();
      const createdInteractablePlayer = InteractablePlayer.create({
        interactions,
        player,
        extra: "Extra",
      } as InteractablePlayer);
      const expectedInteractablePlayer = new InteractablePlayer();
      expectedInteractablePlayer.interactions = interactions;
      expectedInteractablePlayer.player = player;

      expect(createdInteractablePlayer).toStrictEqual<InteractablePlayer>(expectedInteractablePlayer);
    });
  });
});