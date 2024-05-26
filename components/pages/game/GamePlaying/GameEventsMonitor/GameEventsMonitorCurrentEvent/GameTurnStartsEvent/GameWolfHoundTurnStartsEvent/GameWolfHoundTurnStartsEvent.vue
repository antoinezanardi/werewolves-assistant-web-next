<template>
  <GameEventWithTexts
    id="game-wolf-hound-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const isWolfHoundSideRandomlyChosen = computed<boolean>(() => game.value.options.roles.wolfHound.isSideRandomlyChosen);

const gameEventTexts = computed<string[]>(() => {
  if (isWolfHoundSideRandomlyChosen.value) {
    return [t("components.GameWolfHoundTurnStartsEvent.wolfHoundSideRandomlyChosen")];
  }
  return [t("components.GameWolfHoundTurnStartsEvent.wolfHoundChoosesSide")];
});
</script>