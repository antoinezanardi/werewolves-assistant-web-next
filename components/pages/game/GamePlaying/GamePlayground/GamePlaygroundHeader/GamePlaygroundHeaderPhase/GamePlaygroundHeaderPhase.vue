<template>
  <div
    id="game-playground-header-phase"
    class="flex items-center"
  >
    <GamePhaseIcon
      class="fa-2x me-3"
      :phase="game.phase.name"
    />

    <span
      id="game-phase-text"
      class="text-2xl"
    >
      {{ getGamePhaseWithTurnText(game.phase.name, game.turn) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GamePhaseIcon from "~/components/shared/game/game-phase/GamePhaseIcon/GamePhaseIcon.vue";
import { useGamePhase } from "~/composables/api/game/game-phase/useGamePhase";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getGamePhaseWithTurnText } = useGamePhase();
</script>