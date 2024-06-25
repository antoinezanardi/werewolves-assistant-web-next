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
        :src="victoryTypeTextsAndSvg.svgPath"
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

import { VICTORY_TYPES_TEXTS_AND_SVG } from "~/components/pages/game/GameOver/GameOverVictoryText/game-over-victory-text.constants";
import { useGameStore } from "~/stores/game/useGameStore";

type TextsAndSvg = {
  text: string;
  subText: string;
  svgPath: string;
};

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();

const isGameWonByLoversAndCupid = computed<boolean>(() => {
  const { victory, options, players } = game.value;
  const alivePlayers = players.filter(player => player.isAlive);
  const teamOfLoveCount = 3;

  return options.roles.cupid.mustWinWithLovers && victory?.type === "lovers" && alivePlayers.length === teamOfLoveCount;
});

const victoryTypeTextsAndSvg = computed<TextsAndSvg>(() => {
  const { victory } = game.value;
  if (isGameWonByLoversAndCupid.value) {
    return {
      text: t("components.GameOverVictoryText.loversAndCupidWin"),
      subText: t("components.GameOverVictoryText.loversAndCupidAreTogetherForever"),
      svgPath: VICTORY_TYPES_TEXTS_AND_SVG.lovers.svgPath,
    };
  }
  if (!victory) {
    return {
      text: "??",
      subText: "??",
      svgPath: "svg/misc/question-mark.svg",
    };
  }
  const { textKey, subTextKey, svgPath } = VICTORY_TYPES_TEXTS_AND_SVG[victory.type];

  return {
    text: t(textKey),
    subText: t(subTextKey),
    svgPath,
  };
});
</script>