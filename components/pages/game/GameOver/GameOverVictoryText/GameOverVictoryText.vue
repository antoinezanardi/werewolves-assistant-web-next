<template>
  <div
    id="game-over-winners-text"
    class="text-center"
  >
    <div class="flex gap-2 items-center justify-center">
      <NuxtImg
        :alt="$t('components.GameOverVictoryText.trophyImageAlt')"
        height="125"
        src="svg/misc/trophy.svg"
        width="125"
      />

      <NuxtImg
        :alt="$t('components.GameOverVictoryText.victoryTypeImageAlt')"
        height="125"
        :src="victoryTypeTextsAndSvg.svg"
        width="125"
      />
    </div>

    <h1
      id="victory-text"
      class="my-3"
    >
      {{ victoryTypeTextsAndSvg.text }}
    </h1>

    <h3 id="victory-sub-text">
      {{ victoryTypeTextsAndSvg.subText }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { GameVictoryTypes } from "~/composables/api/game/types/game-victory/game-victory.types";
import { useGameStore } from "~/stores/game/useGameStore";

type TextsAndSvg = {
  text: string;
  subText: string;
  svg: string;
};

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const victoryTypesTextsAndSvg: Record<GameVictoryTypes, TextsAndSvg> = {
  "angel": {
    text: t("components.GameOverVictoryText.angelWins"),
    subText: t("components.GameOverVictoryText.angelComesBackToParadise"),
    svg: "svg/role/angel.svg",
  },
  "lovers": {
    text: t("components.GameOverVictoryText.loversWin"),
    subText: t("components.GameOverVictoryText.loversAreTogetherForever"),
    svg: "svg/role/lovers.svg",
  },
  "none": {
    text: t("components.GameOverVictoryText.nobodyWins"),
    subText: t("components.GameOverVictoryText.everybodyMurderedEachOther"),
    svg: "svg/game/player/dead.svg",
  },
  "pied-piper": {
    text: t("components.GameOverVictoryText.piedPiperWins"),
    subText: t("components.GameOverVictoryText.piedPiperHasControl"),
    svg: "svg/role/pied-piper.svg",
  },
  "prejudiced-manipulator": {
    text: t("components.GameOverVictoryText.prejudicedManipulatorWins"),
    subText: t("components.GameOverVictoryText.prejudicedManipulatorGroupRemainsAlive"),
    svg: "svg/role/prejudiced-manipulator.svg",
  },
  "villagers": {
    text: t("components.GameOverVictoryText.villagersWin"),
    subText: t("components.GameOverVictoryText.villagersHaveSurvivedWerewolves"),
    svg: "svg/role/villager.svg",
  },
  "werewolves": {
    text: t("components.GameOverVictoryText.werewolvesWin"),
    subText: t("components.GameOverVictoryText.werewolvesHaveEatenALot"),
    svg: "svg/role/werewolf.svg",
  },
  "white-werewolf": {
    text: t("components.GameOverVictoryText.whiteWerewolfWins"),
    subText: t("components.GameOverVictoryText.whiteWerewolfWinsAlone"),
    svg: "svg/role/white-werewolf.svg",
  },
};

const victoryTypeTextsAndSvg = computed<TextsAndSvg>(() => {
  const { victory } = game.value;
  const unknownVictoryTextsAndSvg: TextsAndSvg = {
    text: "??",
    subText: "??",
    svg: "svg/misc/question-mark.svg",
  };
  if (!victory) {
    return unknownVictoryTextsAndSvg;
  }
  return victoryTypesTextsAndSvg[victory.type];
});
</script>