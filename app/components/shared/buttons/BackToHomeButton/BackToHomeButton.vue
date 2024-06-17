<template>
  <NuxtLink
    id="back-to-home-button"
    class="p-button"
    :class="pButtonClass"
    to="/"
  >
    <i
      class="me-2"
      :class="icon"
    />

    <span>
      {{ $t(textKey) }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BackToHomeButtonProps } from "~/components/shared/buttons/BackToHomeButton/back-to-home-button.types";

withDefaults(defineProps<BackToHomeButtonProps>(), {
  pButtonClass: "p-button-secondary",
  icon: "fas fa-sign-out",
  textKey: "components.BackToHomeButton.backToHome",
});
</script>