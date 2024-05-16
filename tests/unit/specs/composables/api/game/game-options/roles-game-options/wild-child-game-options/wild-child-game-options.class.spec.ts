import { WildChildGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/wild-child-game-options/wild-child-game-options.class";

describe("Wild Child Game Options Class", () => {
  describe("create", () => {
    it("should create a wild child game options when called.", () => {
      const createdWildChildGameOptions = WildChildGameOptions.create({ isTransformationRevealed: true });
      const expectedWildChildGameOptions = new WildChildGameOptions();
      expectedWildChildGameOptions.isTransformationRevealed = true;

      expect(createdWildChildGameOptions).toStrictEqual<WildChildGameOptions>(expectedWildChildGameOptions);
    });
  });
});