import { FoxGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/fox-game-options/fox-game-options.class";

describe("Fox Game Options Class", () => {
  describe("create", () => {
    it("should create a fox game options when called.", () => {
      const createdFoxGameOptions = FoxGameOptions.create({ isPowerlessIfMissesWerewolf: false });
      const expectedFoxGameOptions = new FoxGameOptions();
      expectedFoxGameOptions.isPowerlessIfMissesWerewolf = false;

      expect(createdFoxGameOptions).toStrictEqual<FoxGameOptions>(expectedFoxGameOptions);
    });
  });
});