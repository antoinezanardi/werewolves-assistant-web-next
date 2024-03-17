import { Expose, plainToInstance } from "class-transformer";

import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GamePlaySourceInteractionBoundaries {
  @Expose()
  public min: number;

  @Expose()
  public max: number;

  public static create(gamePlaySourceInteractionBoundaries: GamePlaySourceInteractionBoundaries): GamePlaySourceInteractionBoundaries {
    return plainToInstance(GamePlaySourceInteractionBoundaries, gamePlaySourceInteractionBoundaries, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GamePlaySourceInteractionBoundaries };