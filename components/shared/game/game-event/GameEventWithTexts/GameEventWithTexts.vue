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

    <div
      id="game-event-text-manager"
      class="flex gap-4 h-1/2 items-center"
    >
      <button
        id="previous-event-text-button"
        class="ps-4"
        :class="{ 'text-gray-500': !canGoToPreviousGameEventText }"
        :disabled="!canGoToPreviousGameEventText"
        type="button"
        @click.prevent="previousGameEventText"
      >
        <i class="fa fa-3x fa-chevron-left"/>
      </button>

      <div
        id="game-event-text-container"
        class="flex grow h-1/2 items-center justify-center"
      >
        <transition
          mode="out-in"
          name="fade"
        >
          <p
            :key="currentGameEventText"
            class="!mb-0 !text-2xl text-center"
          >
            {{ currentGameEventText }}
          </p>
        </transition>
      </div>

      <button
        id="next-event-text-button"
        class="pe-4"
        type="button"
        @click.prevent="nextEventText"
      >
        <i class="fa fa-3x fa-chevron-right"/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameEventWithTextsProps } from "~/components/shared/game/game-event/GameEventWithTexts/game-event-with-texts.types";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const props = defineProps<GameEventWithTextsProps>();

defineSlots<{
  default: () => void;
}>();

const gameEventsStore = useGameEventsStore();
const { goToNextGameEvent } = gameEventsStore;

const currentIndex = ref<number>(0);

const currentGameEventText = computed<string | undefined>(() => props.texts[currentIndex.value]);

const canGoToPreviousGameEventText = computed<boolean>(() => currentIndex.value > 0);

function nextEventText(): void {
  currentIndex.value++;
  if (currentGameEventText.value === undefined) {
    goToNextGameEvent();
  }
}

function previousGameEventText(): void {
  currentIndex.value--;
}
</script>