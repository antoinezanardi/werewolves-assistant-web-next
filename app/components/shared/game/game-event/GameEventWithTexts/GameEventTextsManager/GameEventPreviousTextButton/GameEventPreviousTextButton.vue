<template>
  <button
    id="previous-event-text-button"
    v-p-tooltip.top="previousGameEventTextTooltip"
    :aria-label="$t('components.GameEventPreviousTextButton.previousEventText')"
    class="ps-4"
    :class="{ 'text-gray-500': !canGoToPreviousGameEventText }"
    :disabled="!canGoToPreviousGameEventText"
    type="button"
    @click.prevent="previousGameEventText"
  >
    <i class="fa fa-3x fa-chevron-left"/>
  </button>
</template>

<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { GameEventPreviousTextButtonEmits, GameEventPreviousTextButtonProps } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventPreviousTextButton/game-event-previous-text-button.types";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GameEventPreviousTextButtonProps>();

const emit = defineEmits<GameEventPreviousTextButtonEmits>();

const { shift, arrowleft } = useMagicKeys();

const { t } = useI18n();

const gameStore = useGameStore();
const { makingGamePlayStatus } = storeToRefs(gameStore);

const gameEventsStore = useGameEventsStore();
const { goToPreviousGameEvent } = gameEventsStore;

const canGoToPreviousGameEventText = computed<boolean>(() => props.currentTextIndex > 0 && makingGamePlayStatus.value !== "pending");

const previousGameEventTextTooltip = computed<string>(() => {
  if (!canGoToPreviousGameEventText.value) {
    return "";
  }
  return t("shared.actions.back");
});

function previousGameEventText(): void {
  emit("click");
}

function handlePressArrowLeftKey(): void {
  if (shift.value) {
    goToPreviousGameEvent();

    return;
  }
  previousGameEventText();
}

watch(() => arrowleft.value, (isKeyPressed: boolean) => {
  if (!isKeyPressed) {
    return;
  }
  handlePressArrowLeftKey();
});
</script>