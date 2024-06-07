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
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import { usePlayers } from "~/composables/api/game/player/usePlayers";
import type { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import type { GamePlayAction, GamePlayCause } from "~/composables/api/game/types/game-play/game-play.types";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getPlayersNamesText } = usePlayers();
const { priorityCauseInCurrentGamePlay, getEligibleTargetsWithInteractionInCurrentGamePlay } = useCurrentGamePlay(game);

const { t } = useI18n();

const gameEventTexts = computed<string[]>(() => {
  const { currentPlay } = game.value;
  if (currentPlay === null) {
    return [];
  }
  const currentPlayActionTextMethods: Partial<Record<GamePlayAction, (play: GamePlay) => string[]>> = {
    "elect-sheriff": getGameEventTextsForElectingSheriff,
    "vote": getGameEventTextsForVoting,
    "bury-dead-bodies": getGameEventTextsForBuryingDeadBodies,
  };

  return currentPlayActionTextMethods[currentPlay.action]?.(currentPlay) ?? [];
});

function getGameEventTextsForElectingSheriff(gamePlay: GamePlay): string[] {
  if (gamePlay.causes?.includes("previous-votes-were-in-ties") === true) {
    const eligiblePlayersInTie = getEligibleTargetsWithInteractionInCurrentGamePlay("choose-as-sheriff");

    return [
      t("components.GameSurvivorsTurnStartsEvent.sheriffElectionBecauseOfPreviousTies"),
      t("components.GameSurvivorsTurnStartsEvent.survivorsMustElectBetween", { players: getPlayersNamesText(eligiblePlayersInTie) }),
    ];
  }
  return [t("components.GameSurvivorsTurnStartsEvent.survivorsElectSheriff")];
}

function getGameEventTextsForVotingWithCause(cause: GamePlayCause): string[] {
  const eligiblePlayersInTie = getEligibleTargetsWithInteractionInCurrentGamePlay("vote");
  const votingCauseTexts: Record<GamePlayCause, string[]> = {
    "previous-votes-were-in-ties": [
      t("components.GameSurvivorsTurnStartsEvent.voteBecauseOfPreviousTies"),
      t("components.GameSurvivorsTurnStartsEvent.survivorsMustVoteBetween", { players: getPlayersNamesText(eligiblePlayersInTie) }),
    ],
    "angel-presence": [
      t("components.GameSurvivorsTurnStartsEvent.gameStartsWithVoteBecauseOfAngelPresence"),
      t("components.GameSurvivorsTurnStartsEvent.watchOutForAngelOrHeWins"),
    ],
    "stuttering-judge-request": [t("components.GameSurvivorsTurnStartsEvent.voteBecauseOfStutteringJudge")],
  };

  return votingCauseTexts[cause];
}

function getGameEventTextsForVoting(): string[] {
  if (!priorityCauseInCurrentGamePlay.value) {
    return [t("components.GameSurvivorsTurnStartsEvent.survivorsVote")];
  }
  return getGameEventTextsForVotingWithCause(priorityCauseInCurrentGamePlay.value);
}

function getGameEventTextsForBuryingDeadBodies(): string[] {
  return [t("components.GameSurvivorsTurnStartsEvent.survivorsBuryDeadBodies")];
}
</script>