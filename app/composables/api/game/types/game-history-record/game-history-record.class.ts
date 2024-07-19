import { Expose, plainToInstance, Type } from "class-transformer";

import { GameHistoryRecordPlay } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play.class";
import { GameHistoryRecordPlayerAttributeAlteration } from "~/composables/api/game/types/game-history-record/game-history-record-player-attribute-alteration/game-history-record-player-attribute-alteration.class";
import { GamePhase } from "~/composables/api/game/types/game-phase/game-phase.class";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameHistoryRecord {
  @Expose()
  public _id: string;

  @Expose()
  public gameId: string;

  @Expose()
  public turn: number;

  @Type(() => GamePhase)
  @Expose()
  public phase: GamePhase;

  @Expose()
  public tick: number;

  @Expose()
  @Type(() => GameHistoryRecordPlay)
  public play: GameHistoryRecordPlay;

  @Expose()
  @Type(() => Player)
  public revealedPlayers?: Player[];

  @Expose()
  @Type(() => Player)
  public deadPlayers?: Player[];

  @Expose()
  @Type(() => GameHistoryRecordPlayerAttributeAlteration)
  public playerAttributeAlterations?: GameHistoryRecordPlayerAttributeAlteration[];

  @Expose()
  public createdAt: Date;

  public static create(gameHistoryRecord: GameHistoryRecord): GameHistoryRecord {
    return plainToInstance(GameHistoryRecord, gameHistoryRecord, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameHistoryRecord };