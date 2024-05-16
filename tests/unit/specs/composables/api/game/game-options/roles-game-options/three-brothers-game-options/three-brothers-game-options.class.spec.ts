import { ThreeBrothersGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/three-brothers-game-options/three-brothers-game-options.class";

describe("Three Brothers Game Options Class", () => {
  describe("create", () => {
    it("should create a three brothers game options when called.", () => {
      const createdThreeBrothersGameOptions = ThreeBrothersGameOptions.create({ wakingUpInterval: 5 });
      const expectedThreeBrothersGameOptions = new ThreeBrothersGameOptions();
      expectedThreeBrothersGameOptions.wakingUpInterval = 5;

      expect(createdThreeBrothersGameOptions).toStrictEqual<ThreeBrothersGameOptions>(expectedThreeBrothersGameOptions);
    });
  });
});