<template>
  <GameEventWithTexts
    id="game-survivors-turn-starts-event"
    :texts="gameEventTexts"
  >
    <GameEventFlippingPlaySourcePlayersCard/>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const gameEventTexts = computed<string[]>(() => {
  const { currentPlay } = game.value;
  if (currentPlay === null) {
    return [];
  }
  const currentPlayActionTextMethods: Partial<Record<GamePlayAction, () => string[]>> = {
    "elect-sheriff": getGameEventTextsForElectingSheriff,
    "vote": getGameEventTextsForVoting,
    "bury-dead-bodies": getGameEventTextsForBuryingDeadBodies,
  };

  return currentPlayActionTextMethods[currentPlay.action]?.() ?? [];
});

function getGameEventTextsForElectingSheriff(): string[] {
  return [t("components.GameSurvivorsTurnStartsEvent.survivorsElectSheriff")];
}

function getGameEventTextsForVoting(): string[] {
  return [
    t("components.GameSurvivorsTurnStartsEvent.voteForSheriff"),
    t("components.GameSurvivorsTurnStartsEvent.sheriffWillBeElected"),
  ];
}

function getGameEventTextsForBuryingDeadBodies(): string[] {
  return [
    t("components.GameSurvivorsTurnStartsEvent.buryDeadBodies"),
    t("components.GameSurvivorsTurnStartsEvent.deadBodiesWillBeBuried"),
  ];
}
</script>