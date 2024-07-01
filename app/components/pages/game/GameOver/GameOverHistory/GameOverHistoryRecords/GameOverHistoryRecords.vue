<template>
  <PrimeVueTimeline
    id="game-over-history-records"
    align="left"
    class="w-full"
    :pt="{ 'opposite': '!flex-none !w-24' }"
    :value="gameHistoryRecords"
  >
    <template #opposite="slotProps">
      <GameOverHistoryRecordPhase
        class="game-over-history-record-phase w-full"
        :game-history-record="slotProps.item"
      />
    </template>

    <template #marker="slotProps">
      <GameOverHistoryRecordIcon
        class="game-over-history-record-icon"
        :game-history-record="slotProps.item"
      />
    </template>

    <template #content="slotProps">
      <GameOverHistoryRecord
        class="game-over-history-record"
        :game-history-record="slotProps.item"
      />

      <PrimeVueDivider class="!my-4"/>
    </template>
  </PrimeVueTimeline>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameOverHistoryRecord from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecord.vue";
import GameOverHistoryRecordIcon from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordIcon/GameOverHistoryRecordIcon.vue";
import GameOverHistoryRecordPhase from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordPhase/GameOverHistoryRecordPhase.vue";
import { useGameHistoryRecordsStore } from "~/stores/game/game-history-record/useGameHistoryRecordsStore";

const gameHistoryRecordsStore = useGameHistoryRecordsStore();
const { gameHistoryRecords } = storeToRefs(gameHistoryRecordsStore);
</script>