import { Expose, plainToInstance, Type } from "class-transformer";

import { GamePlaySourceInteraction } from "~/composables/api/game/types/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.class";
import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameHistoryRecordPlaySource {
  @Expose()
  public name: GamePlaySourceName;

  @Expose()
  @Type(() => Player)
  public players: Player[];

  @Expose()
  @Type(() => GamePlaySourceInteraction)
  public interactions?: GamePlaySourceInteraction[];

  public static create(gameHistoryRecordPlaySource: GameHistoryRecordPlaySource): GameHistoryRecordPlaySource {
    return plainToInstance(GameHistoryRecordPlaySource, gameHistoryRecordPlaySource, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameHistoryRecordPlaySource };