import { BearTamerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/bear-tamer-game-options/bear-tamer-game-options.class";

describe("Bear Tamer Game Options Class", () => {
  describe("create", () => {
    it("should create a bear tamer game options when called.", () => {
      const createdBearTamerGameOptions = BearTamerGameOptions.create({ doesGrowlOnWerewolvesSide: false });
      const expectedBearTamerGameOptions = new BearTamerGameOptions();
      expectedBearTamerGameOptions.doesGrowlOnWerewolvesSide = false;

      expect(createdBearTamerGameOptions).toStrictEqual<BearTamerGameOptions>(expectedBearTamerGameOptions);
    });
  });
});