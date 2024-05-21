import { DefenderGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/defender-game-options/defender-game-options.class";

describe("Defender Game Options Class", () => {
  describe("create", () => {
    it("should create a defender game options when called.", () => {
      const createdDefenderGameOptions = DefenderGameOptions.create({ canProtectTwice: true });
      const expectedDefenderGameOptions = new DefenderGameOptions();
      expectedDefenderGameOptions.canProtectTwice = true;

      expect(createdDefenderGameOptions).toStrictEqual<DefenderGameOptions>(expectedDefenderGameOptions);
    });
  });
});