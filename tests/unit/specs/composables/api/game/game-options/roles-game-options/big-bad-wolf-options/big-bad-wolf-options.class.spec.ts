import { BigBadWolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/big-bad-wolf-options/big-bad-wolf-options.class";

describe("Big Bad Wolf Game Options Class", () => {
  describe("create", () => {
    it("should create a big bad wolf options when called.", () => {
      const createdBigBadWolfOptions = BigBadWolfGameOptions.create({ isPowerlessIfWerewolfDies: false });
      const expectedBigBadWolfOptions = new BigBadWolfGameOptions();
      expectedBigBadWolfOptions.isPowerlessIfWerewolfDies = false;

      expect(createdBigBadWolfOptions).toStrictEqual<BigBadWolfGameOptions>(expectedBigBadWolfOptions);
    });
  });
});