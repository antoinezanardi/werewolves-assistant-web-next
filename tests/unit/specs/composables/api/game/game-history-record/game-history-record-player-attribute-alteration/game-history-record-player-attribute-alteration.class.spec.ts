import { GameHistoryRecordPlayerAttributeAlteration } from "~/composables/api/game/types/game-history-record/game-history-record-player-attribute-alteration/game-history-record-player-attribute-alteration.class";

describe("Game History Record Player Attribute Alteration Class", () => {
  describe("create", () => {
    it("should create a game history record player attribute alteration when called.", () => {
      const gameHistoryRecordPlayerAttributeAlteration = GameHistoryRecordPlayerAttributeAlteration.create({
        playerName: "Player",
        name: "drank-death-potion",
        source: "witch",
        status: "attached",
      });
      const expectedGameHistoryRecordPlayerAttributeAlteration = new GameHistoryRecordPlayerAttributeAlteration();
      expectedGameHistoryRecordPlayerAttributeAlteration.playerName = "Player";
      expectedGameHistoryRecordPlayerAttributeAlteration.name = "drank-death-potion";
      expectedGameHistoryRecordPlayerAttributeAlteration.source = "witch";
      expectedGameHistoryRecordPlayerAttributeAlteration.status = "attached";

      expect(gameHistoryRecordPlayerAttributeAlteration).toStrictEqual<GameHistoryRecordPlayerAttributeAlteration>(expectedGameHistoryRecordPlayerAttributeAlteration);
    });
  });
});