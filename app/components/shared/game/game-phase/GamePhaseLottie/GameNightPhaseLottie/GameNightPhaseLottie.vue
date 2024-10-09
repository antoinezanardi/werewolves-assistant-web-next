<template>
  <VueLottie
    id="game-night-phase-lottie"
    :animation-data="moonLottie"
    :height="height"
    :width="width"
  />
</template>

<script setup lang="ts">
import type { LottieProps } from "vue3-lottie";

import moonLottie from "~/assets/lottie/moon.json";

defineProps<Partial<Pick<LottieProps, "height" | "width">>>();
</script>