import { WerewolfGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/werewolf-game-options/werewolf-game-options.class";

describe("Werewolf Game Options Class", () => {
  describe("create", () => {
    it("should create a werewolf game options when called.", () => {
      const createdWerewolfGameOptions = WerewolfGameOptions.create({ canEatEachOther: true });
      const expectedWerewolfGameOptions = new WerewolfGameOptions();
      expectedWerewolfGameOptions.canEatEachOther = true;

      expect(createdWerewolfGameOptions).toStrictEqual<WerewolfGameOptions>(expectedWerewolfGameOptions);
    });
  });
});