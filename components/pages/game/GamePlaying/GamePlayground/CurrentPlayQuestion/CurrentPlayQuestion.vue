<template>
  <h3
    id="current-play-question"
    class="text-center"
  >
    {{ currentPlayQuestion }}
  </h3>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import type { GamePlayAction, GamePlayCause } from "~/composables/api/game/types/game-play/game-play.types";
import { useGameStore } from "~/stores/game/useGameStore";

type CurrentPlayCausesQuestion = {
  [Key in GamePlayCause]?: string;
} & { default: string };

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const gamePlaysQuestions: Record<GamePlaySourceName, Partial<Record<GamePlayAction, CurrentPlayCausesQuestion>>> = {
  "accursed-wolf-father": { infect: { default: t("components.CurrentPlayQuestion.doesAccursedWolfFatherWantToInfect") } },
  "actor": { "choose-card": { default: t("components.CurrentPlayQuestion.doesActorWantToChooseCard") } },
  "bear-tamer": { growl: { default: t("components.CurrentPlayQuestion.bearGrowled") } },
  "big-bad-wolf": { eat: { default: t("components.CurrentPlayQuestion.whichPlayerDoesBigBadWolfEat") } },
  "charmed": { "meet-each-other": { default: t("components.CurrentPlayQuestion.charmedPeopleMeetEachOther") } },
  "cupid": { charm: { default: t("components.CurrentPlayQuestion.whichPlayersDoesCupidCharm") } },
  "defender": { protect: { default: t("components.CurrentPlayQuestion.whichPlayerDoesDefenderProtect") } },
  "fox": { sniff: { default: t("components.CurrentPlayQuestion.doesFoxWantToSniff") } },
  "hunter": { shoot: { default: t("components.CurrentPlayQuestion.whichPlayerDoesHunterShoot") } },
  "lovers": { "meet-each-other": { default: t("components.CurrentPlayQuestion.loversMeetEachOther") } },
  "pied-piper": { charm: { default: t("components.CurrentPlayQuestion.whichPlayersDoesPiedPiperCharm") } },
  "scandalmonger": { mark: { default: t("components.CurrentPlayQuestion.doesScandalmongerWantToMark") } },
  "scapegoat": { "ban-voting": { default: t("components.CurrentPlayQuestion.doesScapegoatWantToBanVoting") } },
  "seer": { look: { default: t("components.CurrentPlayQuestion.whichPlayerDoesSeerLook") } },
  "sheriff": {
    "delegate": { default: t("components.CurrentPlayQuestion.whichPlayerDoesSheriffDelegate") },
    "settle-votes": { default: t("components.CurrentPlayQuestion.whichPlayerDoesSheriffSettleVotes") },
  },
  "stuttering-judge": { "request-another-vote": { default: t("components.CurrentPlayQuestion.doesJudgeRequestAnotherVote") } },
  "survivors": {
    "bury-dead-bodies": { default: "" },
    "elect-sheriff": { default: t("components.CurrentPlayQuestion.whichPlayerDoesSurvivorsElectAsSheriff") },
    "vote": {
      "default": t("components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteFor"),
      "angel-presence": t("components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteFor"),
      "stuttering-judge-request": t("components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteForOnJudgeRequest"),
      "previous-votes-were-in-ties": t("components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteForOnTie"),
    },
  },
  "thief": { "choose-card": { default: t("components.CurrentPlayQuestion.doesThiefWantToChooseCard") } },
  "three-brothers": { "meet-each-other": { default: t("components.CurrentPlayQuestion.threeBrothersMeetEachOther") } },
  "two-sisters": { "meet-each-other": { default: t("components.CurrentPlayQuestion.twoSistersMeetEachOther") } },
  "werewolves": { eat: { default: t("components.CurrentPlayQuestion.whichPlayerDoesWerewolvesEat") } },
  "white-werewolf": { eat: { default: t("components.CurrentPlayQuestion.doesWhiteWerewolfWantToEat") } },
  "wild-child": { "choose-model": { default: t("components.CurrentPlayQuestion.whichPlayerDoesWildChildChoose") } },
  "witch": { "use-potions": { default: t("components.CurrentPlayQuestion.doesWitchWantToUsePotions") } },
  "wolf-hound": { "choose-side": { default: t("components.CurrentPlayQuestion.whichSideDoesWolfHoundChoose") } },
};

const currentPlayQuestion = computed<string>(() => {
  const { currentPlay } = game.value;
  if (!currentPlay) {
    return t("components.CurrentPlayQuestion.unknownQuestionForCurrentPlay");
  }

  const { source, action, cause } = currentPlay;
  const question = gamePlaysQuestions[source.name][action]?.[cause ?? "default"];

  return question ?? t("components.CurrentPlayQuestion.unknownQuestionForCurrentPlay");
});
</script>