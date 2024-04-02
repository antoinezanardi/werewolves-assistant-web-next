<template>
  <i
    id="game-phase-icon"
    :class="phaseIcon"
  />
</template>

<script setup lang="ts">
import type { GamePhaseIconProps } from "~/components/shared/game/game-phase/GamePhaseIcon/game-phase-icon.types";
import type { GamePhase } from "~/composables/api/game/types/game.types";

const props = defineProps<GamePhaseIconProps>();

const phaseIcon = computed<string>(() => {
  const phasesIcon: Record<GamePhase, string> = {
    night: "fa fa-moon text-night",
    day: "fa fa-sun text-day",
  };

  return phasesIcon[props.phase];
});
</script>