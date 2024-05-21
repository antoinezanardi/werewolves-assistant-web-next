import { WitchGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/witch-game-options/witch-game-options.class";

describe("Witch Game Options Class", () => {
  describe("create", () => {
    it("should create a witch game options when called.", () => {
      const createdWitchGameOptions = WitchGameOptions.create({ doesKnowWerewolvesTargets: false });
      const expectedWitchGameOptions = new WitchGameOptions();
      expectedWitchGameOptions.doesKnowWerewolvesTargets = false;

      expect(createdWitchGameOptions).toStrictEqual<WitchGameOptions>(expectedWitchGameOptions);
    });
  });
});