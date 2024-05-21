import { WolfHoundGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.class";

describe("Wolf Hound Game Options Class", () => {
  describe("create", () => {
    it("should create a wolf hound game options when called.", () => {
      const createdWolfHoundGameOptions = WolfHoundGameOptions.create({
        isSideRandomlyChosen: true,
        isChosenSideRevealed: false,
      });
      const expectedWolfHoundGameOptions = new WolfHoundGameOptions();
      expectedWolfHoundGameOptions.isSideRandomlyChosen = true;
      expectedWolfHoundGameOptions.isChosenSideRevealed = false;

      expect(createdWolfHoundGameOptions).toStrictEqual<WolfHoundGameOptions>(expectedWolfHoundGameOptions);
    });
  });
});