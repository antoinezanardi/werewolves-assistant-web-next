<template>
  <div
    id="game-events-with-texts"
    class="flex flex-col"
  >
    <div
      id="game-event-text-manager"
      class="flex"
    >
      <button
        id="previous-event-text-button"
        type="button"
        @click.prevent="previousGameEventText"
      >
        <i class="fa fa-2x fa-chevron-left"/>
      </button>

      <p class="grow">
        {{ currentGameEventText }}
      </p>

      <button
        id="next-event-text-button"
        type="button"
        @click.prevent="nextEventText"
      >
        <i class="fa fa-2x fa-chevron-right"/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameEventWithTextsProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameEventWithTexts/game-event-with-texts.types";

const props = defineProps<GameEventWithTextsProps>();

const currentIndex = ref<number>(0);

const currentGameEventText = computed<string | undefined>(() => props.texts[currentIndex.value]);

function nextEventText(): void {
  currentIndex.value++;
}

function previousGameEventText(): void {
  currentIndex.value--;
}
</script>