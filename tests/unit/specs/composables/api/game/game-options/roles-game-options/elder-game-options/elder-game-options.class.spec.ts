import { ElderGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/elder-game-options/elder-game-options.class";

describe("Elder Game Options Class", () => {
  describe("create", () => {
    it("should create an elder game options when called.", () => {
      const createdElderGameOptions = ElderGameOptions.create({
        doesTakeHisRevenge: false,
        livesCountAgainstWerewolves: 5,
      });
      const expectedElderGameOptions = new ElderGameOptions();
      expectedElderGameOptions.doesTakeHisRevenge = false;
      expectedElderGameOptions.livesCountAgainstWerewolves = 5;

      expect(createdElderGameOptions).toStrictEqual<ElderGameOptions>(expectedElderGameOptions);
    });
  });
});