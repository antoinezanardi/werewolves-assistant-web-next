<template>
  <div
    id="game-event-texts-manager"
    class="flex gap-4 h-1/2 items-center"
  >
    <GameEventPreviousTextButton
      id="game-event-previous-text-button"
      :current-text-index="currentIndex"
      @click="decrementCurrentIndex"
    />

    <div
      id="game-event-text-container"
      class="flex grow h-1/2 items-center justify-center"
    >
      <Transition
        mode="out-in"
        name="fade"
      >
        <p
          id="current-event-text"
          :key="currentGameEventText"
          class="!mb-0 !text-2xl text-center"
        >
          {{ currentGameEventText }}
        </p>
      </Transition>
    </div>

    <GameEventNextTextButton
      id="game-event-next-text-button"
      :can-go-to-next-game-event-text="canGoToNextGameEventText"
      @click="nextEventText"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventNextTextButton from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventNextTextButton/GameEventNextTextButton.vue";
import GameEventPreviousTextButton from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventPreviousTextButton/GameEventPreviousTextButton.vue";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import type { GameEventTextsManagerProps } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/game-event-texts-manager.types";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GameEventTextsManagerProps>();

const gameStore = useGameStore();
const { makingGamePlayStatus } = storeToRefs(gameStore);

const gameEventsStore = useGameEventsStore();
const { goToNextGameEvent } = gameEventsStore;

const currentIndex = ref<number>(0);

const currentGameEventText = computed<string | undefined>(() => props.texts[currentIndex.value]);

const nextGameEventText = computed<string | undefined>(() => props.texts[currentIndex.value + 1]);

const canGoToNextGameEventText = computed<boolean>(() => makingGamePlayStatus.value !== "pending");

function decrementCurrentIndex(): void {
  if (currentIndex.value === 0) {
    return;
  }
  currentIndex.value--;
}

async function nextEventText(): Promise<void> {
  if (!canGoToNextGameEventText.value) {
    return;
  }
  if (nextGameEventText.value === undefined) {
    await goToNextGameEvent();

    return;
  }
  currentIndex.value++;
}
</script>