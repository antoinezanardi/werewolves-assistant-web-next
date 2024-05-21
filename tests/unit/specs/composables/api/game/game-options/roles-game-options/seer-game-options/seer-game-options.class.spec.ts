import { SeerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/seer-game-options/seer-game-options.class";

describe("Seer Game Options Class", () => {
  describe("create", () => {
    it("should create a seer game options when called.", () => {
      const createdSeerGameOptions = SeerGameOptions.create({
        isTalkative: false,
        canSeeRoles: false,
      });
      const expectedSeerGameOptions = new SeerGameOptions();
      expectedSeerGameOptions.isTalkative = false;
      expectedSeerGameOptions.canSeeRoles = false;

      expect(createdSeerGameOptions).toStrictEqual<SeerGameOptions>(expectedSeerGameOptions);
    });
  });
});