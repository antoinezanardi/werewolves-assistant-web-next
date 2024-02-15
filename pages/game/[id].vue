<template>
  <div
    id="game-page"
    class="container-fluid"
  >
    <div
      v-if="fetchingGameStatus === 'pending'"
      id="loading-game-container"
    >
      LOADING
    </div>

    <div v-else-if="fetchingGameStatus === 'error'">
      <GameNotFound id="game-not-found"/>
    </div>

    <div v-else>
      <Component :is="gameStatusComponentToRender"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import GameCanceled from "~/components/pages/game/GameCanceled/GameCanceled.vue";
import GameNotFound from "~/components/pages/game/GameNotFound/GameNotFound.vue";
import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
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