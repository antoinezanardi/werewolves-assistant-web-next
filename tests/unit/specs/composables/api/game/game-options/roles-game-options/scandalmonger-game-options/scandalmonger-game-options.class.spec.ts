import { ScandalmongerGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/scandalmonger-game-options/scandalmongonger-game-options.class";

describe("Scandalmonger Game Options Class", () => {
  describe("create", () => {
    it("should create a scandalmonger game options when called.", () => {
      const createdScandalmongerGameOptions = ScandalmongerGameOptions.create({ markPenalty: 4 });
      const expectedScandalmongerGameOptions = new ScandalmongerGameOptions();
      expectedScandalmongerGameOptions.markPenalty = 4;
      
      expect(createdScandalmongerGameOptions).toStrictEqual<ScandalmongerGameOptions>(expectedScandalmongerGameOptions);
    });
  });
});