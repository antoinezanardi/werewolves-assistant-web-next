<template>
  <NuxtLink
    id="create-another-game-button"
    class="me-2 p-button p-button-primary"
    to="/game-lobby"
  >
    <FontAwesomeIcon
      class="me-2"
      icon="gamepad"
    />

    <span>
      {{ $t("components.CreateAnotherGameButton.createAnotherGame") }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>