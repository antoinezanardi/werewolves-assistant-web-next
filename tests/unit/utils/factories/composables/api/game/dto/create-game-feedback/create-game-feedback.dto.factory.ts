import { faker } from "@faker-js/faker";

import { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";

function createFakeCreateGameFeedbackDto(createGameFeedbackDto: Partial<CreateGameFeedbackDto> = {}): CreateGameFeedbackDto {
  return CreateGameFeedbackDto.create({
    score: createGameFeedbackDto.score ?? faker.number.int({ min: 1, max: 5 }),
    review: createGameFeedbackDto.review,
    hasEncounteredError: createGameFeedbackDto.hasEncounteredError ?? faker.datatype.boolean(),
  });
}

export { createFakeCreateGameFeedbackDto };