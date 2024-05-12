import type { TupleToUnion } from "type-fest";

import type { GAME_HISTORY_RECORD_PLAY_VOTING_RESULTS } from "~/composables/api/game/constants/game-history-record/game-history-record.constants";

type GameHistoryRecordPlayVotingResult = TupleToUnion<typeof GAME_HISTORY_RECORD_PLAY_VOTING_RESULTS>;

export type { GameHistoryRecordPlayVotingResult };