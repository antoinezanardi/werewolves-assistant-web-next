import { Expose, plainToInstance, Type } from "class-transformer";

import { GamePlaySource } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.class";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GamePlayAction, GamePlayCause, GamePlayOccurrence, GamePlayType } from "~/composables/api/game/types/game-play/game-play.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GamePlay {
  @Expose()
  public type: GamePlayType;

  @Type(() => GamePlaySource)
  @Expose()
  public source: GamePlaySource;

  @Expose()
  public action: GamePlayAction;

  @Expose()
  public cause?: GamePlayCause;

  @Expose()
  public canBeSkipped?: boolean;

  @Expose()
  public occurrence: GamePlayOccurrence;

  public static create(gamePlay: GamePlay): GamePlay {
    return plainToInstance(GamePlay, gamePlay, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GamePlay };