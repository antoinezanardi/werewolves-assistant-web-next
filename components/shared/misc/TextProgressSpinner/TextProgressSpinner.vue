<template>
  <div
    id="progress-spinner"
    class="align-items-center d-flex flex-column justify-content-center"
  >
    <VuePrimeProgressSpinner :aria-label="text"/>

    <small class="text-progress-spinner-text">{{ text }}</small>
  </div>
</template>

<script setup lang="ts">
import type { TextProgressSpinnerProps } from "~/components/shared/misc/TextProgressSpinner/text-progress-spinner.types";

defineProps<TextProgressSpinnerProps>();
</script>