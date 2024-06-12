<template>
  <GameEventWithTexts
    id="game-seer-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const canSeerSeeRoles = computed<boolean>(() => game.value.options.roles.seer.canSeeRoles);

const gameEventTexts = computed<string[]>(() => {
  if (canSeerSeeRoles.value) {
    return [t("components.GameSeerTurnStartsEvent.seerSeesRoles")];
  }
  return [t("components.GameSeerTurnStartsEvent.seerSeesSides")];
});

playSoundEffect("mystical-mood");
</script>