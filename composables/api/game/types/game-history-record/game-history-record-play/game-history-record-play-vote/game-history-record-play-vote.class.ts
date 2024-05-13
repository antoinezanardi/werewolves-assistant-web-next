import { Expose, plainToInstance, Type } from "class-transformer";

import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameHistoryRecordPlayVote {
  @Expose()
  @Type(() => Player)
  public source: Player;

  @Expose()
  @Type(() => Player)
  public target: Player;

  public static create(gameHistoryRecordPlayVote: GameHistoryRecordPlayVote): GameHistoryRecordPlayVote {
    return plainToInstance(GameHistoryRecordPlayVote, gameHistoryRecordPlayVote, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameHistoryRecordPlayVote };