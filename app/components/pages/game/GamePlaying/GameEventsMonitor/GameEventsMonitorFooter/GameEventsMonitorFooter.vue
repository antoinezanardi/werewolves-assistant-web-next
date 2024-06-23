<template>
  <div id="game-events-monitor-footer">
    <VuePrimeDivider class="!my-2"/>

    <div class="flex gap-6 justify-center">
      <VuePrimeButton
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

        <span class="text-center w-11/12">
          {{ $t('components.GameEventsMonitorFooter.previous') }}
        </span>
      </VuePrimeButton>

      <VuePrimeButton
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

        <span class="text-center w-11/12">{{ $t('components.GameEventsMonitorFooter.skip') }}</span>
      </VuePrimeButton>
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
  const keyCursorLeftImgUrl = img("svg/keyboard/key-cursor-left.svg");
  const keyShiftImgUrl = img("svg/keyboard/key-shift.svg");

  return {
    value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">${t("components.GameEventsMonitorFooter.goBackToPreviousGameEvent")}</div>
                <div class="flex gap-2 items-center">
                  <img height="40" src="${keyShiftImgUrl}"/>
                  <img height="40" src="${keyCursorLeftImgUrl}"/>
                </div>
            </div>`,
    escape: false,
    fitContent: false,
  };
});

const nextEventButtonTooltipOptions = computed<TooltipOptions>(() => {
  const keyCursorRightImgUrl = img("svg/keyboard/key-cursor-right.svg");
  const keyShiftImgUrl = img("svg/keyboard/key-shift.svg");

  return {
    value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">${t("components.GameEventsMonitorFooter.skipCurrentGameEvent")}</div>
                <div class="flex gap-2 items-center">
                  <img height="40" src="${keyShiftImgUrl}"/>
                  <img height="40" src="${keyCursorRightImgUrl}"/>
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