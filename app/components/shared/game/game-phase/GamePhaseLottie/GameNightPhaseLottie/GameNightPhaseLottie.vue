<template>
  <VueLottie
    id="game-night-phase-lottie"
    :animation-data="moonLottie"
    :height="height"
    :width="width"
  />
</template>

<script setup lang="ts">
import moonLottie from "~/assets/lottie/moon.json";
import type { LottieProps } from "vue3-lottie";

defineProps<Partial<Pick<LottieProps, "height" | "width">>>();
</script>