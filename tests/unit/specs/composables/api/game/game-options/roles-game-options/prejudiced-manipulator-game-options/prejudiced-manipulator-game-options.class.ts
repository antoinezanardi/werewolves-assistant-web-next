import { PrejudicedManipulatorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/prejudiced-manipulator-game-options/prejudiced-manipulator-game-options.class";

describe("Prejudiced Manipulator Game Options Class", () => {
  describe("create", () => {
    it("should create a prejudiced manipulator game options when called.", () => {
      const createdPrejudicedManipulatorGameOptions = PrejudicedManipulatorGameOptions.create({ isPowerlessOnWerewolvesSide: false });
      const expectedPrejudicedManipulatorGameOptions = new PrejudicedManipulatorGameOptions();
      expectedPrejudicedManipulatorGameOptions.isPowerlessOnWerewolvesSide = false;

      expect(createdPrejudicedManipulatorGameOptions).toStrictEqual<PrejudicedManipulatorGameOptions>(expectedPrejudicedManipulatorGameOptions);
    });
  });
});