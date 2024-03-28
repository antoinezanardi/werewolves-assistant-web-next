import { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

function createFakeGameHistoryRecordPlayTarget(gameHistoryRecordPlayTarget: Partial<GameHistoryRecordPlayTarget> = {}): GameHistoryRecordPlayTarget {
  return GameHistoryRecordPlayTarget.create({
    target: gameHistoryRecordPlayTarget.target ?? createFakePlayer(),
    drankPotion: gameHistoryRecordPlayTarget.drankPotion,
  });
}

export { createFakeGameHistoryRecordPlayTarget };