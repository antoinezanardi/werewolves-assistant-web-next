<template>
  <div
    id="game-event-texts-manager"
    class="flex gap-4 h-1/2 items-center"
  >
    <button
      id="previous-event-text-button"
      v-p-tooltip.top="previousGameEventTextTooltip"
      :aria-label="$t('components.GameEventTextsManager.previousEventText')"
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
          id="current-event-text"
          :key="currentGameEventText"
          class="!mb-0 !text-2xl text-center"
        >
          {{ currentGameEventText }}
        </p>
      </transition>
    </div>

    <button
      id="next-event-text-button"
      v-p-tooltip.top="$t('shared.actions.next')"
      :aria-label="$t('components.GameEventTextsManager.nextEventText')"
      class="pe-4"
      type="button"
      @click.prevent="nextEventText"
    >
      <i class="fa fa-3x fa-chevron-right"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import type { GameEventTextsManagerProps } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/game-event-texts-manager.types";

const props = defineProps<GameEventTextsManagerProps>();

const { t } = useI18n();

const gameEventsStore = useGameEventsStore();
const { goToNextGameEvent } = gameEventsStore;

const currentIndex = ref<number>(0);

const currentGameEventText = computed<string | undefined>(() => props.texts[currentIndex.value]);

const canGoToPreviousGameEventText = computed<boolean>(() => currentIndex.value > 0);

const previousGameEventTextTooltip = computed<string>(() => {
  if (canGoToPreviousGameEventText.value) {
    return t("shared.actions.back");
  }
  return "";
});

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