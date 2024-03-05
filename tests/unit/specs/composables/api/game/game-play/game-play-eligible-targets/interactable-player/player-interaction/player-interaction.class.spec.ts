import { PlayerInteraction } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.class";

describe("Player Interaction", () => {
  describe("create", () => {
    it("should create a player interaction when called.", () => {
      const createdPlayerInteraction = PlayerInteraction.create({
        source: "sheriff",
        type: "eat",
        extra: "Extra",
      } as PlayerInteraction);
      const expectedPlayerInteraction = new PlayerInteraction();
      expectedPlayerInteraction.source = "sheriff";
      expectedPlayerInteraction.type = "eat";

      expect(createdPlayerInteraction).toStrictEqual<PlayerInteraction>(expectedPlayerInteraction);
    });
  });
});