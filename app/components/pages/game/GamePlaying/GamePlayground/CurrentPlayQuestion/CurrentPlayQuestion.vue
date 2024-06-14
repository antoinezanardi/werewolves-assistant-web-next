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

import { GAME_PLAYS_QUESTIONS } from "~/components/pages/game/GamePlaying/GamePlayground/CurrentPlayQuestion/current-play-question.constants";
import { useCurrentGamePlay } from "~/composables/api/game/game-play/useCurrentGamePlay";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { priorityCauseInCurrentGamePlay } = useCurrentGamePlay(game);

const { t } = useI18n();

const currentPlayQuestion = computed<string>(() => {
  const { currentPlay } = game.value;
  if (!currentPlay) {
    return t("components.CurrentPlayQuestion.unknownQuestionForCurrentPlay");
  }

  const { source, action } = currentPlay;
  const questionKey = GAME_PLAYS_QUESTIONS[source.name][action]?.[priorityCauseInCurrentGamePlay.value ?? "default"];

  if (questionKey === undefined) {
    return t("components.CurrentPlayQuestion.unknownQuestionForCurrentPlay");
  }
  return t(questionKey);
});
</script>