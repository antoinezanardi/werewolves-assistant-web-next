import { createFakeCreateGameFeedbackDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game-feedback/create-game-feedback.dto.factory";
import { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";

describe("Create Game Feedback Dto", () => {
  describe("create", () => {
    it("should create game feedback dto when called.", () => {
      const gameFeedbackDto = createFakeCreateGameFeedbackDto({
        score: 5,
        review: "Great game!",
        hasEncounteredError: false,
      });
      const createdGameFeedbackDto = CreateGameFeedbackDto.create(gameFeedbackDto);
      const expectedGameFeedbackDto = new CreateGameFeedbackDto();
      expectedGameFeedbackDto.score = 5;
      expectedGameFeedbackDto.review = "Great game!";
      expectedGameFeedbackDto.hasEncounteredError = false;

      expect(createdGameFeedbackDto).toStrictEqual<CreateGameFeedbackDto>(expectedGameFeedbackDto);
    });
  });
});