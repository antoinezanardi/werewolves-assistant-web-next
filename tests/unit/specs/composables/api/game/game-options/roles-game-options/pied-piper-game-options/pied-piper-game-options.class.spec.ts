import { PiedPiperGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/pied-piper-game-options/pied-piper-game-options.class";

describe("Pied Piper Game Options Class", () => {
  describe("create", () => {
    it("should create a pied piper game options when called.", () => {
      const createdPiedPiperGameOptions = PiedPiperGameOptions.create({
        isPowerlessOnWerewolvesSide: false,
        charmedPeopleCountPerNight: 1,
      });
      const expectedPiedPiperGameOptions = new PiedPiperGameOptions();
      expectedPiedPiperGameOptions.isPowerlessOnWerewolvesSide = false;
      expectedPiedPiperGameOptions.charmedPeopleCountPerNight = 1;

      expect(createdPiedPiperGameOptions).toStrictEqual<PiedPiperGameOptions>(expectedPiedPiperGameOptions);
    });
  });
});