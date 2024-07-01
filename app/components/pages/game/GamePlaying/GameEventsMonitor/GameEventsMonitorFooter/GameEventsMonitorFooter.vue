<template>
  <div id="game-events-monitor-footer">
    <PrimeVueDivider class="!my-2"/>

    <div class="flex gap-6 justify-center">
      <PrimeVueButton
        id="previous-event-button"
        v-p-tooltip="previousEventButtonTooltipOptions"
        class="flex w-56"
        :disabled="!canGoToPreviousGameEvent"
        severity="secondary"
        @click="handlePreviousGameEventClick"
      >
        <i
          id="previous-event-button-icon"
          ref="previousEventButtonIcon"
          class="fa fa-step-backward w-1/12"
        />

        <span
          id="previous-event-button-text"
          class="text-center w-11/12"
        >
          {{ $t('components.GameEventsMonitorFooter.previous') }}
        </span>
      </PrimeVueButton>

      <PrimeVueButton
        id="skip-current-event-button"
        v-p-tooltip="nextEventButtonTooltipOptions"
        class="w-56"
        :disabled="!canGoToNextGameEvent"
        :loading="!canGoToNextGameEvent"
        severity="secondary"
        @click="handleNextGameEventClick"
      >
        <i
          id="skip-current-event-button-icon"
          ref="skipCurrentEventButtonIcon"
          class="fa fa-step-forward w-1/12"
        />

        <span
          id="skip-current-event-button-text"
          class="text-center w-11/12"
        >
          {{ $t('components.GameEventsMonitorFooter.skip') }}
        </span>
      </PrimeVueButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TooltipOptions } from "primevue/tooltip";
import { useAnimateCss } from "~/composables/animate-css/useAnimateCss";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { useKeyboardStore } from "~/stores/keyboard/useKeyboardStore";

const previousEventButtonIcon = ref<HTMLElement | null>(null);
const skipCurrentEventButtonIcon = ref<HTMLElement | null>(null);

const img = useImage();

const gameEventsStore = useGameEventsStore();
const { canGoToNextGameEvent, canGoToPreviousGameEvent } = storeToRefs(gameEventsStore);
const { goToNextGameEvent, goToPreviousGameEvent } = gameEventsStore;

const keyboardStore = useKeyboardStore();
const { keyboard } = storeToRefs(keyboardStore);

const { animateElementOnce } = useAnimateCss();

const { t } = useI18n();

const previousEventButtonTooltipOptions = computed<TooltipOptions>(() => {
  const leftCursorKeyImgUrl = img("svg/keyboard/left-cursor-key.svg");
  const shiftKeyImgUrl = img("svg/keyboard/shift-key.svg");

  return {
    value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">${t("components.GameEventsMonitorFooter.goBackToPreviousGameEvent")}</div>
                <div class="flex gap-2 items-center">
                  <img height="40" alt="${t("shared.keyboard.shiftKey")}" src="${shiftKeyImgUrl}"/>
                  <img height="40" alt="${t("shared.keyboard.leftArrowKey")}" src="${leftCursorKeyImgUrl}"/>
                </div>
            </div>`,
    escape: false,
    fitContent: false,
  };
});

const nextEventButtonTooltipOptions = computed<TooltipOptions>(() => {
  const rightCursorKeyImgUrl = img("svg/keyboard/right-cursor-key.svg");
  const shiftKeyImgUrl = img("svg/keyboard/shift-key.svg");

  return {
    value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">${t("components.GameEventsMonitorFooter.skipCurrentGameEvent")}</div>
                <div class="flex gap-2 items-center">
                  <img height="40" alt="${t("shared.keyboard.shiftKey")}" src="${shiftKeyImgUrl}"/>
                  <img height="40" alt="${t("shared.keyboard.rightArrowKey")}" src="${rightCursorKeyImgUrl}"/>
                </div>
            </div>`,
    escape: false,
    fitContent: false,
  };
});

function handlePreviousGameEventClick(): void {
  if (!canGoToPreviousGameEvent.value) {
    return;
  }
  goToPreviousGameEvent();
  void animateElementOnce(previousEventButtonIcon, "headShake");
}

async function handleNextGameEventClick(): Promise<void> {
  if (!canGoToNextGameEvent.value) {
    return;
  }
  await goToNextGameEvent();
  void animateElementOnce(skipCurrentEventButtonIcon, "headShake");
}

watch(() => keyboard.value.arrowRight.isPressed, (isKeyPressed: boolean) => {
  if (!isKeyPressed || !keyboard.value.shift.isPressed) {
    return;
  }
  void handleNextGameEventClick();
});

watch(() => keyboard.value.arrowLeft.isPressed, (isKeyPressed: boolean) => {
  if (!isKeyPressed || !keyboard.value.shift.isPressed) {
    return;
  }
  handlePreviousGameEventClick();
});
</script>