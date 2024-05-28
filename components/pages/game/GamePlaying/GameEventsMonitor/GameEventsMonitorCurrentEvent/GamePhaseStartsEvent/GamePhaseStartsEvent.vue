<template>
  <GameEventWithTexts
    id="game-phase-starts-event"
    :texts="gamePhaseStartsEventTexts"
  >
    <div
      id="game-phase-lottie-container"
      class="flex h-full items-center justify-center"
    >
      <transition
        mode="out-in"
        name="phase-transition"
      >
        <GameDayPhaseLottie
          v-if="displayedPhase === 'day'"
          id="game-day-phase-lottie"
          :height="sunLottieSize"
          :width="sunLottieSize"
        />

        <GameNightPhaseLottie
          v-else-if="displayedPhase === 'night'"
          id="game-night-phase-lottie"
          :height="moonLottieSize"
          :width="moonLottieSize"
        />
      </transition>
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import GameDayPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameDayPhaseLottie/GameDayPhaseLottie.vue";
import GameNightPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameNightPhaseLottie/GameNightPhaseLottie.vue";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const moonLottieSize = "200px";

const sunLottieSize = "250px";

const isPhaseTransitionTriggered = ref<boolean>(false);

const displayedPhase = computed<GamePhaseName>(() => {
  if (isPhaseTransitionTriggered.value) {
    return game.value.phase.name;
  }
  return game.value.phase.name === "day" ? "night" : "day";
});

const gamePhaseStartsEventTexts = computed<string[]>(() => {
  if (game.value.phase.name === "day") {
    return [t("components.GamePhaseStartsEvent.dayRises")];
  }
  return [t("components.GamePhaseStartsEvent.nightFalls")];
});

function triggerPhaseTransition(): void {
  isPhaseTransitionTriggered.value = true;
}

function triggerPhaseTransitionTimeout(): void {
  const timeoutInMs = 1000;

  window.setTimeout(triggerPhaseTransition, timeoutInMs);
}

triggerPhaseTransitionTimeout();
</script>

<style scoped lang="scss">
.phase-transition-enter-active, .phase-transition-leave-active {
  transition: all 0.75s ease;
}

.phase-transition-enter-from,
.phase-transition-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>