<template>
  <button
    id="next-event-text-button"
    v-p-tooltip.top="$t('shared.actions.next')"
    :aria-label="$t('components.GameEventTextsManager.nextEventText')"
    class="pe-4"
    :class="{ 'text-gray-500': !canGoToNextGameEventText }"
    :disabled="!canGoToNextGameEventText"
    type="button"
    @click.prevent="nextEventText"
  >
    <i class="fa fa-3x fa-chevron-right"/>
  </button>
</template>

<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { GameEventNextTextButtonEmits } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventNextTextButton/game-event-next-text-button.types";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { useGameStore } from "~/stores/game/useGameStore";

const emit = defineEmits<GameEventNextTextButtonEmits>();

const { shift, arrowright } = useMagicKeys();

const gameStore = useGameStore();
const { makingGamePlayStatus } = storeToRefs(gameStore);

const gameEventsStore = useGameEventsStore();
const { goToNextGameEvent } = gameEventsStore;

const canGoToNextGameEventText = computed<boolean>(() => makingGamePlayStatus.value !== "pending");

function nextEventText(): void {
  emit("click");
}

async function handlePressArrowRightKey(): Promise<void> {
  if (shift.value) {
    await goToNextGameEvent();

    return;
  }
  nextEventText();
}

watch(() => arrowright.value, async(isKeyPressed: boolean) => {
  if (!isKeyPressed || !canGoToNextGameEventText.value) {
    return;
  }
  await handlePressArrowRightKey();
});
</script>