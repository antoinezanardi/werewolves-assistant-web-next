import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import type { Player } from "~/composables/api/game/types/players/player.class";

type GameOverHistoryRecordDecisionBuriedPlayerProps = {
  buriedPlayer: Player;
  gameHistoryRecord: GameHistoryRecord;
};

export type { GameOverHistoryRecordDecisionBuriedPlayerProps };