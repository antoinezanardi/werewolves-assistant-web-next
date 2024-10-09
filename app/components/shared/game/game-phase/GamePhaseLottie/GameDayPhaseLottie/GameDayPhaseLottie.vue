<template>
  <VueLottie
    id="game-day-phase-lottie"
    :animation-data="sunLottie"
    :height="height"
    :width="width"
  />
</template>

<script setup lang="ts">
import type { LottieProps } from "vue3-lottie";

import sunLottie from "~/assets/lottie/sun.json";

defineProps<Partial<Pick<LottieProps, "height" | "width">>>();
</script>