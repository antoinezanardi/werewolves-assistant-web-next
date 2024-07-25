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
      @game-event-text-change="onGameEventTextChangeFromGameEventTextsManager"
    />
  </div>
</template>

<script setup lang="ts">
import type { GameEventWithTextsEmits, GameEventWithTextsProps } from "~/components/shared/game/game-event/GameEventWithTexts/game-event-with-texts.types";
import GameEventTextsManager from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventTextsManager.vue";

const props = defineProps<GameEventWithTextsProps>();

const emit = defineEmits<GameEventWithTextsEmits>();

function onGameEventTextChangeFromGameEventTextsManager(newGameEventText: string | undefined): void {
  if (newGameEventText === undefined) {
    return;
  }
  emit("gameEventTextChange", newGameEventText);
}

defineSlots<{
  default: () => void;
}>();
</script>