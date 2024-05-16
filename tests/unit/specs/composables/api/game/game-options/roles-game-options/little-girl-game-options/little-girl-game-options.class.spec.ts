import { LittleGirlGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/little-girl-game-options/little-girl-game-options.class";

describe("Little Girl Game Options Class", () => {
  describe("create", () => {
    it("should create a little girl game options when called.", () => {
      const createdLittleGirlGameOptions = LittleGirlGameOptions.create({ isProtectedByDefender: true });
      const expectedLittleGirlGameOptions = new LittleGirlGameOptions();
      expectedLittleGirlGameOptions.isProtectedByDefender = true;

      expect(createdLittleGirlGameOptions).toStrictEqual<LittleGirlGameOptions>(expectedLittleGirlGameOptions);
    });
  });
});