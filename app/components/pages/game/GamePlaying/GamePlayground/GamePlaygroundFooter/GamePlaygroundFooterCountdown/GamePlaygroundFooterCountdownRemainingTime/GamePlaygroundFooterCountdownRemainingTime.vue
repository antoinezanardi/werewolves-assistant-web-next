<template>
  <div
    id="remaining-time"
    class="!tabular-nums antialiased font-semibold text-center tracking-wide"
  >
    {{ remainingTimeAsString }}
  </div>
</template>

<script setup lang="ts">
import type { GamePlaygroundFooterCountdownRemainingTimeProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownRemainingTime/game-playground-footer-countdown-remaining-time.types";

const props = defineProps<GamePlaygroundFooterCountdownRemainingTimeProps>();

const remainingTimeAsString = computed<string>(() => {
  const secondsMaxLength = 2;
  const paddedSeconds = props.seconds.toString().padStart(secondsMaxLength, "0");

  return `${props.minutes}:${paddedSeconds}`;
});
</script>