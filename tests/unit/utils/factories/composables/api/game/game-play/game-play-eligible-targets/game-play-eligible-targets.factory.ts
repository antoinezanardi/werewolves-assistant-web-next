import { GamePlayEligibleTargets } from "~/composables/api/game/types/game-play/game-play-eligible-targets/game-play-eligible-targets.class";

function createFakeGamePlayEligibleTargets(gamePlayEligibleTargets: GamePlayEligibleTargets = {}): GamePlayEligibleTargets {
  return GamePlayEligibleTargets.create({
    interactablePlayers: gamePlayEligibleTargets.interactablePlayers ?? undefined,
    boundaries: gamePlayEligibleTargets.boundaries ?? undefined,
  });
}

export { createFakeGamePlayEligibleTargets };