import type { MaybeRef, Ref } from "vue";
import type { GameHistoryRecordPlayerAttributeAlterationStatus } from "~/composables/api/game/types/game-history-record/game-history-record-player-attribute-alteration/game-history-record-player-attribute-alteration.types";
import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import type { Game } from "~/composables/api/game/types/game.class";
import type { GameSource } from "~/composables/api/game/types/game.types";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseGameLastHistoryRecord = {
  lastTargetedPlayers: Ref<Player[]>;
  doesHavePlayerAttributeAlteration: (attributeName: PlayerAttributeName, source: GameSource, status: GameHistoryRecordPlayerAttributeAlterationStatus) => boolean;
};

function useGameLastHistoryRecord(game: MaybeRef<Game>): UseGameLastHistoryRecord {
  const lastGameHistoryRecord = computed<GameHistoryRecord | null>(() => (isRef(game) ? game.value.lastGameHistoryRecord : game.lastGameHistoryRecord));

  const lastTargetedPlayers = computed<Player[]>(() => {
    if (!lastGameHistoryRecord.value?.play.targets) {
      return [];
    }
    return lastGameHistoryRecord.value.play.targets.map(target => target.player);
  });

  function doesHavePlayerAttributeAlteration(attributeName: PlayerAttributeName, source: GameSource, status: GameHistoryRecordPlayerAttributeAlterationStatus): boolean {
    if (!lastGameHistoryRecord.value?.playerAttributeAlterations) {
      return false;
    }
    return lastGameHistoryRecord.value.playerAttributeAlterations.some(playerAttributeAlteration => playerAttributeAlteration.name === attributeName &&
      playerAttributeAlteration.source === source &&
      playerAttributeAlteration.status === status);
  }
  return {
    lastTargetedPlayers,
    doesHavePlayerAttributeAlteration,
  };
}

export { useGameLastHistoryRecord };