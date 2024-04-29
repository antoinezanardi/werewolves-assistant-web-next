import { faker } from "@faker-js/faker";

import { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGamePhase } from "~/tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";

function createFakeGameHistoryRecord(gameHistoryRecord: Partial<GameHistoryRecord> = {}): GameHistoryRecord {
  return GameHistoryRecord.create({
    _id: gameHistoryRecord._id ?? faker.string.uuid(),
    gameId: gameHistoryRecord.gameId ?? faker.string.uuid(),
    turn: gameHistoryRecord.turn ?? faker.number.int({ min: 1 }),
    phase: createFakeGamePhase(gameHistoryRecord.phase),
    tick: gameHistoryRecord.tick ?? faker.number.int({ min: 1 }),
    play: gameHistoryRecord.play ?? createFakeGameHistoryRecordPlay(),
    revealedPlayers: gameHistoryRecord.revealedPlayers,
    deadPlayers: gameHistoryRecord.deadPlayers,
    createdAt: gameHistoryRecord.createdAt ?? faker.date.recent(),
  });
}

export { createFakeGameHistoryRecord };