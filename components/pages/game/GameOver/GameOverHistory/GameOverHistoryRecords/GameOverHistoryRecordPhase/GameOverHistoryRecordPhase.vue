<template>
  <div
    id="game-over-history-record-phase"
    class="flex flex-col item-center justify-center text-center"
  >
    <GamePhaseIcon
      :phase="gameHistoryRecord.phase"
    />

    <div
      id="game-phase-text"
      class="text-md"
    >
      {{ getGamePhaseWithTurnText(gameHistoryRecord.phase, gameHistoryRecord.turn) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameOverHistoryRecordPhaseProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordPhase/game-over-history-record-phase.types";
import GamePhaseIcon from "~/components/shared/game/game-phase/GamePhaseIcon/GamePhaseIcon.vue";
import { useGamePhase } from "~/composables/api/game/game-phase/useGamePhase";

defineProps<GameOverHistoryRecordPhaseProps>();

const { getGamePhaseWithTurnText } = useGamePhase();
</script>