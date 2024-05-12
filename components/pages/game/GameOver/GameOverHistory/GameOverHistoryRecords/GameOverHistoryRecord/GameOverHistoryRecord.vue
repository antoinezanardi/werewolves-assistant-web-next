<template>
  <div
    id="game-over-history-record"
    class="flex gap-4 items-center"
  >
    <GameOverHistoryRecordSource
      id="game-over-history-record-source"
      class="w-4/12"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordAction
      id="game-over-history-record-action"
      class="w-3/12"
      :game-history-record="gameHistoryRecord"
    />

    <div class="game-over-history-record-target-container w-4/12">
      <GameOverHistoryRecordDecision
        v-if="isGameHistoryRecordTargetDisplayed"
        id="game-over-history-record-decision"
        :game-history-record="gameHistoryRecord"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/game-over-history-record.types";
import GameOverHistoryRecordAction from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordAction/GameOverHistoryRecordAction.vue";
import GameOverHistoryRecordSource from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/GameOverHistoryRecordSource.vue";
import GameOverHistoryRecordDecision from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecision.vue";
import { useGameHistoryRecord } from "~/composables/api/game/game-history-record/useGameHistoryRecord";
import type { GamePlayType } from "~/composables/api/game/types/game-play/game-play.types";

const props = defineProps<GameOverHistoryRecordProps>();

const { didSourceSkipped } = useGameHistoryRecord();

const isGameHistoryRecordTargetDisplayed = computed<boolean>(() => {
  const { type } = props.gameHistoryRecord.play;
  const displayedTargetTypes: GamePlayType[] = ["target", "vote", "bury-dead-bodies", "choose-card", "choose-side"];

  return displayedTargetTypes.includes(type) && !didSourceSkipped(props.gameHistoryRecord);
});
</script>