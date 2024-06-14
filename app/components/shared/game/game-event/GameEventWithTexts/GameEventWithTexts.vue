<template>
  <div
    id="game-event-with-texts"
    class="flex flex-col h-full"
  >
    <div
      id="game-event-default-slot-container"
      class="grow"
    >
      <slot/>
    </div>

    <GameEventTextsManager
      id="game-event-texts-manager"
      :texts="props.texts"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameEventWithTextsProps } from "~/components/shared/game/game-event/GameEventWithTexts/game-event-with-texts.types";
import GameEventTextsManager from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventTextsManager.vue";

const props = defineProps<GameEventWithTextsProps>();

defineSlots<{
  default: () => void;
}>();
</script>