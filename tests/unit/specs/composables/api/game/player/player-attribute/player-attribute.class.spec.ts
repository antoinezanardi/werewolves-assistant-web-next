import { PlayerAttribute } from "~/composables/api/game/types/players/player-attribute/player-attribute.class";
import { createFakePlayerAttributeActivation } from "@tests/unit/utils/factories/composables/api/game/player/player-attribute/player-attribute-activation/player-attribute-activation.factory";

describe("Player Attribute Class", () => {
  describe("create", () => {
    it("should create a player attribute when called.", () => {
      const activeAt = createFakePlayerAttributeActivation();
      const createdPlayerAttribute = PlayerAttribute.create({
        name: "sheriff",
        source: "werewolves",
        activeAt,
        remainingPhases: 1,
      } as PlayerAttribute);
      const expectedPlayerAttribute = new PlayerAttribute();
      expectedPlayerAttribute.name = "sheriff";
      expectedPlayerAttribute.source = "werewolves";
      expectedPlayerAttribute.activeAt = activeAt;
      expectedPlayerAttribute.remainingPhases = 1;

      expect(createdPlayerAttribute).toStrictEqual<PlayerAttribute>(expectedPlayerAttribute);
    });
  });
});