import { faker } from "@faker-js/faker";

import { GameFeedback } from "~/composables/api/game/types/game-feedback/game-feedback.class";

function createFakeGameFeedback(gameFeedback: Partial<GameFeedback> = {}): GameFeedback {
  return GameFeedback.create({
    _id: gameFeedback._id ?? faker.string.uuid(),
    gameId: gameFeedback.gameId ?? faker.string.uuid(),
    score: gameFeedback.score ?? faker.number.int({ min: 1, max: 5 }),
    review: gameFeedback.review,
    hasEncounteredError: gameFeedback.hasEncounteredError ?? faker.datatype.boolean(),
    createdAt: gameFeedback.createdAt ?? faker.date.recent(),
  });
}

export { createFakeGameFeedback };