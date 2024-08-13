<template>
  <PrimeVueToggleButton
    id="affirmative-toggle-button"
    v-model="model"
    :off-label="$t('shared.no')"
    :on-label="$t('shared.yes')"
  >
    <template #icon>
      <FontAwesomeIcon
        :icon="icon"
      />
    </template>
  </PrimeVueToggleButton>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const model = defineModel<boolean>();

const icon = computed(() => (model.value === true ? "thumbs-up" : "thumbs-down"));
</script>