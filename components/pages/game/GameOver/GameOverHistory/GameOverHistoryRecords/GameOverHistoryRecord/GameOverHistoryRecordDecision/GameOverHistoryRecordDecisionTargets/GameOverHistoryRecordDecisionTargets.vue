<template>
  <div
    id="game-over-history-record-decision-targets"
    class="flex gap-4 items-center justify-center"
  >
    <GameOverHistoryRecordDecisionTarget
      v-for="gameHistoryRecordPlayTarget in gameHistoryRecord.play.targets"
      :key="gameHistoryRecordPlayTarget.player._id"
      class="game-over-history-record-target-player w-1/4"
      :target="gameHistoryRecordPlayTarget"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordDecisionTargetsProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/game-over-history-record-decision-targets.types";
import GameOverHistoryRecordDecisionTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/GameOverHistoryRecordDecisionTarget.vue";
defineProps<GameOverHistoryRecordDecisionTargetsProps>();
</script>