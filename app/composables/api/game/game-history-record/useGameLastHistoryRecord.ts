import type { Ref } from "vue";
import type { Game } from "~/composables/api/game/types/game.class";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseGameLastHistoryRecord = {
  lastTargetedPlayers: Ref<Player[]>;
};

function useGameLastHistoryRecord(game: Ref<Game>): UseGameLastHistoryRecord {
  const lastTargetedPlayers = computed<Player[]>(() => {
    if (!game.value.lastGameHistoryRecord?.play.targets) {
      return [];
    }
    return game.value.lastGameHistoryRecord.play.targets.map(target => target.player);
  });

  return { lastTargetedPlayers };
}

export { useGameLastHistoryRecord };