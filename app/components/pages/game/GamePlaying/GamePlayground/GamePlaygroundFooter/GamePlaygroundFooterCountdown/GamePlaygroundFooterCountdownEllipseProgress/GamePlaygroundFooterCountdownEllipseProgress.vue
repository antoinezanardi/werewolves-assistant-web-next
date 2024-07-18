<template>
  <div id="game-playground-footer-countdown-ellipse-progress">
    <VueEllipseProgress
      id="vue-ellipse-progress"
      :color="gradientProgressColor"
      font-size="0"
      :progress="progress"
      reverse
      :size="20"
      :thickness="4"
    />
  </div>
</template>

<script setup lang="ts">
import Gradient from "javascript-color-gradient";
import type { GamePlaygroundFooterCountdownEllipseProgressProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownEllipseProgress/game-playground-footer-countdown-ellipse-progress.types";

const props = defineProps<GamePlaygroundFooterCountdownEllipseProgressProps>();

const gradientProgressColorCount = 101;

const gradientProgressColors = new Gradient()
  .setColorGradient("#f10d40", "#3f79ff")
  .setMidpoint(gradientProgressColorCount)
  .getColors();

const progress = computed<number>(() => {
  const hundredPercent = 100;

  return Math.floor(props.remainingSeconds / props.totalSeconds * hundredPercent);
});

const gradientProgressColor = computed<string>(() => gradientProgressColors[progress.value]);
</script>