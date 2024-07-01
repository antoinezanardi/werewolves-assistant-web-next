<template>
  <div
    id="dialog-header-title-only"
    class="w-full"
  >
    <h2 id="game-lobby-options-hub-header-title">
      <i
        v-if="props.iconClass"
        id="game-lobby-options-hub-header-title-icon"
        class="me-3"
        :class="props.iconClass"
      />

      <span id="game-lobby-options-hub-header-title-text">
        {{ props.title }}
      </span>
    </h2>

    <VuePrimeDivider class="!my-2"/>
  </div>
</template>

<script setup lang="ts">
import type { DialogHeaderTitleOnlyProps } from "~/components/shared/dialogs/DialogHeaderTitleOnly/dialog-header-title-only.types";

const props = defineProps<DialogHeaderTitleOnlyProps>();
</script>