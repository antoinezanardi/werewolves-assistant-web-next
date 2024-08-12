<template>
  <GameEventWithTexts
    id="game-wild-child-has-transformed-event"
    :texts="gameWildChildHasTransformedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-wild-child-card"
        :players="event.players"
        svg-icon-path="/svg/role/werewolf.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const isWildChildTransformationRevealed = computed<boolean>(() => game.value.options.roles.wildChild.isTransformationRevealed);

const gameWildChildHasTransformedEventTexts = computed<string[]>(() => {
  if (isWildChildTransformationRevealed.value) {
    return [t("components.GameWildChildHasTransformedEvent.wildChildHasTransformed")];
  }
  return [t("components.GameWildChildHasTransformedEvent.wildChildHasTransformedQuietly")];
});

onMounted(() => {
  if (isWildChildTransformationRevealed.value) {
    playSoundEffect("monkey-cry");
    playSoundEffect("werewolf-transformation");
  }
});
</script>