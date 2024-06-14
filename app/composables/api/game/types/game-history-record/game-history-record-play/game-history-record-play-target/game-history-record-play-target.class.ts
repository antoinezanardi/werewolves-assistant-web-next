import { Expose, plainToInstance, Type } from "class-transformer";

import type { WitchPotion } from "~/composables/api/game/types/game-play/game-play.types";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameHistoryRecordPlayTarget {
  @Expose()
  @Type(() => Player)
  public player: Player;

  @Expose()
  public drankPotion?: WitchPotion;

  public static create(gameHistoryRecordPlayTarget: GameHistoryRecordPlayTarget): GameHistoryRecordPlayTarget {
    return plainToInstance(GameHistoryRecordPlayTarget, gameHistoryRecordPlayTarget, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameHistoryRecordPlayTarget };