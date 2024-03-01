<template>
  <div
    id="game-playground-header-phase"
    class="flex items-center"
  >
    <i
      id="game-phase-icon"
      class="fa-2x me-3"
      :class="phaseIcon"
    />

    <span
      id="game-phase-text"
      class="text-2xl"
    >
      {{ phaseText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GamePhase } from "~/composables/api/game/types/game.types";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const phaseText = computed<string>(() => {
  const { phase, turn } = game.value;

  return `${t(`shared.game.phase.${phase}`)} ${turn}`;
});

const phaseIcon = computed<string>(() => {
  const { phase } = game.value;
  const phasesIcon: Record<GamePhase, string> = {
    night: "fa fa-moon text-night",
    day: "fa fa-sun text-day",
  };

  return phasesIcon[phase];
});
</script>