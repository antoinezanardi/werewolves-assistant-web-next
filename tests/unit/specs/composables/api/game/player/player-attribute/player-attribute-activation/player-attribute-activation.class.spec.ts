import { PlayerAttributeActivation } from "~/composables/api/game/types/players/player-attribute/player-attribute-activation/player-attribute-activation.class";

describe("Player Attribute Activation Class", () => {
  describe("create", () => {
    it("should create a player attribute activation when called.", () => {
      const createdPlayerAttributeActivation = PlayerAttributeActivation.create({
        turn: 5,
        phase: "night",
        extra: "Extra",
      } as PlayerAttributeActivation);
      const expectedPlayerAttributeActivation = new PlayerAttributeActivation();
      expectedPlayerAttributeActivation.turn = 5;
      expectedPlayerAttributeActivation.phase = "night";

      expect(createdPlayerAttributeActivation).toStrictEqual<PlayerAttributeActivation>(expectedPlayerAttributeActivation);
    });
  });
});