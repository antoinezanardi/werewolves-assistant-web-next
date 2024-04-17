<template>
  <div
    id="game-over-history-record"
    class="flex gap-4 items-center"
  >
    <GameOverHistoryRecordSource
      id="game-over-history-record-source"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordAction
      id="game-over-history-record-action"
      class="w-56"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordTarget
      id="game-over-history-record-target"
      :game-history-record="gameHistoryRecord"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/game-over-history-record.types";
import GameOverHistoryRecordAction from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordAction/GameOverHistoryRecordAction.vue";
import GameOverHistoryRecordSource from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/GameOverHistoryRecordSource.vue";
import GameOverHistoryRecordTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordTarget/GameOverHistoryRecordTarget.vue";

defineProps<GameOverHistoryRecordProps>();
</script>