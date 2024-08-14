<template>
  <NuxtLink
    id="back-to-home-button"
    class="p-button"
    :class="pButtonClass"
    to="/"
  >
    <FontAwesomeIcon
      :icon="icon"
    />

    <span>
      {{ $t(textKey) }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { BackToHomeButtonProps } from "~/components/shared/buttons/BackToHomeButton/back-to-home-button.types";

withDefaults(defineProps<BackToHomeButtonProps>(), {
  pButtonClass: "p-button-secondary",
  icon: "sign-out",
  textKey: "components.BackToHomeButton.backToHome",
});
</script>