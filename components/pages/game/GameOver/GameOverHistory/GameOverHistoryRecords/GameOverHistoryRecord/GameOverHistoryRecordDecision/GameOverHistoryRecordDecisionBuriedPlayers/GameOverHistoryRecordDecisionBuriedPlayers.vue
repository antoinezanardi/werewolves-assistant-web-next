<template>
  <div
    id="game-over-history-record-decision-buried-players"
    class="flex gap-4 items-center justify-center"
  >
    <div
      v-for="buriedPlayer in buriedPlayers"
      :key="buriedPlayer._id"
      class="game-over-history-record-buried-player w-1/4"
    >
      <PlayerCard
        class="game-over-history-record-decision-buried-player-card"
        :player-name="buriedPlayer.name"
        :player-role="buriedPlayer.role.current"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionBuriedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/game-over-history-record-decision-buried-players.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

const props = defineProps<GameOverHistoryRecordDecisionBuriedPlayersProps>();

const buriedPlayers = computed<Player[] | undefined>(() => {
  const { interactions } = props.gameHistoryRecord.play.source;
  const buryDeadBodiesInteraction = interactions?.find(({ type }) => type === "bury");

  return buryDeadBodiesInteraction?.eligibleTargets;
});
</script>