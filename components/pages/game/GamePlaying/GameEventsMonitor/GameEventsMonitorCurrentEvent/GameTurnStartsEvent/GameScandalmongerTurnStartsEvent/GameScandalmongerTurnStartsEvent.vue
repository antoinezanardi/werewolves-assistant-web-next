<template>
  <GameEventWithTexts
    id="game-scandalmonger-turn-starts-event"
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

const scandalmongerMarkPenalty = computed<number>(() => game.value.options.roles.scandalmonger.markPenalty);

const gameEventTexts = computed<string[]>(() => {
  const tComponentKey = "GameScandalmongerTurnStartsEvent";

  return [
    t(`components.${tComponentKey}.scandalmongerCanMarkPlayer`),
    t(`components.${tComponentKey}.playerWillHavePenaltyForNextVotes`, { penalty: scandalmongerMarkPenalty.value }, scandalmongerMarkPenalty.value),
  ];
});
</script>