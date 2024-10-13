<template>
  <div
    id="game-page"
    class="container-fluid"
  >
    <div
      v-if="fetchingGameStatus === 'pending'"
      id="loading-game-container"
      class="flex flex-col h-full items-center justify-center"
    >
      <TextProgressSpinner
        id="loading-game-spinner"
        :text="$t('pages.game.loadingGame')"
      />
    </div>

    <GameNotFound
      v-else-if="fetchingGameStatus === 'error'"
      id="game-not-found"
      class="h-full"
    />

    <div
      v-else
      class="h-full"
    >
      <Transition
        mode="out-in"
        name="fade"
      >
        <Component
          :is="gameStatusComponentToRender"
          :key="game.status"
          class="h-full"
          @game-feedback-submitter-button-click="onClickFromGameFeedbackSubmitterButton"
        />
      </Transition>

      <GameFeedbackSubmitter ref="gameFeedbackSubmitter"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { storeToRefs } from "pinia";

import GameCanceled from "~/components/pages/game/GameCanceled/GameCanceled.vue";
import type { GameFeedbackSubmitterExposed } from "~/components/pages/game/GameFeedbackSubmitter/game-feedback-submitter.types";
import GameFeedbackSubmitter from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitter.vue";
import GameNotFound from "~/components/pages/game/GameNotFound/GameNotFound.vue";
import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
import TextProgressSpinner from "~/components/shared/misc/TextProgressSpinner/TextProgressSpinner.vue";
import type { GameStatus } from "~/composables/api/game/types/game.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const route = useRoute();
const gameStore = useGameStore();
const { fetchAndSetGame } = gameStore;
const { game, fetchingGameStatus } = storeToRefs(gameStore);

const gameFeedbackSubmitter = ref<GameFeedbackSubmitterExposed | null>(null);

const audioStore = useAudioStore();
const { loadAllAudios, fadeOutPlayingBackgroundAudio } = audioStore;

const { t } = useI18n();

useHead({
  title: t("pages.game.playingGame"),
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const { id } = route.params;

const gameStatusComponentToRender = computed<Component>(() => {
  const gameStatusComponents: Record<GameStatus, Component> = {
    playing: GamePlaying,
    over: GameOver,
    canceled: GameCanceled,
  };

  return gameStatusComponents[game.value.status];
});

function onClickFromGameFeedbackSubmitterButton(): void {
  if (!gameFeedbackSubmitter.value) {
    throw createError("Game Feedback Submitter is not defined");
  }
  gameFeedbackSubmitter.value.showGameFeedbackSubmitter();
}

const gameId = Array.isArray(id) ? id[0] : id;
void fetchAndSetGame(gameId);
loadAllAudios();

onUnmounted(fadeOutPlayingBackgroundAudio);
</script>