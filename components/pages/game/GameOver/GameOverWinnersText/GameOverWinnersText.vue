<template>
  <div
    id="game-over-winners-text"
    class="text-center"
  >
    <div class="flex items-center justify-center">
      <NuxtImg
        :alt="$t('components.GameOverWinnersText.TrophyImageAlt')"
        height="50"
        src="svg/misc/trophy.svg"
        width="50"
      />

      <NuxtImg
        :alt="$t('components.GameOverWinnersText.victoryTypeImageAlt')"
        height="50"
        :src="victoryTypeTextsAndSvg.svg"
        width="50"
      />

      <h1 id="victory-text">
        {{ victoryTypeTextsAndSvg.text }}
      </h1>
    </div>

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
    text: t("components.GameOverWinnersText.angelWins"),
    subText: t("components.GameOverWinnersText.angelComesBackToParadise"),
    svg: "svg/role/angel.svg",
  },
  "lovers": {
    text: t("components.GameOverWinnersText.loversWin"),
    subText: t("components.GameOverWinnersText.loversAreTogetherForever"),
    svg: "svg/game/player/player-attribute/in-love.svg",
  },
  "none": {
    text: t("components.GameOverWinnersText.nobodyWins"),
    subText: t("components.GameOverWinnersText.everybodyMurderedEachOther"),
    svg: "svg/game/player/dead.svg",
  },
  "pied-piper": {
    text: t("components.GameOverWinnersText.piedPiperWins"),
    subText: t("components.GameOverWinnersText.piedPiperHasControl"),
    svg: "svg/role/pied-piper.svg",
  },
  "prejudiced-manipulator": {
    text: t("components.GameOverWinnersText.prejudicedManipulatorWins"),
    subText: t("components.GameOverWinnersText.prejudicedManipulatorGroupRemainsAlive"),
    svg: "svg/role/prejudiced-manipulator.svg",
  },
  "villagers": {
    text: t("components.GameOverWinnersText.villagersWin"),
    subText: t("components.GameOverWinnersText.villagersHaveSurvivedWerewolves"),
    svg: "svg/role/villager.svg",
  },
  "werewolves": {
    text: t("components.GameOverWinnersText.wereWolvesWin"),
    subText: t("components.GameOverWinnersText.werewolvesHaveEatenALot"),
    svg: "svg/role/werewolf.svg",
  },
  "white-werewolf": {
    text: t("components.GameOverWinnersText.whiteWerewolfWins"),
    subText: t("components.GameOverWinnersText.whiteWerewolfWinsAlone"),
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