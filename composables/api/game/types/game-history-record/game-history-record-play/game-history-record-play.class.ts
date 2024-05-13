import { Expose, plainToInstance, Type } from "class-transformer";

import { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import { GameHistoryRecordPlaySource } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.class";
import { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";
import { GameHistoryRecordPlayVote } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-vote/game-history-record-play-vote.class";
import { GameHistoryRecordPlayVoting } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.class";
import type { GamePlayAction, GamePlayCause, GamePlayType } from "~/composables/api/game/types/game-play/game-play.types";
import type { RoleSide } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameHistoryRecordPlay {
  @Expose()
  public type: GamePlayType;

  @Expose()
  public action: GamePlayAction;

  @Expose()
  @Type(() => GameHistoryRecordPlaySource)
  public source: GameHistoryRecordPlaySource;

  @Expose()
  public cause?: GamePlayCause;

  @Expose()
  @Type(() => GameHistoryRecordPlayTarget)
  public targets?: GameHistoryRecordPlayTarget[];

  @Expose()
  @Type(() => GameHistoryRecordPlayVote)
  public votes?: GameHistoryRecordPlayVote[];

  @Expose()
  @Type(() => GameHistoryRecordPlayVoting)
  public voting?: GameHistoryRecordPlayVoting;

  @Expose()
  public didJudgeRequestAnotherVote?: boolean;

  @Expose()
  @Type(() => GameAdditionalCard)
  public chosenCard?: GameAdditionalCard;

  @Expose()
  public chosenSide?: RoleSide;

  public static create(gameHistoryRecordPlay: GameHistoryRecordPlay): GameHistoryRecordPlay {
    return plainToInstance(GameHistoryRecordPlay, gameHistoryRecordPlay, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameHistoryRecordPlay };