<template>
  <div id="game-over-history-record-decision">
    <GameOverHistoryRecordDecisionTargets
      v-if="gameHistoryRecord.play.type === 'target'"
      id="game-over-history-record-play-targets"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordDecisionNominatedPlayers
      v-else-if="gameHistoryRecord.play.type === 'vote'"
      id="game-over-history-record-play-nominated-players"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordDecisionBuriedPlayers
      v-else-if="gameHistoryRecord.play.type === 'bury-dead-bodies'"
      id="game-over-history-record-play-buried-players"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordDecisionChosenCard
      v-else-if="gameHistoryRecord.play.type === 'choose-card'"
      id="game-over-history-record-play-chosen-card"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordDecisionChosenSide
      v-else-if="gameHistoryRecord.play.type === 'choose-side'"
      id="game-over-history-record-play-chosen-side"
      :game-history-record="gameHistoryRecord"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/game-over-history-record-decision.types";
import GameOverHistoryRecordDecisionBuriedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayers.vue";
import GameOverHistoryRecordDecisionChosenCard from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenCard/GameOverHistoryRecordDecisionChosenCard.vue";
import GameOverHistoryRecordDecisionChosenSide from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenSide/GameOverHistoryRecordDecisionChosenSide.vue";
import GameOverHistoryRecordDecisionNominatedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/GameOverHistoryRecordDecisionNominatedPlayers.vue";
import GameOverHistoryRecordDecisionTargets from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTargets.vue";

defineProps<GameOverHistoryRecordDecisionProps>();
</script>