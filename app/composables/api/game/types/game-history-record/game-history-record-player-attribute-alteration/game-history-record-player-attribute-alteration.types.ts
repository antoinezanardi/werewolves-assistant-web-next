import type { TupleToUnion } from "type-fest";
import type { GAME_HISTORY_RECORD_PLAYER_ATTRIBUTE_ALTERATION_STATUSES } from "~/composables/api/game/constants/game-history-record/game-history-record.constants";

type GameHistoryRecordPlayerAttributeAlterationStatus = TupleToUnion<typeof GAME_HISTORY_RECORD_PLAYER_ATTRIBUTE_ALTERATION_STATUSES>;

export type { GameHistoryRecordPlayerAttributeAlterationStatus };