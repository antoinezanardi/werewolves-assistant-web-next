<template>
  <div id="game-events-monitor-footer">
    <VuePrimeDivider class="!my-2"/>

    <div class="flex gap-6 justify-center">
      <VuePrimeButton
        id="previous-event-button"
        v-p-tooltip="$t('components.GameEventsMonitorFooter.goBackToPreviousGameEvent')"
        class="w-56"
        :disabled="!canGoToPreviousGameEvent"
        icon="fa fa-step-backward"
        :label="$t('components.GameEventsMonitorFooter.previous')"
        severity="secondary"
        @click="handlePreviousGameEventClick"
      />

      <VuePrimeButton
        id="skip-current-event-button"
        v-p-tooltip="$t('components.GameEventsMonitorFooter.skipCurrentGameEvent')"
        class="w-56"
        :disabled="!canGoToNextGameEvent"
        icon="fa fa-step-forward"
        :label="$t('components.GameEventsMonitorFooter.skip')"
        :loading="!canGoToNextGameEvent"
        severity="secondary"
        @click="handleNextGameEventClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const gameEventsStore = useGameEventsStore();
const { canGoToNextGameEvent, canGoToPreviousGameEvent } = storeToRefs(gameEventsStore);
const { goToNextGameEvent, goToPreviousGameEvent } = gameEventsStore;

function handlePreviousGameEventClick(): void {
  goToPreviousGameEvent();
}

async function handleNextGameEventClick(): Promise<void> {
  await goToNextGameEvent();
}
</script>