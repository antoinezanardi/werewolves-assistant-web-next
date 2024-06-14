<template>
  <div
    id="progress-spinner"
    class="flex flex-col items-center justify-center"
  >
    <VuePrimeProgressSpinner :aria-label="text"/>

    <small class="text-progress-spinner-text">{{ text }}</small>
  </div>
</template>

<script setup lang="ts">
import type { TextProgressSpinnerProps } from "~/components/shared/misc/TextProgressSpinner/text-progress-spinner.types";

defineProps<TextProgressSpinnerProps>();
</script>