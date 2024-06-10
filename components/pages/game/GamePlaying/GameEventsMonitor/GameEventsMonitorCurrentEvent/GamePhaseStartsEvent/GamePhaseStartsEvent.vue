<template>
  <GameEventWithTexts
    id="game-phase-starts-event"
    :texts="gamePhaseStartsEventTexts"
  >
    <div
      id="game-phase-lottie-container"
      class="flex h-full items-center justify-center"
    >
      <Transition
        mode="out-in"
        name="phase-transition"
      >
        <Component
          :is="displayedPhaseLottieComponent"
          :key="displayedPhase"
          :height="displayedPhaseLottieSize"
          :width="displayedPhaseLottieSize"
        />
      </Transition>
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import GameDayPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameDayPhaseLottie/GameDayPhaseLottie.vue";
import GameNightPhaseLottie from "~/components/shared/game/game-phase/GamePhaseLottie/GameNightPhaseLottie/GameNightPhaseLottie.vue";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import type { SoundEffectName } from "~/stores/audio/types/audio.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { playSoundEffect } = useAudioStore();

const { t } = useI18n();

const isPhaseTransitionTriggered = ref<boolean>(false);

const displayedPhase = computed<GamePhaseName>(() => {
  if (isPhaseTransitionTriggered.value) {
    return game.value.phase.name;
  }
  return game.value.phase.name === "day" ? "night" : "day";
});

const displayedPhaseLottieComponent = computed<typeof GameDayPhaseLottie | typeof GameNightPhaseLottie>(() => {
  if (displayedPhase.value === "day") {
    return GameDayPhaseLottie;
  }
  return GameNightPhaseLottie;
});

const displayedPhaseLottieSize = computed<string>(() => {
  if (displayedPhase.value === "day") {
    return "250px";
  }
  return "200px";
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

function playPhaseSoundEffect(): void {
  const phaseSoundEffect: SoundEffectName = game.value.phase.name === "day" ? "cocorico" : "supernatural-mood";
  playSoundEffect(phaseSoundEffect);
}

triggerPhaseTransitionTimeout();
playPhaseSoundEffect();
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