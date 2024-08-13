<template>
  <button
    id="next-event-text-button"
    ref="nextGameEventTextButton"
    v-p-tooltip.right="buttonTooltipOptions"
    :aria-label="$t('components.GameEventNextTextButton.nextEventText')"
    class="pe-4"
    :class="{ 'text-gray-500': !canGoToNextGameEventText }"
    :disabled="!canGoToNextGameEventText"
    type="button"
    @click.prevent="onClickFromNextEventTextButton"
  >
    <FontAwesomeIcon
      class="fa-3x"
      icon="chevron-right"
    />
  </button>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import type { TooltipOptions } from "primevue/tooltip";
import type { GameEventNextTextButtonEmits } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventNextTextButton/game-event-next-text-button.types";
import { useAnimateCss } from "~/composables/animate-css/useAnimateCss";
import { useGameStore } from "~/stores/game/useGameStore";
import { useKeyboardStore } from "~/stores/keyboard/useKeyboardStore";

const emit = defineEmits<GameEventNextTextButtonEmits>();

const keyboardStore = useKeyboardStore();
const { keyboard } = storeToRefs(keyboardStore);

const nextGameEventTextButton = ref<HTMLButtonElement | null>(null);

const img = useImage();

const gameStore = useGameStore();
const { makingGamePlayStatus } = storeToRefs(gameStore);

const { animateElementOnce } = useAnimateCss();

const { t } = useI18n();

const canGoToNextGameEventText = computed<boolean>(() => makingGamePlayStatus.value !== "pending");

const buttonTooltipOptions = computed<TooltipOptions>(() => {
  const imgUrl = img("svg/keyboard/right-cursor-key.svg");

  return {
    value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">${t("shared.actions.next")}</div>
                <img width="35" alt="${t("shared.keyboard.rightArrowKey")}" src="${imgUrl}"/>
            </div>`,
    escape: false,
  };
});

function onClickFromNextEventTextButton(): void {
  emit("click");
}

function onPressArrowRightKey(): void {
  onClickFromNextEventTextButton();
  void animateElementOnce(nextGameEventTextButton, "headShake");
}

watch(() => keyboard.value.arrowRight.isPressed, (isKeyPressed: boolean) => {
  if (!isKeyPressed || !canGoToNextGameEventText.value) {
    return;
  }
  onPressArrowRightKey();
});
</script>