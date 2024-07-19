<template>
  <GameEventWithTexts
    id="game-elder-has-taken-revenge-event"
    :texts="gameElderHasTakenRevengeEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="elderInPlayers"
        id="game-event-flipping-elder-card"
        :players="[elderInPlayers]"
        svg-icon-path="svg/misc/storm.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { storeToRefs } from "pinia";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGamePlayers } from "~/composables/api/game/useGamePlayers";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getPlayersWithCurrentRole } = useGamePlayers(game);

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const elderInPlayers = computed<Player | undefined>(() => getPlayersWithCurrentRole("elder")[0]);

const gameElderHasTakenRevengeEventTexts = computed<string[]>(() => {
  if (!elderInPlayers.value) {
    return [t("components.GameElderHasTakenRevengeEvent.cantFindElder")];
  }
  return [
    t("components.GameElderHasTakenRevengeEvent.elderHasBeenMurderedByVillager"),
    t("components.GameElderHasTakenRevengeEvent.elderHasTakenRevenge"),
  ];
});

playSoundEffect("thunder");
</script>