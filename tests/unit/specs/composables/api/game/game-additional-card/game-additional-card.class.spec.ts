import { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";

describe("Game Additional Card Class", () => {
  describe("Create", () => {
    it("should create a game additional card when called.", () => {
      const gameAdditionalCard = GameAdditionalCard.create({
        _id: "id",
        isUsed: false,
        recipient: "thief",
        roleName: "seer",
        extra: "Extra",
      } as GameAdditionalCard);
      const expectedGameAdditionalCard = new GameAdditionalCard();
      expectedGameAdditionalCard._id = "id";
      expectedGameAdditionalCard.isUsed = false;
      expectedGameAdditionalCard.recipient = "thief";
      expectedGameAdditionalCard.roleName = "seer";

      expect(gameAdditionalCard).toStrictEqual<GameAdditionalCard>(expectedGameAdditionalCard);
    });
  });
});