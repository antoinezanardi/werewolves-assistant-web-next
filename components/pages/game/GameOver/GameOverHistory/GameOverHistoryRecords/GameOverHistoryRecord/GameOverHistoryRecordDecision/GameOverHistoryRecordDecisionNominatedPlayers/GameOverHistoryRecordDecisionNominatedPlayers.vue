<template>
  <div
    id="game-over-history-record-decision-nominated-players"
    class="flex gap-4 items-center justify-center"
  >
    <div
      v-for="playerSource in gameHistoryRecord.play.voting?.nominatedPlayers"
      :key="playerSource._id"
      class="game-over-history-record-source-player w-1/4"
    >
      <PlayerCard
        class="game-over-history-record-decision-nominated-player-card"
        :player-name="playerSource.name"
        :player-role="playerSource.role.current"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionNominatedPlayersProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/game-over-history-record-decision-nominated-players.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";

defineProps<GameOverHistoryRecordDecisionNominatedPlayersProps>();
</script>