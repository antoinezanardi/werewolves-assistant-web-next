import { SheriffElectionGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/sheriff-game-options/sheriff-election-game-options/sheriff-election-game-options.class";

describe("Sheriff Election Game Options Class", () => {
  describe("create", () => {
    it("should create a sheriff election game options when called.", () => {
      const createdSheriffElectionGameOptions = SheriffElectionGameOptions.create({
        turn: 3,
        phaseName: "day",
      });
      const expectedSheriffElectionGameOptions = new SheriffElectionGameOptions();
      expectedSheriffElectionGameOptions.turn = 3;
      expectedSheriffElectionGameOptions.phaseName = "day";

      expect(createdSheriffElectionGameOptions).toStrictEqual<SheriffElectionGameOptions>(expectedSheriffElectionGameOptions);
    });
  });
});