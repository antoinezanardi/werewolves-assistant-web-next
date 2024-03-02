import { Expose, plainToInstance, Type } from "class-transformer";

import { GamePlayEligibleTargetsBoundaries } from "~/composables/api/game/types/game-play/game-play-eligible-targets/game-play-eligible-targets-boundaries/game-play-eligible-targets-boundaries.class";
import { InteractablePlayer } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/interactable-player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GamePlayEligibleTargets {
  @Type(() => InteractablePlayer)
  @Expose()
  public interactablePlayers?: InteractablePlayer[];

  @Type(() => GamePlayEligibleTargetsBoundaries)
  @Expose()
  public boundaries?: GamePlayEligibleTargetsBoundaries;

  public static create(gamePlayEligibleTargets: GamePlayEligibleTargets): GamePlayEligibleTargets {
    return plainToInstance(GamePlayEligibleTargets, gamePlayEligibleTargets, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GamePlayEligibleTargets };