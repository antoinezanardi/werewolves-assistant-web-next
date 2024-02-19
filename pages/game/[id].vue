<template>
  <div
    id="game-page"
    class="container-fluid"
  >
    <div
      v-if="fetchingGameStatus === 'pending'"
      id="loading-game-container"
      class="align-items-center d-flex flex-column h-100 justify-content-center"
    >
      <TextProgressSpinner
        id="loading-game-spinner"
        :text="$t('pages.game.loadingGame')"
      />
    </div>

    <GameNotFound
      v-else-if="fetchingGameStatus === 'error'"
      id="game-not-found"
      class="h-100"
    />

    <Component
      :is="gameStatusComponentToRender"
      v-else
      class="h-100"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameCanceled from "~/components/pages/game/GameCanceled/GameCanceled.vue";
import GameNotFound from "~/components/pages/game/GameNotFound/GameNotFound.vue";
import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
import TextProgressSpinner from "~/components/shared/misc/TextProgressSpinner/TextProgressSpinner.vue";
import type { GameStatus } from "~/composables/api/game/types/game.types";
import { useGameStore } from "~/stores/game/useGameStore";

type GameStatusComponent = typeof GameCanceled | typeof GameOver | typeof GamePlaying;

const route = useRoute();
const gameStore = useGameStore();
const { fetchAndSetGame } = gameStore;
const { game, fetchingGameStatus } = storeToRefs(gameStore);

const { id } = route.params;

const gameId = Array.isArray(id) ? id[0] : id;
void fetchAndSetGame(gameId);

const gameStatusComponentToRender = computed<GameStatusComponent>(() => {
  const gameStatusComponents: Record<GameStatus, GameStatusComponent> = {
    playing: GamePlaying,
    over: GameOver,
    canceled: GameCanceled,
  };

  return gameStatusComponents[game.value.status];
});
</script>