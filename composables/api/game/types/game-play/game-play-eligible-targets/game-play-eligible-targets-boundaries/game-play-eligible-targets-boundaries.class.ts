import { Expose, plainToInstance } from "class-transformer";

import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GamePlayEligibleTargetsBoundaries {
  @Expose()
  public min: number;

  @Expose()
  public max: number;

  public static create(boundaries: GamePlayEligibleTargetsBoundaries): GamePlayEligibleTargetsBoundaries {
    return plainToInstance(GamePlayEligibleTargetsBoundaries, boundaries, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GamePlayEligibleTargetsBoundaries };