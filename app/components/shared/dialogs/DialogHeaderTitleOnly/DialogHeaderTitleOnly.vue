<template>
  <div
    id="dialog-header-title-only"
    class="w-full"
  >
    <h2 id="game-lobby-options-hub-header-title">
      <FontAwesomeIcon
        id="game-lobby-options-hub-header-title-icon"
        class="me-2"
        :class="iconClass"
        :icon="icon"
      />

      <span id="game-lobby-options-hub-header-title-text">
        {{ props.title }}
      </span>
    </h2>

    <PrimeVueDivider class="!my-2"/>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { DialogHeaderTitleOnlyProps } from "~/components/shared/dialogs/DialogHeaderTitleOnly/dialog-header-title-only.types";

const props = defineProps<DialogHeaderTitleOnlyProps>();
</script>