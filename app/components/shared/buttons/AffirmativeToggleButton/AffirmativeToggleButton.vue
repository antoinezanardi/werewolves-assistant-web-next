<template>
  <PrimeVueToggleButton
    id="affirmative-toggle-button"
    v-model="model"
    off-icon="fa fa-thumbs-down !text-white"
    :off-label="$t('shared.no')"
    on-icon="fa fa-thumbs-up !text-white"
    :on-label="$t('shared.yes')"
  />
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>