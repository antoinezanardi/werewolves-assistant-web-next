import { ThiefGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/thief-game-options/thief-game-options.class";

describe("Thief Game Options Class", () => {
  describe("create", () => {
    it("should create a thief game options when called.", () => {
      const createdThiefGameOptions = ThiefGameOptions.create({
        mustChooseBetweenWerewolves: false,
        isChosenCardRevealed: false,
        additionalCardsCount: 4,
      });
      const expectedThiefGameOptions = new ThiefGameOptions();
      expectedThiefGameOptions.mustChooseBetweenWerewolves = false;
      expectedThiefGameOptions.isChosenCardRevealed = false;
      expectedThiefGameOptions.additionalCardsCount = 4;

      expect(createdThiefGameOptions).toStrictEqual<ThiefGameOptions>(expectedThiefGameOptions);
    });
  });
});