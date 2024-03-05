import { faker } from "@faker-js/faker";

import { GamePlayEligibleTargetsBoundaries } from "~/composables/api/game/types/game-play/game-play-eligible-targets/game-play-eligible-targets-boundaries/game-play-eligible-targets-boundaries.class";

function createFakeGamePlayEligibleTargetsBoundaries(gamePlayEligibleTargetsBoundaries: Partial<GamePlayEligibleTargetsBoundaries> = {}): GamePlayEligibleTargetsBoundaries {
  return GamePlayEligibleTargetsBoundaries.create({
    min: gamePlayEligibleTargetsBoundaries.min ?? faker.number.int({ min: 0 }),
    max: gamePlayEligibleTargetsBoundaries.max ?? faker.number.int({ min: 0 }),
  });
}

export { createFakeGamePlayEligibleTargetsBoundaries };