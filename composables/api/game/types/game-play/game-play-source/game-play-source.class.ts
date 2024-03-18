import { Expose, plainToInstance, Type } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import { GamePlaySourceInteraction } from "~/composables/api/game/types/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.class";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GamePlaySource {
  @Expose()
  public name: GamePlaySourceName;

  @Type(() => Player)
  @Expose()
  public players?: Player[];

  @Type(() => GamePlaySourceInteraction)
  @Expose()
  public interactions?: GamePlaySourceInteraction[];

  public static create(gamePlaySource: GamePlaySource): GamePlaySource {
    return plainToInstance(GamePlaySource, gamePlaySource, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GamePlaySource };