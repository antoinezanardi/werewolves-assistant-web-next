import { SheriffGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/sheriff-game-options/sheriff-game-options.class";
import { createFakeSheriffElectionGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/sheriff-game-options/sheriff-election-game-options/sheriff-election-game-options.factory";

describe("Sheriff Game Options Class", () => {
  describe("create", () => {
    it("should create a sheriff game options when called.", () => {
      const sheriffElectionGameOptions = createFakeSheriffElectionGameOptions();
      const createdSheriffGameOptions = SheriffGameOptions.create({
        mustSettleTieInVotes: false,
        isEnabled: false,
        hasDoubledVote: false,
        electedAt: sheriffElectionGameOptions,
      });
      const expectedSheriffGameOptions = new SheriffGameOptions();
      expectedSheriffGameOptions.mustSettleTieInVotes = false;
      expectedSheriffGameOptions.isEnabled = false;
      expectedSheriffGameOptions.hasDoubledVote = false;
      expectedSheriffGameOptions.electedAt = sheriffElectionGameOptions;

      expect(createdSheriffGameOptions).toStrictEqual<SheriffGameOptions>(expectedSheriffGameOptions);
    });
  });
});