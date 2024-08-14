<template>
  <FontAwesomeIcon
    id="game-phase-icon"
    :class="phaseIconAndClasses.iconClass"
    :icon="phaseIconAndClasses.icon"
  />
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GamePhaseIconProps } from "~/components/shared/game/game-phase/GamePhaseIcon/game-phase-icon.types";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import type { IconAndIconClass } from "~/utils/types/icon.types";

const props = defineProps<GamePhaseIconProps>();

const phaseIconAndClasses = computed<IconAndIconClass>(() => {
  const phasesIcon: Record<GamePhaseName, IconAndIconClass> = {
    night: {
      icon: "moon",
      iconClass: "text-night",
    },
    day: {
      icon: "sun",
      iconClass: "text-day",
    },
    twilight: {
      icon: "cloud-moon",
      iconClass: "text-twilight",
    },
  };

  return phasesIcon[props.phase];
});
</script>