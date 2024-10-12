import { createFakeGameFeedback } from "@tests/unit/utils/factories/composables/api/game/game-feedback/game-feedback.factory";
import { GameFeedback } from "~/composables/api/game/types/game-feedback/game-feedback.class";

describe("Game Feedback class", () => {
  describe("create", () => {
    it("should create a game feedback when called.", () => {
      const createdAt = new Date();
      const gameFeedback = createFakeGameFeedback({
        _id: "game-feedback-id",
        gameId: "game-id",
        score: 5,
        review: "Great game!",
        hasEncounteredError: false,
        createdAt,
      });
      const createdGameFeedback = GameFeedback.create(gameFeedback);
      const expectedGameFeedback = new GameFeedback();
      expectedGameFeedback._id = "game-feedback-id";
      expectedGameFeedback.gameId = "game-id";
      expectedGameFeedback.score = 5;
      expectedGameFeedback.review = "Great game!";
      expectedGameFeedback.hasEncounteredError = false;
      expectedGameFeedback.createdAt = createdAt;

      expect(createdGameFeedback).toStrictEqual<GameFeedback>(expectedGameFeedback);
    });
  });
});