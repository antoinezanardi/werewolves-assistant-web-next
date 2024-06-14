import { Expose, plainToInstance, Type } from "class-transformer";

import type { GameHistoryRecordPlayVotingResult } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.types";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameHistoryRecordPlayVoting {
  @Expose()
  public result: GameHistoryRecordPlayVotingResult;

  @Expose()
  @Type(() => Player)
  public nominatedPlayers?: Player[];

  public static create(gameHistoryRecordPlayVoting: GameHistoryRecordPlayVoting): GameHistoryRecordPlayVoting {
    return plainToInstance(GameHistoryRecordPlayVoting, gameHistoryRecordPlayVoting, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameHistoryRecordPlayVoting };