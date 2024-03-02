<template>
  <div
    id="game-playground-header-current-play"
    class="flex items-center justify-center"
  >
    <NuxtImg
      v-if="currentPlaySvgAndText"
      :alt="$t(`components.GamePlaygroundHeaderCurrentPlay.currentPlayAltText`)"
      class="me-3"
      height="50"
      :src="currentPlaySvgAndText.svgPath"
      width="50"
    />

    <h2 id="current-play-text">
      {{ currentPlayText }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { t } = useI18n();

const currentPlaysSvgAndText: Record<GamePlaySourceName, Partial<Record<GamePlayAction, { svgPath: string; text: string }>>> = {
  "accursed-wolf-father": {
    infect: {
      svgPath: "/svg/role/accursed-wolf-father.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.accursedWolfFatherInfects"),
    },
  },
  "actor": {
    "choose-card": {
      svgPath: "/svg/role/actor.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.actorChoosesCard"),
    },
  },
  "bear-tamer": {
    growl: {
      svgPath: "/svg/role/bear-tamer.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.bearTamerGrowls"),
    },
  },
  "big-bad-wolf": {
    eat: {
      svgPath: "/svg/role/big-bad-wolf.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.bigBadWolfEats"),
    },
  },
  "charmed": {
    "meet-each-other": {
      svgPath: "/svg/role/pied-piper.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.charmedPeopleMeetEachOther"),
    },
  },
  "cupid": {
    charm: {
      svgPath: "/svg/role/cupid.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.cupidCharms"),
    },
  },
  "defender": {
    protect: {
      svgPath: "/svg/role/defender.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.defenderProtects"),
    },
  },
  "fox": {
    sniff: {
      svgPath: "/svg/role/fox.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.foxSniffs"),
    },
  },
  "hunter": {
    shoot: {
      svgPath: "/svg/role/hunter.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.hunterShoots"),
    },
  },
  "lovers": {
    "meet-each-other": {
      svgPath: "/svg/role/lovers.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.loversMeetEachOther"),
    },
  },
  "pied-piper": {
    charm: {
      svgPath: "/svg/role/pied-piper.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.piedPiperCharms"),
    },
  },
  "scandalmonger": {
    mark: {
      svgPath: "/svg/role/scandalmonger.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.scandalmongerMarks"),
    },
  },
  "scapegoat": {
    "ban-voting": {
      svgPath: "/svg/role/scapegoat.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.scapegoatBansVoting"),
    },
  },
  "seer": {
    look: {
      svgPath: "/svg/role/seer.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.seerLooks"),
    },
  },
  "sheriff": {
    "delegate": {
      svgPath: "/svg/game/player/player-attribute/sheriff.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.sheriffDelegates"),
    },
    "settle-votes": {
      svgPath: "/svg/game/game-play/game-play-action/settle-votes.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.sheriffSettlesVotes"),
    },
  },
  "stuttering-judge": {
    "request-another-vote": {
      svgPath: "/svg/role/stuttering-judge.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.stutteringJudgeRequestsAnotherVote"),
    },
  },
  "survivors": {
    "bury-dead-bodies": {
      svgPath: "/svg/game/player/dead.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.survivorsBuryDeadBodies"),
    },
    "elect-sheriff": {
      svgPath: "/svg/game/player/player-attribute/sheriff.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.survivorsElectSheriff"),
    },
    "vote": {
      svgPath: "/svg/game/game-play/game-play-action/vote.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.survivorsVote"),
    },
  },
  "thief": {
    "choose-card": {
      svgPath: "/svg/role/thief.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.thiefChoosesCard"),
    },
  },
  "three-brothers": {
    "meet-each-other": {
      svgPath: "/svg/role/three-brothers.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.threeBrothersMeetEachOther"),
    },
  },
  "two-sisters": {
    "meet-each-other": {
      svgPath: "/svg/role/two-sisters.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.twoSistersMeetEachOther"),
    },
  },
  "werewolves": {
    eat: {
      svgPath: "/svg/role/werewolf.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.werewolvesEat"),
    },
  },
  "white-werewolf": {
    eat: {
      svgPath: "/svg/role/white-werewolf.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.whiteWerewolfEats"),
    },
  },
  "wild-child": {
    "choose-model": {
      svgPath: "/svg/role/wild-child.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.wildChildChoosesModel"),
    },
  },
  "witch": {
    "use-potions": {
      svgPath: "/svg/role/witch.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.witchUsesPotions"),
    },
  },
  "wolf-hound": {
    "choose-side": {
      svgPath: "/svg/role/wolf-hound.svg",
      text: t("components.GamePlaygroundHeaderCurrentPlay.wolfHoundChoosesSide"),
    },
  },
};

const currentPlaySvgAndText = computed<{ svgPath: string; text: string } | undefined>(() => {
  const { currentPlay } = game.value;
  if (!currentPlay) {
    return undefined;
  }
  return currentPlaysSvgAndText[currentPlay.source.name][currentPlay.action];
});

const currentPlayText = computed<string>(() => {
  if (!currentPlaySvgAndText.value) {
    return t("components.GamePlaygroundHeaderCurrentPlay.unknownGamePlay");
  }
  return currentPlaySvgAndText.value.text;
});
</script>