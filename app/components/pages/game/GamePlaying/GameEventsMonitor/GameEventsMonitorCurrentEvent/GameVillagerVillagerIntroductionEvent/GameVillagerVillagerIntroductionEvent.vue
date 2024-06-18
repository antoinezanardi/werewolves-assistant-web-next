<template>
  <GameEventWithTexts
    id="game-sheriff-promotion-event"
    :texts="gameVillagerVillagerIntroductionEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="villagerVillagerInPlayers"
        id="game-event-flipping-sheriff-card"
        :players="[villagerVillagerInPlayers]"
        svg-icon-path="svg/game/player/player-attribute/seen.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGamePlayers } from "~/composables/api/game/useGamePlayers";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { getPlayersWithCurrentRole } = useGamePlayers(game);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const villagerVillagerInPlayers = computed<Player | undefined>(() => getPlayersWithCurrentRole("villager-villager")[0]);

const gameVillagerVillagerIntroductionEventTexts = computed<string[]>(() => {
  if (!villagerVillagerInPlayers.value) {
    return [t("components.GameVillagerVillagerIntroductionEvent.cantFindVillagerVillager")];
  }
  return [
    t("components.GameVillagerVillagerIntroductionEvent.villagerVillagerIntroduction", { playerName: villagerVillagerInPlayers.value.name }),
    t("components.GameVillagerVillagerIntroductionEvent.goodPlayerForSheriff"),
  ];
});

playSoundEffect("clearing-throat-and-bell-dings");
</script>