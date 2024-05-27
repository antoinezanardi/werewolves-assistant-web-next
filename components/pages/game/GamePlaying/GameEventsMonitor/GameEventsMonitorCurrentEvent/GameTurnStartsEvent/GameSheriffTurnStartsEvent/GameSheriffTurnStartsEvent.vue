<template>
  <GameEventWithTexts
    id="game-sheriff-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import { usePlayers } from "~/composables/api/game/player/usePlayers";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getPlayersNamesText } = usePlayers();
const { getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(game);
const { t } = useI18n();

const playersInTieText = computed<string>(() => {
  const playersInTie = getEligibleTargetsWithInteractionInCurrentGamePlay("sentence-to-death");

  return getPlayersNamesText(playersInTie);
});

const gameEventTexts = computed<string[]>(() => {
  if (game.value.currentPlay?.action === "delegate") {
    return [t("components.GameSheriffTurnStartsEvent.sheriffDelegates")];
  }
  return [t("components.GameSheriffTurnStartsEvent.sheriffSettlesVotes", { players: playersInTieText.value })];
});
</script>