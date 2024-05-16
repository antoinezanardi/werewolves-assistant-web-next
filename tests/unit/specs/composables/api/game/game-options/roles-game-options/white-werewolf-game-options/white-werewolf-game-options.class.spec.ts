import { WhiteWerewolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/white-werewolf-options/white-werewolf-game-options.class";

describe("White Werewolf", () => {
  describe("create", () => {
    it("should create a white werewolf game options when called.", () => {
      const createdWhiteWerewolfGameOptions = WhiteWerewolfGameOptions.create({ wakingUpInterval: 3 });
      const expectedWhiteWerewolfGameOptions = new WhiteWerewolfGameOptions();
      expectedWhiteWerewolfGameOptions.wakingUpInterval = 3;

      expect(createdWhiteWerewolfGameOptions).toStrictEqual<WhiteWerewolfGameOptions>(expectedWhiteWerewolfGameOptions);
    });
  });
});