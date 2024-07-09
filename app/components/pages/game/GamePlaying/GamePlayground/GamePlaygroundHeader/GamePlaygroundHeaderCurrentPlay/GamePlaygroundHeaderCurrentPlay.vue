<template>
  <div
    id="game-playground-header-current-play"
    class="flex gap-2 items-center justify-center"
  >
    <div class="flex justify-end w-2/12">
      <NuxtImg
        v-if="currentPlaySvgAndTextKey"
        :alt="$t(`components.GamePlaygroundHeaderCurrentPlay.currentPlayAltText`)"
        class="me-3"
        height="50"
        placeholder="/svg/misc/infinite-spinner.svg"
        :src="currentPlaySvgAndTextKey.svgPath"
        width="50"
      />
    </div>

    <h2
      id="current-play-text"
      class="text-center"
    >
      {{ currentPlayText }}
    </h2>

    <div class="w-2/12"/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { GAME_PLAYS_TEXT_AND_SVG } from "~/components/shared/game/game-play/game-play.constants";
import { useGameStore } from "~/stores/game/useGameStore";

type CurrentPlaySvgAndText = {
  svgPath: string;
  text: string;
};

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { t } = useI18n();

const currentPlaySvgAndTextKey = computed<CurrentPlaySvgAndText | undefined>(() => {
  const { currentPlay } = game.value;
  if (!currentPlay) {
    return undefined;
  }
  const svgAndText = GAME_PLAYS_TEXT_AND_SVG[currentPlay.source.name][currentPlay.action];
  if (!svgAndText) {
    return undefined;
  }
  return {
    svgPath: svgAndText.svgPath,
    text: svgAndText.textKey,
  };
});

const currentPlayText = computed<string>(() => {
  if (!currentPlaySvgAndTextKey.value) {
    return t("components.GamePlaygroundHeaderCurrentPlay.unknownGamePlay");
  }
  return t(currentPlaySvgAndTextKey.value.text);
});
</script>