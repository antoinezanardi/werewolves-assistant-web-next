<template>
  <button
    id="previous-event-text-button"
    ref="previousGameEventTextButton"
    v-p-tooltip.left="buttonTooltipOptions"
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
import { storeToRefs } from "pinia";
import type { TooltipOptions } from "primevue/tooltip";
import type { GameEventPreviousTextButtonEmits, GameEventPreviousTextButtonProps } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventPreviousTextButton/game-event-previous-text-button.types";
import { useAnimateCss } from "~/composables/animate-css/useAnimateCss";
import { useGameStore } from "~/stores/game/useGameStore";
import { useKeyboardStore } from "~/stores/keyboard/useKeyboardStore";

const props = defineProps<GameEventPreviousTextButtonProps>();

const emit = defineEmits<GameEventPreviousTextButtonEmits>();

const previousGameEventTextButton = ref<HTMLButtonElement | null>(null);

const keyboardStore = useKeyboardStore();
const { keyboard } = storeToRefs(keyboardStore);

const img = useImage();

const { animateElementOnce } = useAnimateCss();

const { t } = useI18n();

const gameStore = useGameStore();
const { makingGamePlayStatus } = storeToRefs(gameStore);

const canGoToPreviousGameEventText = computed<boolean>(() => props.currentTextIndex > 0 && makingGamePlayStatus.value !== "pending");

const buttonTooltipOptions = computed<TooltipOptions>(() => {
  const imgUrl = img("svg/keyboard/key-cursor-left.svg");

  return {
    disabled: !canGoToPreviousGameEventText.value,
    value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">${t("shared.actions.back")}</div>
                <img width="35" src="${imgUrl}"/>
            </div>`,
    escape: false,
  };
});

function previousGameEventText(): void {
  emit("click");
}

async function handlePressArrowLeftKey(): Promise<void> {
  previousGameEventText();
  await nextTick();
  void animateElementOnce(previousGameEventTextButton, "headShake");
}

watch(() => keyboard.value.arrowLeft.isPressed, (isKeyPressed: boolean) => {
  if (!isKeyPressed) {
    return;
  }
  void handlePressArrowLeftKey();
});
</script>