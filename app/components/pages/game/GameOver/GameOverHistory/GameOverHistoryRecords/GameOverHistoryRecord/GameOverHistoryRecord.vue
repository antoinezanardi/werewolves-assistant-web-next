<template>
  <div
    id="game-over-history-record"
    class="flex flex-col gap-4 items-center md:!h-60 md:flex-row w-full"
  >
    <GameOverHistoryRecordSource
      id="game-over-history-record-source"
      class="border border-gray-700 h-full md:w-5/12 p-2 rounded-md w-full"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordAction
      id="game-over-history-record-action"
      class="md:w-1/10"
      :class="{ 'md:!w-6/12': !isGameHistoryRecordDecisionDisplayed }"
      :game-history-record="gameHistoryRecord"
    />

    <GameOverHistoryRecordDecision
      v-if="isGameHistoryRecordDecisionDisplayed"
      id="game-over-history-record-decision"
      class="border border-gray-700 h-full md:w-5/12 p-2 rounded-md w-full"
      :game-history-record="gameHistoryRecord"
    />
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

const isGameHistoryRecordDecisionDisplayed = computed<boolean>(() => {
  const { type } = props.gameHistoryRecord.play;
  const displayedTargetTypes: GamePlayType[] = ["target", "vote", "bury-dead-bodies", "choose-card", "choose-side"];

  return displayedTargetTypes.includes(type) && !didSourceSkipped(props.gameHistoryRecord);
});
</script>